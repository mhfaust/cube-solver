/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import Cube from "./Cube"
import { OrbitControls } from '@react-three/drei'
import { Canvas, ThreeEvent, useFrame, useThree } from "@react-three/fiber"
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Color, Mesh, MeshBasicMaterial, PlaneGeometry } from "three"
import { OrbitControls as ThreeOrbitControls } from 'three-stdlib';
import { cubeRotator,layerRotator } from "../utils/rotator"
import { MoveCode, asKeyCode, inverse, keyMoves } from "@/app/utils/moveCodes"
import { addPointer, getOtherPointer, getPointer, isOnCube, removePointer, resetPointers, swipeInfo } from "@/app/utils/pointers"
import { _012, getCubePosition } from "../utils/grid"
import spinFrontOrBack from "../intents/spinFrontOrBack"
import spinRowXOrY from "../intents/spinRowXOrY"
import twoFingerSpinDirection from "../intents/twoFingerSpinDirection"
import useAppStore, { actionsSelector, gridModelSelector, setGridSelector } from "../store/useAppStore"
import MoveScheduler from "../utils/moveScheduler"
import spinWholeCube from "../intents/spinWholeCube"
import swipesAreCoincident from "../intents/swipesAreCoincident"
import spinZ from "../intents/spinZ"
import scramble from "../effects/scramble"
import styles from '../page.module.css'

const { PI } = Math
const FOV_ANGLE = PI/12
const NORMAL_ROTATION_TIME = 50

const bgGeometry = new PlaneGeometry(50, 50)
const bgMaterial = new MeshBasicMaterial( { color: 0x222222 } );



