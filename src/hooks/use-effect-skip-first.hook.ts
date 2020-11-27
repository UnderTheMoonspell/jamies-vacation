import { useEffect, useRef } from 'react';

export const useEffectSkipFirstRun = (callback: Function, inputs: Array<any>) => {
  const isFirstRun = useRef(true);
  useEffect (() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    callback()
  }, [callback, inputs]);
}