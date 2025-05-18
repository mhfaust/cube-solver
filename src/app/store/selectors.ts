import { AppStore, useAppStore } from "./useAppStore";

export const select = <T>(fn: (store: AppStore) => T) => fn;

const selectProp = <TK extends keyof AppStore>(prop: TK) => {
  return (store: AppStore) => store[prop];
};

export const useMessages = () => useAppStore(selectProp('messages'));
export const useIsLogOpen = () => useAppStore(selectProp('logIsOpen'));
export const useStartTime = () => useAppStore(selectProp('startTime'));
export const useCompletionTime = () => useAppStore(selectProp('completionTime'));
export const useIsSolved = () => useAppStore(selectProp('isSolved'));
export const useCubeGrid = () => useAppStore(selectProp('cubeGrid'));
export const useIsRotating = () => useAppStore(selectProp('isRotating'));
export const useFingersOn = () => useAppStore(selectProp('fingersOn'));
export const useThemeName = () => useAppStore(selectProp('themeName'));

export const usePlayMode = () => {
  return useAppStore(({ startTime, completionTime }) => {
    return startTime && completionTime
      ? 'complete'
      : startTime ? 'in-play' : 'casual';
  });
};

