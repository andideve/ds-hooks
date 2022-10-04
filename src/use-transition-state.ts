import { useState, useEffect, useRef } from 'react';

export type TransitionStates = 'initial' | 'start' | 'end';

export function useTransitionState(isChange: boolean, duration: number) {
  const [state, setState] = useState<TransitionStates>('initial');

  const prevIsChangeRef = useRef(isChange);

  useEffect(() => {
    return () => {
      prevIsChangeRef.current = isChange;
    };
  }, [isChange]);

  useEffect(() => {
    if (prevIsChangeRef.current === isChange) return;
    setState('start');
    const timeoutId = setTimeout(() => setState('end'), duration);
    return () => clearTimeout(timeoutId);
  }, [isChange]);

  return state;
}

export default useTransitionState;
