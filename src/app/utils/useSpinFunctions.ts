import { useMemo } from "react"
import useAppStore, { 
  gridModelSelector, 
  isRotatingSelector, 
  setGridSelector 
} from "../store/useAppStore"
import { MoveCode } from "./moveCodes"
import { cubeRotator, layerRotator } from "./rotator"

const useSpinFunctions = () => {

  const grid = useAppStore(gridModelSelector)
  const setGrid = useAppStore(setGridSelector)
  const isRotating = useAppStore(isRotatingSelector)

  const moveFunctions: Record<MoveCode, (time: number) => void> = useMemo(() => ({
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

  return moveFunctions
}

export default useSpinFunctions