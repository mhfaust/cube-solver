'use client'

import Cube from "./Cube"
import { Stats, OrbitControls } from '@react-three/drei'
import { Canvas, ThreeEvent, useFrame, useThree } from "@react-three/fiber"
import { MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Mesh, Object3D, Vector3 } from "three"
import { OrbitControls as ThreeOrbitControls } from 'three-stdlib';
import { 
	rotateModelXLayerNegative, 
	rotateModelXLayerPositive, 
	rotateModelYLayerNegative, 
	rotateModelYLayerPositive, 
	rotateModelZLayerNegative,
	rotateModelZYalerPositive
} from "./gridModelRotations"

const { PI, atan, abs, tan } = Math

type Key = 'u' | 'U' | 'd' | 'D' | 'l' | 'L' | 'r' | 'R' | 'f' | 'F' | 'b' | 'B' | 'ArrowLeft' | 'ArrowRight' | 'ArrowUp' | 'ArrowDown' | '[' | ']'
const oppositeKeys: Record<Key, Key> = {
	'u': 'U',
	'U': 'u',
	'd': 'D',
	'D': 'd',
	'l': 'L',
	'L': 'l',
	'r': 'R',
	'R': 'r',
	'f': 'F',
	'F': 'f',
	'b': 'B',
	'B': 'b',
	'ArrowLeft': 'ArrowRight',
	'ArrowRight': 'ArrowLeft',
	'ArrowUp': 'ArrowDown',
	'ArrowDown': 'ArrowUp',
	'[': ']',
	']': '[',
}

const ROTATION_STEPS = 30
const ROTATION_TIME = 135
const FOV_ANGLE = PI/20

function rotate(
        cube: Object3D, 
        axis: Vector3, 
        angle: number,
				callback: () => void
    ) {
		const r = (i: number) => {
			setTimeout(() => {
				cube.rotateOnWorldAxis(axis, angle / (ROTATION_STEPS))
				if(i < ROTATION_STEPS - 1){
					r(i + 1)
				} else callback()
			}, ROTATION_TIME / ROTATION_STEPS)
		}
		r(0)
}

function layerObjects <T>(model: MutableRefObject<T>[][][], axis: 'x'|'y'|'z', layer: 0|1|2) {
	return {
		'x': () => model[layer].flat(),
		'y': () => model.map(x => x[layer]).flat(),
		'z': () => model.map(x => x.map(y => y[layer])).flat()
	}[axis]().map(r => r.current)
}

const rotateXPositive = (cube: Object3D, callback: () => void) => rotate(cube, xAxis, PI/2, callback)
const rotateXNegative = (cube: Object3D, callback: () => void) => rotate(cube, xAxis, -PI/2, callback)
const rotateYPositive = (cube: Object3D, callback: () => void) => rotate(cube, yAxis, PI/2, callback)
const rotateYNegative = (cube: Object3D, callback: () => void) => rotate(cube, yAxis, -PI/2, callback)
const rotateZPositive = (cube: Object3D, callback: () => void) => rotate(cube, zAxis, PI/2, callback)
const rotateZNegative = (cube: Object3D, callback: () => void) => rotate(cube, zAxis, -PI/2, callback)
type Rotator = typeof rotateZNegative

const coords = [0,1,2] as const

const xAxis = new Vector3(1, 0,0 ).normalize()
const yAxis = new Vector3(0, 1, 0).normalize()
const zAxis = new Vector3(0, 0, 1).normalize()

const noop = () => {}

function everyCube<T>(things: T[][][], fn: (t:T) => void) {
	things.forEach(layer => layer.forEach(row => row.forEach(fn)))
}

