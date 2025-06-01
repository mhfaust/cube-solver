import { persist } from "zustand/middleware";
import { create } from "zustand";
import { MutableRefObject } from "react";
import { BufferGeometry, Material, Mesh, NormalBufferAttributes, Object3DEventMap } from "three";
import { _012 } from "@/utils/grid";
import storeSetters from "./storeHelpers";
import { inverse, MoveCode } from "@/utils/moveCodes";
import  { newCubeFaces, CubeFaces } from "@/logic/newCube";
import { modelSpinFunctions, facesSpinFunctions, renderingSpinFunctions } from "@/utils/useExecuteMove";
import { printCube } from "@/logic/console/printCube";
import { checkFacesAreSolved } from "@/utils/checkFacesAreSolved";
import { CubeHistory } from "./recordsSlice";

export type CubeWrapperMesh = Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>

export type CubeWrapperMeshRef = MutableRefObject<CubeWrapperMesh>

const emptyMoves: CubeHistory['moves'] = []


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
  initialState: CubeFaces,
  isRotating: MutableRefObject<boolean>,
  moves: CubeHistory['moves'],
  // setInitialFaces: ((faces: CubeFaces) => void),
  setCubeGrid: ((cubeGrid: CubeGrid) => void),
  initializeGame: () => void,
  pushMove: (moveCode: MoveCode) => void,  
  popMove: () => CubeHistory['moves'][number] | undefined,
  clearMoves: () => void,
  executeMove: (moveCode: MoveCode, animationTime: number, record?: boolean) => void,
  undoLastMove: (animationTime: number) => void,
}  

export const useCubeStore = create<CubeSlice>()(
  persist(
    (set, get) => { 
      const { setValueOf, popValueFrom } = storeSetters(set)

      return ({
        cubeGrid: _012.map(
          () => _012.map(
            () => _012.map(
              () => ({ current: {} as Mesh })
            )
          ) 
        ),
        faces: newCubeFaces(),
        initialState: newCubeFaces(),
        isRotating: { current: false },
        moves: emptyMoves,
        setCubeGrid: setValueOf('cubeGrid'),
        initializeGame: () => {
          set({ 
            initialState: JSON.parse(JSON.stringify(get().faces)),
          })
        },
        pushMove: (moveCode: MoveCode) => {
          const newMove = {
            moveCode,
            moveTime: new Date().getTime(),
          }
          set({ moves: [...get().moves, newMove]})
        },
        popMove: popValueFrom('moves'),
        clearMoves: () => {
          set({ moves: emptyMoves })
        },
        executeMove: (moveCode: MoveCode, animationTime: number, record=true) => {
          set(({ cubeGrid, faces, pushMove, isRotating }) => {
            const getUpdatedCubeGrid = modelSpinFunctions[moveCode]
            const updatedCubeGrid = getUpdatedCubeGrid(cubeGrid)

            const getUpdatedFaces = facesSpinFunctions[moveCode]
            const updatedFaces = getUpdatedFaces(faces)

            const renderModel = renderingSpinFunctions[moveCode]
            renderModel(cubeGrid, animationTime, isRotating)
            if(record){
              pushMove(moveCode)
            }

            logFaces(faces, moveCode, updatedFaces)

            return {
              cubeGrid: updatedCubeGrid,
              faces: updatedFaces
            }
          })
        },
        undoLastMove: (animationTime: number) => {
          set(({ popMove, setCubeGrid, faces, cubeGrid, isRotating }) => {
            const lastMove = popMove();
            
            if (lastMove) {
                const lastMoveCode = lastMove.moveCode;
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
      partialize: (state) => Object.fromEntries(
        Object.entries(state)
          .filter(([key]) => key !== 'cubeGrid' && key !== 'isRotating')
      ),
      version: 1,
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