const CubesContainer = () => {
	const { camera } = useThree();
	const [_history, setHistory] = useState<MoveCode[]>([])
	const { log } = useAppStore(actionsSelector)
	const controls = useRef<ThreeOrbitControls>(null);
	const isRotating = useRef<boolean>(false)
	const downPointers = useRef<Record<string, ThreeEvent<PointerEvent>>>({})
	const movePointers = useRef<Record<string, ThreeEvent<PointerEvent>>>({})
	const grid = useAppStore(gridModelSelector)

	const setGrid = useAppStore(setGridSelector)

	useFrame(({ clock }) => {
		controls.current?.update()
	});

	useEffect(() => {
		if(camera){
			(camera as any).fov = 30 //r3-fiber isn't typing camera correctly :-(
			camera.updateProjectionMatrix();
		}

		if(!controls.current) {
				return
		}
		controls.current.minPolarAngle = PI/2 - FOV_ANGLE;
		controls.current.maxPolarAngle = PI/2 + FOV_ANGLE;
		controls.current.minAzimuthAngle = - FOV_ANGLE;
		controls.current.maxAzimuthAngle =  FOV_ANGLE;
		controls.current.maxDistance = 16
		controls.current.minDistance = 16
		controls.current.enablePan = false

		camera.rotation.y = FOV_ANGLE
		camera.rotation.x = PI/2 + FOV_ANGLE
		camera.lookAt(0,0,0)
		camera.updateProjectionMatrix()
	}, [camera])

	const moveFunctions: Record<MoveCode, (time: number) => void> = useMemo(() => ({
		'U': layerRotator(grid, setGrid, 'y', 2, '-', isRotating),
		'U′': layerRotator(grid, setGrid, 'y', 2, '+', isRotating),
		'D': layerRotator(grid, setGrid, 'y', 0, '+', isRotating),
		'D′': layerRotator(grid, setGrid, 'y', 0, '-', isRotating),
		'L': layerRotator(grid, setGrid, 'x', 0, '+', isRotating),
		'L′': layerRotator(grid, setGrid, 'x', 0, '-', isRotating),
		'R': layerRotator(grid, setGrid, 'x', 2, '-', isRotating),
		'R′': layerRotator(grid, setGrid, 'x', 2, '+', isRotating),
		'F': layerRotator(grid, setGrid, 'z', 2, '-', isRotating),
		'F′': layerRotator(grid, setGrid, 'z', 2, '+', isRotating),
		'B': layerRotator(grid, setGrid, 'z', 0, '+', isRotating),
		'B′': layerRotator(grid, setGrid, 'z', 0, '-', isRotating),
		'Y′': cubeRotator(grid, setGrid, 'y', '-', isRotating),
		'Y': cubeRotator(grid, setGrid, 'y', '+', isRotating),
		'X′': cubeRotator(grid, setGrid, 'x', '-', isRotating),
		'X': cubeRotator(grid, setGrid, 'x', '+', isRotating),
		'Z′': cubeRotator(grid, setGrid, 'z', '+', isRotating),
		'Z': cubeRotator(grid, setGrid, 'z', '-', isRotating),
		'E': layerRotator(grid, setGrid, 'y', 1 , '+', isRotating),
		'E′': layerRotator(grid, setGrid, 'y', 1, '-', isRotating),
		'M': layerRotator(grid, setGrid, 'x', 1, '+', isRotating),
		'M′': layerRotator(grid, setGrid, 'x', 1, '-', isRotating),
		'S': layerRotator(grid, setGrid, 'z', 1, '-', isRotating),
		'S′': layerRotator(grid, setGrid, 'z', 1, '+', isRotating)
	}), [])

	const handleScramble = () => {
		scramble(moveFunctions, 5)

	}

	// useEffect(() => {
	// 	scramble(moveFunctions, 5)
	// }, [])

	useEffect

	const undo = useCallback(() => {
		setHistory((h) => {
			const newHistory = [...h]
			const last = newHistory.pop()
			if(!last) {
				return h
			}
			moveFunctions[inverse(last)](NORMAL_ROTATION_TIME)
			return newHistory
		})
	}, [])
	
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			const keyCode = asKeyCode(e.key)
			if(!keyCode || isRotating.current){
				return
			}
			if(e.metaKey && keyCode === 'z'){
				undo()
			} else {
				const move = keyMoves[keyCode]
				moveFunctions[move](NORMAL_ROTATION_TIME)
				setHistory(h => [...h, move])
			}
		};
		document.addEventListener('keydown', handleKeyDown);
		return () => {
				document.removeEventListener('keydown', handleKeyDown);
		};
	}, [moveFunctions]);

	const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
		if(e.eventObject.uuid === e.intersections[0].eventObject.uuid){
			addPointer(downPointers, e)
			if(controls.current && isOnCube(e)){
				controls.current.enableRotate = false
			}
		}
	}

	const handlePointerUp = (upPointer: ThreeEvent<PointerEvent>) => {

		const downPointer = getPointer(downPointers, upPointer.pointerId)
		if(isRotating.current || !downPointer){
			removePointer(downPointers, upPointer)
			removePointer(movePointers, upPointer)
			return
		}
		if(upPointer.eventObject.uuid === upPointer.intersections[0].eventObject.uuid){

			const moves = new MoveScheduler(
				moveFunctions, 
				moves => setHistory(h => [...h, ...moves]),
				log,
				NORMAL_ROTATION_TIME
			)
			const swipe1 = swipeInfo(downPointer, upPointer)
			const fingers = Object.values(downPointers.current).length
			const isSwipe = swipe1.distance > 5 && swipe1.time < 500
			if(fingers === 1 && isSwipe){
				const cubePosition = getCubePosition(grid, downPointer.eventObject)
				if(cubePosition){
					moves.queue(spinRowXOrY(grid, downPointer, upPointer))
				} 
				else {
					moves.queue(spinWholeCube(swipe1))
				}
			}

			if(fingers === 2 && isSwipe) {
				const baseDownPointer = getOtherPointer(downPointers, downPointer)!
				const baseMovePointer = getPointer(movePointers, baseDownPointer.pointerId)
				const isUpFromCube = isOnCube(upPointer)
				const isBaseOnCube = isOnCube(baseDownPointer)

				//both fingers off:
				if (!isUpFromCube && !isBaseOnCube){
					moves.queue(spinZ(downPointer, upPointer, baseDownPointer))
				}
				//1 finger on, 1 finger off:
				else if(isUpFromCube !== isBaseOnCube){
					moves.queue(spinFrontOrBack(grid, downPointer, upPointer, baseDownPointer))
				} 
				//both fingers on:
				else if(isUpFromCube && isBaseOnCube){

					if(baseMovePointer){
						const swipe2 = swipeInfo(baseDownPointer, baseMovePointer)
						if(swipe2.time < 500 && swipe1.axisDirection === swipe2.axisDirection &&
							!swipesAreCoincident(
								grid, 
								[upPointer, downPointer], 
								[baseDownPointer, baseMovePointer]
							)
							&& swipe2.distance > 10
						) {
							moves.queue(spinRowXOrY(grid, downPointer, upPointer))
							moves.queue(spinRowXOrY(grid, baseDownPointer, baseMovePointer))
						} 
						else {
							const rotation = twoFingerSpinDirection(
								[downPointer, upPointer],
								[baseMovePointer, baseMovePointer]
							)

							moves.queue(rotation === 1 ? 'F' : rotation === -1 ? 'F′': undefined)
						}
					}
				}

			} 
			
			if(fingers > 2 && isSwipe) {
				moves.queue(spinWholeCube(swipe1))
				for(let p of Object.values(downPointers.current)){
					removePointer(downPointers, p)
					removePointer(movePointers, p)
				}
			} 

			moves.execute()
		}

		removePointer (downPointers, upPointer)
		removePointer (movePointers, upPointer)

		if(!Object.values(downPointers.current).some(isOnCube)) {
				controls.current!.enableRotate = true
		}
	}

	const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
		movePointers.current[e.pointerId] = e
	}
	return (
		<>
			<pointLight position={[0, 0, 5]} visible={true} intensity={7} color={ new Color(1, 1, 1)} />
			<ambientLight visible={true} intensity={2} color={ new Color(1, 1, 1)} />
			<OrbitControls ref={controls}/>
			<mesh
				geometry={bgGeometry}
				material={bgMaterial}
				position={[0,0,-10]}
				onPointerUp={handlePointerUp}
				onPointerDown={handlePointerDown}
			/>

			{(_012).map(x0 => (_012).map(y0 => (_012).map(z0 =>(
				<Cube 
					key={`x0:${x0},y0:${y0},z0:${z0}`} 
					x0={x0} 
					y0={y0} 
					z0={z0} 
					containerRef={grid[x0][y0][z0]}
					onPointerDown={handlePointerDown}
					onPointerUp={handlePointerUp}
					onPointerMove={handlePointerMove}
				/>
			))))}
		</>
	)
}

const Cubes = () => { 
	const canvas = useRef<HTMLCanvasElement>(null)
	return (
		<div className={styles.canvas}>
			<Canvas ref={canvas} >
				<CubesContainer />
			</Canvas>
		</div>
	)
};

export default Cubes