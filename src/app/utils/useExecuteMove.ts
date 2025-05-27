import { inverse, MoveCode } from "./moveCodes"
import { cubeModelRotator, layerModelRotator } from "./modelRotators"
import { cubeRenderingRotator, layerRenderingRotator } from './renderingRotators'
import { CubeGrid } from "../store/cubeSlice"
import { MutableRefObject, useCallback } from "react"
import { useActions } from "../store/useAppStore"
import { useCubeGrid, useFaces } from "../store/selectors"
import { yPos } from "@/logic/layerRotations/yPos"
import { CubeFacesTransform } from "@/logic/nextCube"
import { faceTransformsByNotation } from "@/logic/layerRotations/advancedNotation"

const modelSpinFunctions: Record<MoveCode, (cubeGrid: CubeGrid) => CubeGrid> = {
	'U': layerModelRotator('y', 2, '-'),
	'Ui': layerModelRotator('y', 2, '+'),
	'D': layerModelRotator('y', 0, '+'),
	'Di': layerModelRotator('y', 0, '-'),
	'L': layerModelRotator('x', 0, '+'),
	'Li': layerModelRotator('x', 0, '-'),
	'R': layerModelRotator('x', 2, '-'),
	'Ri': layerModelRotator('x', 2, '+'),
	'F': layerModelRotator('z', 2, '-'),
	'Fi': layerModelRotator('z', 2, '+'),
	'B': layerModelRotator('z', 0, '+'),
	'Bi': layerModelRotator('z', 0, '-'),
	'Yi': cubeModelRotator('y', '-'),
	'Y': cubeModelRotator('y', '+'),
	'Xi': cubeModelRotator('x', '-'),
	'X': cubeModelRotator('x', '+'),
	'Zi': cubeModelRotator('z', '-'),
	'Z': cubeModelRotator('z', '+'),
	'E': layerModelRotator('y', 1 , '+'),
	'Ei': layerModelRotator('y', 1, '-'),
	'M': layerModelRotator('x', 1, '+'),
	'Mi': layerModelRotator('x', 1, '-'),
	'S': layerModelRotator('z', 1, '-'),
	'Si': layerModelRotator('z', 1, '+')
}

const facesSpinFunctions: Record<MoveCode, CubeFacesTransform> = {
	'U': faceTransformsByNotation.U, 
	'Ui': faceTransformsByNotation.Ui,
	'D': faceTransformsByNotation.D,
	'Di': faceTransformsByNotation.Di,
	'L': faceTransformsByNotation.L,
	'Li': faceTransformsByNotation.Li,
	'R': faceTransformsByNotation.R,
	'Ri': faceTransformsByNotation.Ri,
	'F': faceTransformsByNotation.F,
	'Fi': faceTransformsByNotation.Fi,
	'B': faceTransformsByNotation.B,
	'Bi': faceTransformsByNotation.Bi, 
	'Yi': faceTransformsByNotation.Yi,
	'Y': faceTransformsByNotation.Y,
	'Xi': faceTransformsByNotation.Xi,
	'X': faceTransformsByNotation.X,
	'Zi': faceTransformsByNotation.Zi,
	'Z': faceTransformsByNotation.Z,
	'E': faceTransformsByNotation.E,
	'Ei': faceTransformsByNotation.Ei,
	'M': faceTransformsByNotation.M,
	'Mi': faceTransformsByNotation.Mi,
	'S': faceTransformsByNotation.S,
	'Si': faceTransformsByNotation.Si,
};

const renderingSpinFunctions: Record<
	MoveCode, (cubeGrid: CubeGrid, animationTime: number, isRotating: MutableRefObject<boolean>) => void
> = {
	'U': layerRenderingRotator('y', 2, '-'),
	'Ui': layerRenderingRotator('y', 2, '+'),
	'D': layerRenderingRotator('y', 0, '+'),
	'Di': layerRenderingRotator('y', 0, '-'),
	'L': layerRenderingRotator('x', 0, '+'),
	'Li': layerRenderingRotator('x', 0, '-'),
	'R': layerRenderingRotator('x', 2, '-'),
	'Ri': layerRenderingRotator('x', 2, '+'),
	'F': layerRenderingRotator('z', 2, '-'),
	'Fi': layerRenderingRotator('z', 2, '+'),
	'B': layerRenderingRotator('z', 0, '+'),
	'Bi': layerRenderingRotator('z', 0, '-'),
	'Yi': cubeRenderingRotator('y', '-'),
	'Y': cubeRenderingRotator('y', '+'),
	'Xi': cubeRenderingRotator('x', '-'),
	'X': cubeRenderingRotator('x', '+'),
	'Zi': cubeRenderingRotator('z', '-'),
	'Z': cubeRenderingRotator('z', '+'),
	'E': layerRenderingRotator('y', 1 , '+'),
	'Ei': layerRenderingRotator('y', 1, '-'),
	'M': layerRenderingRotator('x', 1, '+'),
	'Mi': layerRenderingRotator('x', 1, '-'),
	'S': layerRenderingRotator('z', 1, '-'),
	'Si': layerRenderingRotator('z', 1, '+')
}


export const useExecuteMove = () => {
	const { setCubeGrid, setFaces, pushHistory } = useActions();
	const cubeGrid = useCubeGrid();
	const faces = useFaces();
	
	const executeMove = useCallback((moveCode: MoveCode, animationTime: number, isRotating: MutableRefObject<boolean>) => {
		
		const getUpdatedCubeGrid = modelSpinFunctions[moveCode]
		const updatedCubeGrid = getUpdatedCubeGrid(cubeGrid)
		setCubeGrid(updatedCubeGrid)

		const getUpdatedFaces = facesSpinFunctions[moveCode]
		const updatedFaces = getUpdatedFaces(faces)
		setFaces(updatedFaces)

		pushHistory(moveCode)

		const renderModel = renderingSpinFunctions[moveCode]
		renderModel(cubeGrid, animationTime, isRotating)
	}, [cubeGrid, setCubeGrid, pushHistory])	 

	return executeMove;
}

export const useUndoLastMove = () => {
	const { popHistory, setCubeGrid } = useActions()
	const cubeGrid = useCubeGrid()

	const undoMove = useCallback((animationTime: number, isRotating: MutableRefObject<boolean>) => {

		const lastMoveCode = popHistory()
		
		if (lastMoveCode) {
			const undoMoveCode = inverse(lastMoveCode)

			const getUpdatedCubeGrid = modelSpinFunctions[undoMoveCode]
			const updatedCubeGrid = getUpdatedCubeGrid(cubeGrid)
			setCubeGrid(updatedCubeGrid)

			const renderModel = renderingSpinFunctions[undoMoveCode]
			renderModel(cubeGrid, animationTime, isRotating)
		}
	}, [cubeGrid, popHistory, setCubeGrid])

	return undoMove
}

