import { useWarnWord } from 'any-think/utils/hooks/useWarnWord';
import React, { type FC, useState } from 'react';
const Foo: FC<{ title: string }> = () => {
  const [list, setList] = useState<string>('测试：敏感词');
  const warnList = [
    {
      word: '敏感词',
      desc: '敏感词',
    },
  ];
  useWarnWord('testDiv', warnList, list);
  return (
    <div>
      <div
        onClick={() => setList((word) => word + '测试：敏感词')}
        id="testDiv"
      >
        {list}
      </div>
    </div>
  );
};

export default Foo;
