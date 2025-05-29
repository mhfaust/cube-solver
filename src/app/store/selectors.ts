import { checkFacesAreSolved } from "../utils/checkFacesAreSolved";
import { AppStore, useAppStore } from "./useAppStore";

export const select = <T>(fn: (store: AppStore) => T) => fn;

const selectProp = <TK extends keyof AppStore>(prop: TK) => {
  return (store: AppStore) => store[prop];
};

export const useStartTime = () => useAppStore(selectProp('startTime'));
export const useCompletionTime = () => useAppStore(selectProp('completionTime'));
export const useCubeGrid = () => useAppStore(selectProp('cubeGrid'));
export const useFaces = () => useAppStore(selectProp('faces'));
export const useInitiaFaces = () => useAppStore(selectProp('initialFaces'));
export const useIsRotating = () => useAppStore(selectProp('isRotating'));
export const useHistory = () => useAppStore(selectProp('history')); 

export const usePlayMode = () => {
  return useAppStore(({ startTime, completionTime }) => {
    return startTime && completionTime
      ? 'complete'
      : startTime ? 'in-play' : 'casual';
  });
};

export const useIsSolved = () => useAppStore(({ faces }) => {
  return checkFacesAreSolved(faces)
})