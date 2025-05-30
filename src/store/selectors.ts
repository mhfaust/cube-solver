import { checkFacesAreSolved } from "@/utils/checkFacesAreSolved";
import { useCubeStore } from "./cubeSlice";
import { useGameControlsStore } from "./gameControlsSlice";

// export const select = <T>(fn: (store: AppStore) => T) => fn;

// const selectProp = <TK extends keyof AppStore>(prop: TK) => {
//   return (store: AppStore) => store[prop];
// };

// export const useCubeGrid = () => useAppStore(selectProp('cubeGrid'));
// export const useFaces = () => useAppStore(selectProp('faces'));
// export const useInitiaFaces = () => useAppStore(selectProp('initialFaces'));
// export const useIsRotating = () => useAppStore(selectProp('isRotating'));
// export const useHistory = () => useAppStore(selectProp('history')); 

export const usePlayMode = () => {
  return useGameControlsStore(({ startTime, completionTime }) => {
    return startTime && completionTime
      ? 'complete'
      : startTime ? 'in-play' : 'casual';
  });
};

export const useIsSolved = () => useCubeStore(({ faces }) => {
  return checkFacesAreSolved(faces)
})