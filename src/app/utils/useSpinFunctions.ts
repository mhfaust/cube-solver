import { useMemo } from "react"

import { MoveCode } from "./moveCodes"
import { cubeRotator, layerRotator } from "./rotator"
import { useActions } from "../store/useAppStore"
import { useGridModel, useIsRotating } from "../store/selectors"

const useSpinFunctions = () => {

  const grid = useGridModel()
  const { setGrid } = useActions()
  const isRotating = useIsRotating()

  const spinFunctions: Record<MoveCode, (time: number) => void> = useMemo(() => ({
		'U': layerRotator('y', 2, '-', grid, setGrid, isRotating ),
		'U′': layerRotator('y', 2, '+', grid, setGrid, isRotating ),
		'D': layerRotator('y', 0, '+', grid, setGrid, isRotating ),
		'D′': layerRotator('y', 0, '-', grid, setGrid, isRotating ),
		'L': layerRotator('x', 0, '+', grid, setGrid, isRotating ),
		'L′': layerRotator('x', 0, '-', grid, setGrid, isRotating ),
		'R': layerRotator('x', 2, '-', grid, setGrid, isRotating ),
		'R′': layerRotator('x', 2, '+', grid, setGrid, isRotating ),
		'F': layerRotator('z', 2, '-', grid, setGrid, isRotating ),
		'F′': layerRotator('z', 2, '+', grid, setGrid, isRotating ),
		'B': layerRotator('z', 0, '+', grid, setGrid, isRotating ),
		'B′': layerRotator('z', 0, '-', grid, setGrid, isRotating ),
		'Y′': cubeRotator('y', '-', grid, setGrid, isRotating ),
		'Y': cubeRotator('y', '+', grid, setGrid, isRotating ),
		'X′': cubeRotator('x', '-', grid, setGrid, isRotating ),
		'X': cubeRotator('x', '+', grid, setGrid, isRotating ),
		'Z′': cubeRotator('z', '+', grid, setGrid, isRotating ),
		'Z': cubeRotator('z', '-', grid, setGrid, isRotating ),
		'E': layerRotator('y', 1 , '+', grid, setGrid, isRotating ),
		'E′': layerRotator('y', 1, '-', grid, setGrid, isRotating ),
		'M': layerRotator('x', 1, '+', grid, setGrid, isRotating ),
		'M′': layerRotator('x', 1, '-', grid, setGrid, isRotating ),
		'S': layerRotator('z', 1, '-', grid, setGrid, isRotating ),
		'S′': layerRotator('z', 1, '+', grid, setGrid, isRotating )
	}), [grid, isRotating, setGrid])

  return spinFunctions
}

export default useSpinFunctions