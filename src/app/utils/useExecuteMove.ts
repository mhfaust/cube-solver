import { inverse, MoveCode } from "./moveCodes"
import { cubeModelRotator, layerModelRotator } from "./modelRotators"
import { cubeRenderingRotator, layerRenderingRotator } from './renderingRotators'
import { CubeGrid } from "../store/cubeSlice"
import { MutableRefObject, useCallback } from "react"
import { useActions } from "../store/useAppStore"
import { useCubeGrid } from "../store/selectors"

const modelSpinFunctions: Record<MoveCode, (cubeGrid: CubeGrid) => CubeGrid> = {
	'U': layerModelRotator('y', 2, '-'),
	'U′': layerModelRotator('y', 2, '+'),
	'D': layerModelRotator('y', 0, '+'),
	'D′': layerModelRotator('y', 0, '-'),
	'L': layerModelRotator('x', 0, '+'),
	'L′': layerModelRotator('x', 0, '-'),
	'R': layerModelRotator('x', 2, '-'),
	'R′': layerModelRotator('x', 2, '+'),
	'F': layerModelRotator('z', 2, '-'),
	'F′': layerModelRotator('z', 2, '+'),
	'B': layerModelRotator('z', 0, '+'),
	'B′': layerModelRotator('z', 0, '-'),
	'Y′': cubeModelRotator('y', '-'),
	'Y': cubeModelRotator('y', '+'),
	'X′': cubeModelRotator('x', '-'),
	'X': cubeModelRotator('x', '+'),
	'Z′': cubeModelRotator('z', '+'),
	'Z': cubeModelRotator('z', '-'),
	'E': layerModelRotator('y', 1 , '+'),
	'E′': layerModelRotator('y', 1, '-'),
	'M': layerModelRotator('x', 1, '+'),
	'M′': layerModelRotator('x', 1, '-'),
	'S': layerModelRotator('z', 1, '-'),
	'S′': layerModelRotator('z', 1, '+')
}

const renderingSpinFunctions: Record<
	MoveCode, (cubeGrid: CubeGrid, animationTime: number, isRotating: MutableRefObject<boolean>) => void
> = {
	'U': layerRenderingRotator('y', 2, '-'),
	'U′': layerRenderingRotator('y', 2, '+'),
	'D': layerRenderingRotator('y', 0, '+'),
	'D′': layerRenderingRotator('y', 0, '-'),
	'L': layerRenderingRotator('x', 0, '+'),
	'L′': layerRenderingRotator('x', 0, '-'),
	'R': layerRenderingRotator('x', 2, '-'),
	'R′': layerRenderingRotator('x', 2, '+'),
	'F': layerRenderingRotator('z', 2, '-'),
	'F′': layerRenderingRotator('z', 2, '+'),
	'B': layerRenderingRotator('z', 0, '+'),
	'B′': layerRenderingRotator('z', 0, '-'),
	'Y′': cubeRenderingRotator('y', '-'),
	'Y': cubeRenderingRotator('y', '+'),
	'X′': cubeRenderingRotator('x', '-'),
	'X': cubeRenderingRotator('x', '+'),
	'Z′': cubeRenderingRotator('z', '+'),
	'Z': cubeRenderingRotator('z', '-'),
	'E': layerRenderingRotator('y', 1 , '+'),
	'E′': layerRenderingRotator('y', 1, '-'),
	'M': layerRenderingRotator('x', 1, '+'),
	'M′': layerRenderingRotator('x', 1, '-'),
	'S': layerRenderingRotator('z', 1, '-'),
	'S′': layerRenderingRotator('z', 1, '+')
}


export const useExecuteMove = () => {
	const { setCubeGrid, pushHistory } = useActions()
	const cubeGrid = useCubeGrid()
	
	const executeMove = useCallback((moveCode: MoveCode, animationTime: number, isRotating: MutableRefObject<boolean>) => {
		const getUpdatedCubeGrid = modelSpinFunctions[moveCode]
		const updatedCubeGrid = getUpdatedCubeGrid(cubeGrid)
		setCubeGrid(updatedCubeGrid)

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

