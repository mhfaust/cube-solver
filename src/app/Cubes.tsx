/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import Cube from "./Cube"
import { OrbitControls } from '@react-three/drei'
import { Canvas, ThreeEvent, useFrame, useThree } from "@react-three/fiber"
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Color, Mesh, MeshBasicMaterial, Object3D, PlaneGeometry } from "three"
import { OrbitControls as ThreeOrbitControls } from 'three-stdlib';
import { cubeRotator,layerRotator } from "./utils/rotator"
import { MoveCode, asKeyCode, inverse, keyMoves } from "@/app/utils/moveNotation"
import { AxisDirection, getOtherPointer, getPointer, isOnCube, removePointer, resetPointers, swipeInfo } from "@/app/utils/pointers"
import { GridModel, getCubePosition } from "./utils/grid"
import frontOrBackSpin from "./utils/frontBackSpin"
import { atan } from "three/examples/jsm/nodes/Nodes.js"

let r = 0

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
	// const [timer, setTimer] = useState<NodeJS.Timeout>()

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
			pointers.current.push(e)
			if(isOnCube(e)) {
				controlsRef.current!.enableRotate = false
			}
			log(pointers.current.map((e: any) => e.pointerId).join('-') || 'none')

		}
	}

	const log = (...a: { toString: () => string }[]) => {
		setMessage(a.map(_ => _.toString()).join(' - '))
	}

	const handlePointerUp = (upPointer: ThreeEvent<PointerEvent>) => {

		const downPointer = getPointer(pointers, upPointer.pointerId)
		if(isRotating.current || !downPointer){
			removePointer(pointers, upPointer)
			return
		}
		if(upPointer.eventObject.uuid === upPointer.intersections[0].eventObject.uuid){
			
			
			const swipe = swipeInfo(downPointer, upPointer)
			const downCube = getCubePosition(grid, downPointer.eventObject)
			const upCube = getCubePosition(grid, downPointer.eventObject)
			console.log({theta: swipe.theta})

			const fingers = pointers.current.length

			//TWO FINGERS
			if(fingers === 2 && swipe.distance > 10 && swipe.distance > 10) {
				const otherPointer = getOtherPointer(pointers, downPointer)!
				if(isOnCube(otherPointer) !== isOnCube(upPointer)){
					const move = frontOrBackSpin(grid, downPointer, upPointer, otherPointer, log)
					if(move) {
						moveFunctions[move]()
						setHistory(h => [...h, move])
					}

				} else if(otherPointer){
					// TODO what should we do if neither finger is on the cube when one is lifted up?
				}
			} else if(fingers > 2) {
				const { distance, time, axisDirection: compassDirection } = swipe
				if(distance > 10 && time < 500 ) {
					const map: Record<AxisDirection, MoveCode> = {
						'down': 'X',
						'up': 'X′',
						'right': 'Y',
						'left': 'Y′',
					}
					const move: MoveCode = map[compassDirection]
					moveFunctions[move]()
					setHistory(h => [...h, move])
				}
				for(let p of pointers.current){
					removePointer(pointers, p)
				}

			} else if(downCube){
				// console.log('TODO: handle pointer events originating outside the cubes')
				const [i,j,k] = downCube
				const { distance, time, axisDirection: direction, isVertical } = swipe
				if(distance > 10 && time < 500 ) {
					const map: Record<AxisDirection, MoveCode[]> = {
						'down': ['L', 'M', 'R′'],
						'up': ['L′', 'M′', 'R'],
						'right': ['D', 'E', 'U′'],
						'left': ['D′', 'E′', 'U'],
					}
					const move: MoveCode = map[direction][isVertical ? i : j]
					moveFunctions[move]()
					setHistory(h => [...h, move])
				}
			}
		}
		removePointer (pointers, upPointer)
		if(!pointers.current.some(isOnCube)){
				controlsRef.current!.enableRotate = true
		}
		log(pointers.current.map((e: any) => e.pointerId).join('-') || 'none')
	}

	// log(pointers.current.map((e: any) => e.pointerId).join('-') || 'none')
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
					onPointerMove={console.log}
				/>
			))))}
		</>
	)
}



const Cubes = ({ setMessage }: { setMessage: (m: string) => void }) => { 
	const canvas = useRef<HTMLCanvasElement>(null)

	// useEffect(() => {
	// 	setInterval(() => {

	// 		console.log({ height: canvas.current?.height })
	// 	}, 4000)
	// }, [])


	return (
		<Canvas ref={canvas}>
			<CubesContainer setMessage={setMessage}/>
		</Canvas>
	)
};

export default Cubes