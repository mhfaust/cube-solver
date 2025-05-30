import { persist } from "zustand/middleware";
import { create } from "zustand";
import { StateCreator } from "zustand";
import { MutableRefObject } from "react";
import { BufferGeometry, Material, Mesh, NormalBufferAttributes, Object3DEventMap } from "three";
import { _012 } from "@/app/utils/grid";
import storeSetters from "./storeHelpers";
import { inverse, MoveCode } from "../utils/moveCodes";
import  { newCubeFaces, CubeFaces } from "@/logic/newCube";
import { modelSpinFunctions, facesSpinFunctions, renderingSpinFunctions } from "../utils/useExecuteMove";
import { printCube } from "@/logic/console/printCube";
import { useIsSolved } from "./selectors";
import { checkFacesAreSolved } from "../utils/checkFacesAreSolved";

export type CubeWrapperMesh = Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>

export type CubeWrapperMeshRef = MutableRefObject<CubeWrapperMesh>

const solvedCubeFaces = newCubeFaces()

const initialFaces = solvedCubeFaces
// const initialFaces = scrambledCubeFaces


const emptyHistory: MoveCode[] = []


/**
 * Represents a 3D cube structure composed of smaller blocks.
 * 
 * The cube is modeled as a three-dimensional array where:
 * - The first dimension represents the columns within each row (x-axis).
 * - The second dimension represents the rows within each layer (y-axis).
 * - The third dimension represents the layers along the depth (z-axis).
 * 
 * Each element in the 3D array is a `SingleBlock`, which represents an individual block within the cube.
 */
export type CubeGrid = CubeWrapperMeshRef[][][]

export type CubeSlice = {
  cubeGrid: CubeGrid,
  faces: CubeFaces,
  // initialFaces: CubeFaces,
  isRotating: MutableRefObject<boolean>,
  history: MoveCode[],
  // setInitialFaces: ((faces: CubeFaces) => void),
  setCubeGrid: ((cubeGrid: CubeGrid) => void),
  pushHistory: (moveCode: MoveCode) => void,  
  popHistory: () => MoveCode | undefined,
  clearHistory: () => void,
  executeMove: (moveCode: MoveCode, animationTime: number) => void,
  undoLastMove: (animationTime: number) => void,

}  

export const useCubeStore = create<CubeSlice>()(
  persist(
    (set) => { 
      const { setValueOf, pushValueTo, popValueFrom } = storeSetters(set)

      return ({
        cubeGrid: _012.map(
          () => _012.map(
            () => _012.map(
              () => ({ current: {} as Mesh })
            )
          ) 
        ),
        faces: initialFaces,
        // initialFaces,
        isRotating: { current: false },
        history: emptyHistory,
        // setInitialFaces: (faces: CubeFaces) => {
        //   set({ 
        //     faces: faces, 
        //     initialFaces: faces 
        //   })
        // },
        setCubeGrid: setValueOf('cubeGrid'),
        pushHistory: pushValueTo('history'),
        popHistory: popValueFrom('history'),
        clearHistory: () => {
          set({ history: emptyHistory })
        },
        executeMove: (moveCode: MoveCode, animationTime: number) => {
          set(({ cubeGrid, faces, pushHistory, isRotating }) => {
            const getUpdatedCubeGrid = modelSpinFunctions[moveCode]
            const updatedCubeGrid = getUpdatedCubeGrid(cubeGrid)

            const getUpdatedFaces = facesSpinFunctions[moveCode]
            const updatedFaces = getUpdatedFaces(faces)

            const renderModel = renderingSpinFunctions[moveCode]
            renderModel(cubeGrid, animationTime, isRotating)

            pushHistory(moveCode)

            logFaces(faces, moveCode, updatedFaces)

            return {
              cubeGrid: updatedCubeGrid,
              faces: updatedFaces
            }
          })
        },
        undoLastMove: (animationTime: number) => {
          set(({ popHistory, setCubeGrid, faces, cubeGrid, isRotating }) => {
            const lastMoveCode = popHistory();
              if (lastMoveCode) {
                const undoMoveCode = inverse(lastMoveCode)
          
                const getUpdatedCubeGrid = modelSpinFunctions[undoMoveCode]
                const updatedCubeGrid = getUpdatedCubeGrid(cubeGrid)
                setCubeGrid(updatedCubeGrid)

                const getUpdatedFaces = facesSpinFunctions[undoMoveCode]
                const updatedFaces = getUpdatedFaces(faces)
          
                const renderModel = renderingSpinFunctions[undoMoveCode]
                renderModel(cubeGrid, animationTime, isRotating)

                logFaces(faces, undoMoveCode, updatedFaces)

                return {
                  cubeGrid: updatedCubeGrid,
                  faces: updatedFaces 
                }
              }

              return {}
          })
        }
      }
    )},
    { 
      name: "cubism-cube",
      partialize: (state) => 
        Object.fromEntries(
          Object.entries(state).filter(([key]) => key !== 'cubeGrid' && key !== 'isRotating')
        ),
     }
  )
)


// export const createCubeSlice: StateCreator<CubeSlice> = (set, get) => { 
//   const { setValueOf, pushValueTo, popValueFrom } = storeSetters(set)


//   return {

//   }
// }


const logFaces = (faces: CubeFaces, moveCode: MoveCode, updatedFaces: CubeFaces) => {

    console.clear()
    console.log(`Move: ${moveCode} --> Current state:`)
    console.log(printCube(updatedFaces))
		console.log('Is solved: ', checkFacesAreSolved(updatedFaces))
    
}