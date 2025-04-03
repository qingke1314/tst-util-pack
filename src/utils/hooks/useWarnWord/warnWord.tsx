import { BulbOutlined } from '@ant-design/icons';
import { _getMatchRegExp } from 'any-think/utils/util.ts';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import './index.less';
import { warnWord } from './types';

const innerHtml = `<span>${renderToStaticMarkup(
  <BulbOutlined twoToneColor={'red'} />,
)}</span>`;
/**
 * 对所给dom节点内部全部敏感词文本节点进行替换
 * @param {*} id dom节点的id
 * @param {*} list 敏感词列表，[{ word: 'xx' }]
 * @param {*} options 选项
 * @returns void
 */
export class AddWatch {
  static BASE_OPTIONS = {
    activeFilter: null, // 自定义过滤器（作用于textNode）
    wrapClass: () => '', // 自定义类名
    immediate: false, // 是否创建时就查找一次
  };
  static WARN_WORD_TAGNAME = 'ww'; // warnWord
  el: HTMLElement | null;
  private __revertFns__: (() => void)[] = [];
  list: warnWord[] | undefined;
  allKeywordsReg: RegExp = new RegExp('');
  finalOptions:
    | {
        activeFilter: null; // 自定义过滤器（作用于textNode）
        wrapClass: (_word: string) => string; // 自定义类名
        immediate: boolean;
      }
    | undefined;
  listMap: { [key: string]: warnWord } = {};
  constructor(id: string, list: warnWord[], options = {}) {
    this.el = document.getElementById(id);
    if (!this.el || this.el.nodeType !== Node.ELEMENT_NODE) {
      console.log('节点类型不正确!');
      return;
    }
    this.__revertFns__ = [];
    this.list = list;
    this.allKeywordsReg = new RegExp(
      this.list.map((word) => _getMatchRegExp(word.word).source).join('|'),
      'gi',
    );
    this.finalOptions = { ...AddWatch.BASE_OPTIONS, ...options };
    this.listMap = this.list.reduce(
      (acc: { [key: string]: warnWord }, e: warnWord) => {
        acc[e.word] = e;
        return acc;
      },
      {},
    );
    if (this.finalOptions.immediate) {
      this.run();
    }
  }
  /**
   * 回滚方法
   */
  revert() {
    (this.__revertFns__ || []).forEach((e) => {
      if (typeof e === 'function') {
        e();
      }
    });
    this.__revertFns__ = [];
  }
  /**
   * 核心运行方法
   */
  run() {
    (this.__revertFns__ || []).forEach((e) => {
      e();
    });
    this.__revertFns__ = [];
    const textNodes = this.getTextNodes();
    if (textNodes.length > 0) {
      textNodes.forEach((node) => {
        const splitNodes = this.getSplitNodes(node.nodeValue || '').filter(
          (node) => !!node,
        );
        // 替换敏感词文本节点
        if (splitNodes.length > 0) {
          const parentNode = node.parentNode;
          if (!parentNode) return;
          const fragmentNode = document.createDocumentFragment();
          splitNodes.forEach((e) => {
            fragmentNode.appendChild(e);
          });
          const tempFragment = document.createDocumentFragment();
          parentNode.insertBefore(fragmentNode, node);
          tempFragment.appendChild(node);
          // 回滚函数
          this.__revertFns__.push(() => {
            if (
              tempFragment.contains(node) &&
              parentNode.contains(splitNodes[0])
            ) {
              parentNode.insertBefore(node, splitNodes[0]);
            }
            splitNodes.forEach((ele) => {
              if (parentNode.contains(ele)) {
                parentNode.removeChild(ele);
              }
            });
          });
        }
      });
    }
  }
  /**
   * 空、非自定义敏感词标签、正则存在敏感词、自定义过滤
   * @returns 过滤器数组
   */
  getFilters() {
    const emptyFilter = (dom: Text) =>
      !!(dom.nodeValue || '').replace(/[\s\r\n]*/g, '');
    const tagNameFilter = (dom: Text) => {
      if (!dom.parentNode || !(dom.parentNode instanceof Element)) return true;
      return (
        dom.parentNode.tagName.toLowerCase() !== AddWatch.WARN_WORD_TAGNAME
      );
    };
    // 敏感词正则匹配
    const regFilter = (dom: Text) => {
      if (!dom.nodeValue) return false;
      return this.allKeywordsReg.test(dom.nodeValue);
    };
    if (typeof this.finalOptions?.activeFilter !== 'function')
      return [emptyFilter, tagNameFilter, regFilter];
    return [
      emptyFilter,
      tagNameFilter,
      regFilter,
      this.finalOptions.activeFilter,
    ];
  }
  /**
   * 用所有过滤器对文本节点进行过滤 判断是否合法
   * @param {*} dom
   * @returns bool
   */
  getIsValid(dom: Text) {
    const filters = this.getFilters();
    for (const filter of filters) {
      if (!filter(dom)) {
        return false;
      }
    }
    return true;
  }
  /**
   * 递归捕捉所有符合标准的文本节点
   */
  getTextNodes() {
    const allMatchNodes: Text[] = [];
    const loopFn = (el: any) => {
      // 捕捉逻辑
      if (el.nodeType === Node.TEXT_NODE && this.getIsValid(el)) {
        allMatchNodes.push(el);
      }
      // 递归逻辑
      if (
        !el ||
        el.nodeType !== Node.ELEMENT_NODE ||
        el.nodeType === Node.DOCUMENT_FRAGMENT_NODE
      ) {
        return; // 非元素或碎片没有儿子
      }
      const _children = el.childNodes;
      for (let _index = 0; _index < _children.length; _index++) {
        loopFn(_children[_index]); // 存在儿子节点，则递归捕捉
      }
    };
    loopFn(this.el);
    return allMatchNodes;
  }
  /**
   * 创建自定义标签（带icon、tooltip、颜色）
   */
  createNode({ word = '', desc = '' }) {
    const warnWordNode = document.createElement(AddWatch.WARN_WORD_TAGNAME);
    warnWordNode.setAttribute('label-title', desc);
    const iconSpan = document.createElement('span');
    iconSpan.innerHTML = innerHtml;
    warnWordNode.appendChild(iconSpan);
    warnWordNode.appendChild(document.createTextNode(word));
    const wrapClass = this.finalOptions?.wrapClass(word);
    if (wrapClass) warnWordNode.classList.add(wrapClass);
    return warnWordNode;
  }
  /**
   * 根据敏感词将text分为多段
   * @param {*} text 待分割文本
   * @returns 分割后的textNode或wwNode数组
   */
  getSplitNodes(text: string) {
    text.match(this.allKeywordsReg);
    const matchList = Array.from(text.matchAll(this.allKeywordsReg));
    if (matchList.length) {
      let lastIndex = 0;
      let nodes: (Element | Text)[] = [];
      //debugger
      matchList.forEach((e) => {
        if (e.index > lastIndex) {
          // 将敏感词之前的普通文本存进去
          nodes.push(document.createTextNode(text.slice(lastIndex, e.index)));
        }
        const word = e[0];
        const desc = this.listMap[e[0]]?.desc || '';
        nodes.push(
          this.createNode({
            word,
            desc,
          }),
        );
        lastIndex = e.index + e[0].length;
        return nodes;
      });
      return [...nodes, document.createTextNode(text.slice(lastIndex))];
    }
    return [document.createTextNode(text)];
  }
}