const CubesContainer = () => {

	const { camera } = useThree();
	const controlsRef = useRef<ThreeOrbitControls>(null);
	const [_history, setHistory] = useState<Key[]>([])
	const isRotating = useRef<boolean>(false)

	// const _refs = coords.map((i) => coords.map((j) => coords.map((k) => (useRef({} as Mesh)))))
	const refs = [
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


	const [grid, setGrid] = useState(refs)
	const pointerEvents = useRef<Record<string, ThreeEvent<PointerEvent>>>({})

	useFrame(({ clock }) => {
		controlsRef.current?.update()
	});

	const controls = controlsRef.current
	useEffect(() => {
		if(camera){
			(camera as any).fov = 30 //r3-fiber isn't typing camera correctly :-(
			camera.updateProjectionMatrix();
		}
		
		if(!controls) {
				return
		}
		controls.minPolarAngle = PI/2 - FOV_ANGLE;
		controls.maxPolarAngle = PI/2 + FOV_ANGLE;
		controls.minAzimuthAngle = - FOV_ANGLE;
		controls.maxAzimuthAngle =  FOV_ANGLE;
		controls.maxDistance = 16
		controls.minDistance = 16
		controls.enablePan = false
	}, [camera, controls])
    
	const curyRotator = (rotator: Rotator) => (cube: Object3D) => {
		rotator(cube, () => isRotating.current = false)
	}

	const xPos = curyRotator(rotateXPositive)
	const rotateXLayerPositive = useCallback((x: 0|1|2) => {
		isRotating.current = true
		layerObjects(grid, 'x', x).forEach(xPos)
		setGrid(rotateModelXLayerPositive(grid, x))
	}, [grid, xPos])

	const xNeg = curyRotator(rotateXNegative)
	const rotateXLayerNegative = useCallback((x: 0|1|2) => {
		isRotating.current = true
		layerObjects(grid, 'x', x).forEach(xNeg)
		setGrid(rotateModelXLayerNegative(grid, x))
	}, [grid, xNeg])

	const yPos = curyRotator(rotateYPositive)
	const rotateYLayerPositive = useCallback((y: 0|1|2) => {
		isRotating.current = true
		layerObjects(grid, 'y', y).forEach(yPos)
		setGrid(rotateModelYLayerPositive(grid, y))
	}, [grid, yPos])

	const yNeg = curyRotator(rotateYNegative)
	const rotateYLayerNegative = useCallback((y: 0|1|2) => {
		isRotating.current = true
		layerObjects(grid, 'y', y).forEach(yNeg)
		setGrid(rotateModelYLayerNegative(grid, y))
	}, [grid, yNeg])

	const zPos = curyRotator(rotateZPositive)
	const rotateZLayerPositive = useCallback((z: 0|1|2) => {
		isRotating.current = true
		layerObjects(grid, 'z', z).forEach(zPos)
		setGrid(rotateModelZYalerPositive(grid, z))
	}, [grid, zPos])
	
	const zNeg = curyRotator(rotateZNegative)
	const rotateZLayerNegative = useCallback((z: 0|1|2) => {
		isRotating.current = true
		layerObjects(grid, 'z', z).forEach(zNeg)
		setGrid(rotateModelZLayerNegative(grid, z))
	}, [grid, zNeg])

	const getCoords = (container: Object3D): [0|1|2, 0|1|2, 0|1|2] => {
		for (let x = 0; x < 3; x++) {
			for (let y = 0; y < 3; y++) {
				for (let z = 0; z < 3; z++) {
					if(grid[x][y][z].current.children[0] === container) {
						return [x as 0|1|2, y as 0|1|2 ,z as 0|1|2]
					}
				}
			}
		}
		console.log('not found')
		return [0,0,0]
	}

	useEffect(() => {

		const keyCodeFunctions: Record<Key, () => void> = {
			'u': () => rotateYLayerNegative(2),
			'U': () => rotateYLayerPositive(2),
			'd': () => rotateYLayerPositive(0),
			'D': () => rotateYLayerNegative(0),
			'l': () => rotateXLayerPositive(0),
			'L': () => rotateXLayerNegative(0),
			'r': () => rotateXLayerNegative(2),
			'R': () => rotateXLayerPositive(2),
			'f': () => rotateZLayerNegative(2),
			'F': () => rotateZLayerPositive(2),
			'b': () => rotateZLayerPositive(0),
			'B': () => rotateZLayerNegative(0),
			'ArrowLeft': () => coords.forEach(rotateYLayerNegative),
			'ArrowRight': () => coords.forEach(rotateYLayerPositive),
			'ArrowUp': () => coords.forEach(rotateXLayerNegative),
			'ArrowDown': () => coords.forEach(rotateXLayerPositive),
			'[': () => coords.forEach(rotateZLayerPositive),
			']': () => coords.forEach(rotateZLayerNegative)
		}

		const handleKeyDown = (e: KeyboardEvent) => {
			if(isRotating.current){
				return
			}
			if(e.metaKey && e.key === 'z'){
				//Undo:
				setHistory((h) => {
					const newHistory = [...h]
					const last = newHistory.pop()
					if(last){
						keyCodeFunctions[oppositeKeys[last]]()
					}
					return newHistory
				})
					
			} else {
				const fn = keyCodeFunctions[e.key as Key]
				if(fn){
					fn()
					setHistory(h => [...h, e.key as Key])
				}
			}
		};
		document.addEventListener('keydown', handleKeyDown);
		return () => {
				document.removeEventListener('keydown', handleKeyDown);
		};
	}, [	
		grid, 
		rotateXLayerNegative, 
		rotateXLayerPositive, 
		rotateYLayerNegative, 
		rotateYLayerPositive, 
		rotateZLayerNegative, 
		rotateZLayerPositive
	]);


	const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
		pointerEvents.current[e.pointerId] = e
	}
	const handlePointerUp = () => (upEvent: ThreeEvent<PointerEvent>) => {
		if(upEvent.eventObject.uuid === upEvent.intersections[0].eventObject.uuid){
			console.log({ pointerEventObjects: Object.keys(pointerEvents.current)})
			const downEvent = pointerEvents.current[upEvent.pointerId]
			if(downEvent) {
				const [x,y,z] = getCoords(downEvent.eventObject)
				const dx = upEvent.x - downEvent.x
				const dy = upEvent.y - downEvent.y
				const dir = abs(dy) > abs(dx)  
					? (dy > 0 ? 'down' : 'up')
					: (dx > 0 ? 'right' : 'left')

					// console.log({x,y,z})

				if(dir === 'down') {
					rotateXLayerPositive(x)
				}
				if(dir === 'up') {
					rotateXLayerNegative(x)
				}
				if(dir === 'right') {
					rotateYLayerPositive(y)
				}
				if(dir === 'left') {
					rotateYLayerNegative(y)
				}
			
				delete pointerEvents.current[upEvent.pointerId]
			}
		}
	}

	const handleWheel = (e: ThreeEvent<WheelEvent>) => {

	}


	return (<>
		<Stats />
		<OrbitControls ref={controlsRef}/>
		<mesh
			// onPointerUp={console.log}
			// onPointerDown={handlePointerDown()}
			onPointerMissed={console.log}
		>
			{coords.map(x0 => coords.map(y0 => coords.map(z0 =>(
				<Cube 
					key={`x0:${x0},y0:${y0},z0:${z0}`} 
					x0={x0} 
					y0={y0} 
					z0={z0} 
					containerRef={refs[x0][y0][z0]}
					onPointerDown={handlePointerDown}
					onPointerUp={handlePointerUp()}
					onWheel={handleWheel}
				/>
			))))}
		</mesh>
	</>)
}

const Cubes = () => { 
	return (
		<Canvas>
			<CubesContainer/>
		</Canvas>
	)
};

export default Cubes