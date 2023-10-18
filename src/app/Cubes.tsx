/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import Cube from "./Cube"
import { OrbitControls } from '@react-three/drei'
import { Canvas, ThreeEvent, useFrame, useThree } from "@react-three/fiber"
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Color, Mesh, MeshBasicMaterial, Object3D, PlaneGeometry } from "three"
import { OrbitControls as ThreeOrbitControls } from 'three-stdlib';
import { cubeRotator,layerRotator } from "./utils/rotator"
import { MoveCode, asKeyCode, inverse, keyMoves } from "@/app/utils/moveCodes"
import { AxisDirection, addPointer, getOtherPointer, getPointer, isOnCube, removePointer, resetPointers, swipeInfo } from "@/app/utils/pointers"
import { GridModel, getCubePosition } from "./utils/grid"
import spinFrontOrBack from "./utils/spinFrontOrBack"
import spinRowXOrY from "./utils/spinRowXOrY"
import twoFingerRotationDirection from "./utils/twoFingerRotationDirection"
import useAppStore, { actionsSelector } from "./useAppStore"
import MoveScheduler from "./utils/moveScheduler"
import spinWholeCube from "./utils/spinWholeCube"

const { PI } = Math
const FOV_ANGLE = PI/12

const bgGeometry = new PlaneGeometry(50, 50)
const bgMaterial = new MeshBasicMaterial( { color: 0x222222 } );

const _012 = [0,1,2] as const

const CubesContainer = () => {
	const { camera } = useThree();
	const [_history, setHistory] = useState<MoveCode[]>([])
	const { log } = useAppStore(actionsSelector)
	const controlsRef = useRef<ThreeOrbitControls>(null);
	const isRotating = useRef<boolean>(false)
	const downPointers = useRef<Record<string, ThreeEvent<PointerEvent>>>({})
	const movePointers = useRef<Record<string, ThreeEvent<PointerEvent>>>({})

	const containerRefs: GridModel = [
			[
					[useRef({} as Mesh), useRef({} as Mesh), useRef({} as Mesh)],
					[useRef({} as Mesh), useRef({} as Mesh), useRef({} as Mesh)],
					[useRef({} as Mesh), useRef({} as Mesh), useRef({} as Mesh)]
			],
			[
					[useRef({} as Mesh), useRef({} as Mesh), useRef({} as Mesh)],
					[useRef({} as Mesh), useRef({} as Mesh), useRef({} as Mesh)],
					[useRef({} as Mesh), useRef({} as Mesh), useRef({} as Mesh)]
			],
			[
					[useRef({} as Mesh), useRef({} as Mesh), useRef({} as Mesh)],
					[useRef({} as Mesh), useRef({} as Mesh), useRef({} as Mesh)],
					[useRef({} as Mesh), useRef({} as Mesh), useRef({} as Mesh)]
			],
	]
	const [grid, setGrid] = useState(containerRefs)

	useFrame(({ clock }) => {
		controlsRef.current?.update()
	});

	useEffect(() => {
		if(camera){
			(camera as any).fov = 30 //r3-fiber isn't typing camera correctly :-(
			camera.updateProjectionMatrix();
		}
		
		if(!controlsRef.current) {
				return
		}
		controlsRef.current.minPolarAngle = PI/2 - FOV_ANGLE;
		controlsRef.current.maxPolarAngle = PI/2 + FOV_ANGLE;
		controlsRef.current.minAzimuthAngle = - FOV_ANGLE;
		controlsRef.current.maxAzimuthAngle =  FOV_ANGLE;
		controlsRef.current.maxDistance = 16
		controlsRef.current.minDistance = 16
		controlsRef.current.enablePan = false
	}, [camera])

	const moveFunctions: Record<MoveCode, () => void> = useMemo(() => ({
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

	const undo = useCallback(() => {
		setHistory((h) => {
			const newHistory = [...h]
			const last = newHistory.pop()
			if(!last) {
				return h
			}
			moveFunctions[inverse(last)]()
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
				moveFunctions[move]()
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
			if(isOnCube(e)) {
				controlsRef.current!.enableRotate = false
			}
		}
	}

	const handlePointerUp = (upPointer: ThreeEvent<PointerEvent>) => {

		const downPointer = getPointer(downPointers, upPointer.pointerId)
		if(isRotating.current || !downPointer){
			removePointer(downPointers, upPointer, log)
			removePointer(movePointers, upPointer, log)
			return
		}
		if(upPointer.eventObject.uuid === upPointer.intersections[0].eventObject.uuid){

			const moves = new MoveScheduler(
				moveFunctions, 
				moves => setHistory(h => [...h, ...moves]),
				log
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
				const otherPointer = getOtherPointer(downPointers, downPointer)!
				//1 finger on, 1 finger off:
				if(isOnCube(upPointer) !== isOnCube(otherPointer)){
					moves.queue(spinFrontOrBack(grid, downPointer, upPointer, otherPointer))
				} 
				//both fingers on:
				else if(isOnCube(upPointer) && isOnCube(otherPointer)){
					const otherMovePointer = getPointer(movePointers, otherPointer.pointerId)
					if(otherMovePointer){
						const swipe2 = swipeInfo(otherPointer, otherMovePointer)
						if(swipe1.axisDirection === swipe2.axisDirection) {
							moves.queue(spinRowXOrY(grid, downPointer, upPointer))
							moves.queue(spinRowXOrY(grid, otherPointer, otherMovePointer))
						} 
						else {
							const rotation = twoFingerRotationDirection(
								[downPointer, upPointer],
								[otherPointer, otherMovePointer]
							)
							moves.queue(rotation === 1 ? 'F' : rotation === -1 ? 'F′': undefined)
						}
					}
				}
				//both fingers off:
				else {
					// ???
				}
			} 
			
			if(fingers > 2 && isSwipe) {
				moves.queue(spinWholeCube(swipe1))
				for(let p of Object.values(downPointers.current)){
					removePointer(downPointers, p, log)
					removePointer(movePointers, p, log)
				}
			} 

			moves.execute()
		}

		removePointer (downPointers, upPointer, log)
		removePointer (movePointers, upPointer, log)

		if(!Object.values(downPointers.current).some(isOnCube)) {
				controlsRef.current!.enableRotate = true
		}
	}

	const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
		movePointers.current[e.pointerId] = e
	}
	return (
		<>
			<pointLight position={[0, 0, 5]} visible={true} intensity={7} color={ new Color(1, 1, 1)} />
			<ambientLight visible={true} intensity={2} color={ new Color(1, 1, 1)} />
			<OrbitControls ref={controlsRef}/>
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
					containerRef={containerRefs[x0][y0][z0]}
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
		<Canvas ref={canvas}>
			<CubesContainer />
		</Canvas>
	)
};

export default Cubes