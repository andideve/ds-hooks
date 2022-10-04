import { useMemo } from 'react';
import useTransitionState from './use-transition-state';

/** @returns shouldUnmount */
export function useUnmountOverlay(isOpen: boolean, duration: number) {
  const state = useTransitionState(isOpen, duration);
  return useMemo(() => (state === 'initial' ? !isOpen : !isOpen && state === 'end'), [state]);
}

export default useUnmountOverlay;
