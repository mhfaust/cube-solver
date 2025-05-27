import { useEffect, useRef } from 'react';

/**
 * A simplified useEffect that will run once and only once and only when ready is true.
 * @param effect the function you'd like to run initially (after first render)
 * @param ready a boolean that determines if the effect should run or not
 */
const useEffectOnce = (effect: (() => void) | (() => () => void), ready: boolean = true) => {
  const isDone = useRef(false);
  useEffect(() => {
    if (effect && ready && !isDone.current) {
      isDone.current = true;
      return effect();
    }
  }, [effect, ready, isDone]);
};

export default useEffectOnce;
