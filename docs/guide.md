# 工具方法

## 敏感词监听钩子

```jsx
import { useState } from 'react';
import { useWarnWord } from 'any-think';
import { Input, Button } from 'antd';
const Foo = (props) => {
  const [list, setList] = useState('测试：敏感词');
  const warnList = [
    {
      word: '敏感词',
      desc: '敏感词',
    },
  ];
  const instanceRef = useWarnWord('testDiv', warnList, list);
  return (
    <div>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <Input value={list} onChange={(e) => setList(e.target.value)} />
        <Button
          onClick={() => {
            instanceRef.current?.revert();
          }}
          type="primary"
        >
          清除效果
        </Button>
      </div>
      <div id="testDiv">{list}</div>
    </div>
  );
};

export default Foo;
```
