/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import Cube from "./Cube"
import { OrbitControls } from '@react-three/drei'
import { Canvas, ThreeEvent, useFrame, useThree } from "@react-three/fiber"
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Color, Mesh, MeshBasicMaterial, Object3D, PlaneGeometry } from "three"
import { OrbitControls as ThreeOrbitControls } from 'three-stdlib';
import { GridModel,cubeRotator,layerRotator } from "./utils/rotator"
import { MoveCode, asKeyCode, inverse, keyMoves } from "@/app/utils/moveNotation"
import { SwipeDirection, getOtherPointer, getPointer, isOnCube, removePointer, resetPointers, swipeInfo } from "@/app/utils/pointers"

const { PI, abs, sqrt, pow } = Math

const FOV_ANGLE = PI/12

// function everyCube<T>(things: T[][][], fn: (t:T) => void) {
// 	things.forEach(layer => layer.forEach(row => row.forEach(fn)))
// }

const bgGeometry = new PlaneGeometry(50, 50)
const bgMaterial = new MeshBasicMaterial( { color: 0x222222 } );

const _012 = [0,1,2] as const

type CubesContainerProps = { setMessage: (m: string) => void }
const CubesContainer = ({ setMessage }: CubesContainerProps) => {
	const { camera } = useThree();
	const [_history, setHistory] = useState<MoveCode[]>([])
	const controlsRef = useRef<ThreeOrbitControls>(null);
	const isRotating = useRef<boolean>(false)
	const pointers = useRef<ThreeEvent<PointerEvent>[]>([])

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

	const getCubePosition = (container: Object3D): [0|1|2, 0|1|2, 0|1|2] | undefined => {
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				for (let k = 0; k < 3; k++) {
					if(grid[i][j][k].current.children[0] === container) {
						return [i as 0|1|2, j as 0|1|2 ,k as 0|1|2]
					}
				}
			}
		}
	}

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
			pointers.current.push(e)
		}
		const ids = pointers.current.map((e: any) => e.pointerId).join('-')
		// setMessage(`touching: ` + ids)
	}

	const msg = (...a: { toString: () => string }[]) => {
		setMessage(a.map(_ => _.toString()).join(' - '))
	}

	const handlePointerUp = (upPointer: ThreeEvent<PointerEvent>) => {

		if(upPointer.eventObject.uuid === upPointer.intersections[0].eventObject.uuid){
			console.log(upPointer)
		}
		
		if(isRotating.current){
			removePointer(pointers, upPointer)
			return
		}
		
		const downPointer = getPointer(pointers, upPointer.pointerId)
		if(!downPointer) {
			return
		}
		const swipe = swipeInfo(downPointer, upPointer)
		const downCube = getCubePosition(downPointer.eventObject)
		const upCube = getCubePosition(downPointer.eventObject)

		const center = grid[1][1][1]
		console.log(center.current.children[0])

		const fingers = pointers.current.length

		//TWO FINGERS
		if(fingers === 2 && swipe.distance > 10 && swipe.distance > 10) {
			const otherPointer = getOtherPointer(pointers, downPointer)
			if(otherPointer && isOnCube(otherPointer) !== isOnCube(upPointer)){
				const fnGroups = [['B′','B'],['F', 'F′']] as const
				const fns = fnGroups[isOnCube(otherPointer) ? 0: 1]
				const swipedAbove = upPointer.y < otherPointer.y 
				const swipedRight = swipe.dx > 0
				const [_,j] = getCubePosition(upPointer.eventObject) || []
				msg(j ?? 'undefined')

				const move: MoveCode = swipedAbove === swipedRight ? fns[0] : fns[1]
				moveFunctions[move]()
				setHistory(h => [...h, move])

			} else if(otherPointer){

			}
		} else if(fingers === 3) {
			const { distance, time, direction } = swipe
			if(distance > 10 && time < 500 ) {
				const map: Record<SwipeDirection, MoveCode> = {
					'swipedDown': 'X',
					'swipedUp': 'X′',
					'swipedRight': 'Y',
					'swipedLeft': 'Y′',
				}
				const move: MoveCode = map[direction]
				moveFunctions[move]()
				setHistory(h => [...h, move])
			}

		} else if(downCube){
			// console.log('TODO: handle pointer events originating outside the cubes')
			const [i,j,k] = downCube
			const { distance, time, direction, isVertical } = swipe
			if(distance > 10 && time < 500 ) {
				const map: Record<SwipeDirection, MoveCode[]> = {
					'swipedDown': ['L', 'M', 'R′'],
					'swipedUp': ['L′', 'M′', 'R'],
					'swipedRight': ['D', 'E', 'U′'],
					'swipedLeft': ['D′', 'E′', 'U'],
				}
				const move: MoveCode = map[direction][isVertical ? i : j]
				moveFunctions[move]()
				setHistory(h => [...h, move])
			}
		}
		// pointers.current = []
		removePointer (pointers, downPointer)
		const ids = pointers.current.map((e: any) => e.pointerId).join('-')
		// setMessage(`touching: ` + ids)
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
								/>
							)
						)
					)
				)
			}
		</>
	)
}



const Cubes = ({ setMessage }: { setMessage: (m: string) => void }) => { 
	const canavas = useRef<HTMLCanvasElement>(null)


	return (
		<Canvas ref={canavas}>
			<CubesContainer setMessage={setMessage}/>
		</Canvas>
	)
};

export default Cubes