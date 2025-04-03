const getType = (target: any) => {
  let _objectType = Object.prototype.toString.call(target);
  let _matchList = _objectType.match(/\[object (\w+)\]/);
  if (_matchList) {
    return _matchList[1];
  }
  return void 0;
};
/**
 * 构建正则
 * @param {String} word 匹配目标字符串
 * @param {String} flag 正则修饰符
 * @returns {RegExp} 正则表达式
 * 转义特殊符号，然后加入模糊搜
 */
const _getRegexp = (word: string, flag: string) => {
  const replaceArr = word
    .split('')
    .map((e) => e.replace(/[()+?*.[\]^&]/g, (_) => '\\' + _));
  const finalWord = replaceArr.join('[\\s]*');
  if (flag) {
    return new RegExp(`${finalWord}`, flag);
  } else {
    return new RegExp(`${finalWord}`);
  }
};
/**
 * 根据输入串获取正则表达式
 * @param {String} word 输入字符串
 * @returns {RegExp} 匹配表达式
 * 1、判断敏感词的类型(可以传入任意类型的敏感词)
 * 2、除了正则类型，都会生成一个字符串，然后根据该字符串生成正则，最终返回一个正则
 * 注意：此处拆分生成的字符串并加入空格以进行模糊校验：质量 保证 金✔
 */
export const _getMatchRegExp = (word: any): RegExp => {
  let _regexp = null;
  const _type = getType(word);
  switch (_type) {
    case 'String':
      _regexp = _getRegexp(word, 'g');
      break;
    case 'RegExp':
      _regexp = word;
      break;
    case 'Function':
      _regexp = _getMatchRegExp(word()); // 递归获取正则
      break;
    default:
      _regexp = _getRegexp(String(word), 'g');
      break;
  }
  return _regexp;
};
