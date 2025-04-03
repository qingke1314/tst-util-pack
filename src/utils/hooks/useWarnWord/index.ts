import { useEffect, useRef } from 'react';
import { warnWord } from './types';
import { AddWatch } from './warnWord';

export const useWarnWord = (
  idOrElement: string,
  warnWordList: warnWord[],
  watchedVar: any,
) => {
  const addWatchFn = useRef<any>();
  useEffect(() => {
    addWatchFn.current = new AddWatch(idOrElement, warnWordList);
    return () => {
      addWatchFn.current = null;
    };
  }, []);
  useEffect(() => {
    addWatchFn.current.run();
  }, [watchedVar]);
  return addWatchFn;
};
