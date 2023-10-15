'use client'

import Cube from "./Cube"
import { Stats, OrbitControls } from '@react-three/drei'
import { Canvas, ThreeEvent, useFrame, useThree } from "@react-three/fiber"
import { MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Mesh, MeshBasicMaterial, Object3D, PlaneGeometry, Vector3 } from "three"
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

function orbit(
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

function layerObjects <T>(model: MutableRefObject<T>[][][], axis: 'i'|'j'|'k', layer: 0|1|2) {
	return {
		'i': () => model[layer].flat(),
		'j': () => model.map(i => i[layer]).flat(),
		'k': () => model.map(j => j.map(y => y[layer])).flat()
	}[axis]().map(r => r.current)
}

const xAxis = new Vector3(1, 0,0 ).normalize()
const yAxis = new Vector3(0, 1, 0).normalize()
const zAxis = new Vector3(0, 0, 1).normalize()

const makeOrbiter = (angle: number, axis: Vector3) => 
	(cube: Object3D, callback: () => void) => orbit(cube, axis, angle, callback)
const orbitXPositive = makeOrbiter(PI/2, xAxis)
const orbitXNegative = makeOrbiter(-PI/2, xAxis)
const orbitYPositive = makeOrbiter(PI/2, yAxis)
const orbitYNegative = makeOrbiter(-PI/2, yAxis)
const orbitZPositive = makeOrbiter(PI/2, zAxis)
const orbitZNegative = makeOrbiter(-PI/2, zAxis)
type Rotator = typeof orbitZNegative

const coords = [0,1,2] as const


const noop = () => {}

function everyCube<T>(things: T[][][], fn: (t:T) => void) {
	things.forEach(layer => layer.forEach(row => row.forEach(fn)))
}

const bgGeometry = new PlaneGeometry(20, 20)
const bgMaterial = new MeshBasicMaterial( { color: 0x222222 } );

const CubesContainer = () => {

	const { camera } = useThree();
	const [_history, setHistory] = useState<Key[]>([])
	const controlsRef = useRef<ThreeOrbitControls>(null);
	const isRotating = useRef<boolean>(false)
	// const bgGeometryRef = useRef(new PlaneGeometry(20, 20))
	const containerRefs = [
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

	const xPos = curyRotator(orbitXPositive)
	const rotateXLayerPositive = useCallback((i: 0|1|2) => {
		isRotating.current = true
		layerObjects(grid, 'i', i).forEach(xPos)
		setGrid(rotateModelXLayerPositive(grid, i))
	}, [grid, xPos])

	const xNeg = curyRotator(orbitXNegative)
	const rotateXLayerNegative = useCallback((i: 0|1|2) => {
		isRotating.current = true
		layerObjects(grid, 'i', i).forEach(xNeg)
		setGrid(rotateModelXLayerNegative(grid, i))
	}, [grid, xNeg])

	const yPos = curyRotator(orbitYPositive)
	const rotateYLayerPositive = useCallback((j: 0|1|2) => {
		isRotating.current = true
		layerObjects(grid, 'j', j).forEach(yPos)
		setGrid(rotateModelYLayerPositive(grid, j))
	}, [grid, yPos])

	const yNeg = curyRotator(orbitYNegative)
	const rotateYLayerNegative = useCallback((j: 0|1|2) => {
		isRotating.current = true
		layerObjects(grid, 'j', j).forEach(yNeg)
		setGrid(rotateModelYLayerNegative(grid, j))
	}, [grid, yNeg])

	const zPos = curyRotator(orbitZPositive)
	const rotateZLayerPositive = useCallback((k: 0|1|2) => {
		isRotating.current = true
		layerObjects(grid, 'k', k).forEach(zPos)
		setGrid(rotateModelZYalerPositive(grid, k))
	}, [grid, zPos])
	
	const zNeg = curyRotator(orbitZNegative)
	const rotateZLayerNegative = useCallback((k: 0|1|2) => {
		isRotating.current = true
		layerObjects(grid, 'k', k).forEach(zNeg)
		setGrid(rotateModelZLayerNegative(grid, k))
	}, [grid, zNeg])

	const getPosition = (container: Object3D): [0|1|2, 0|1|2, 0|1|2] => {
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				for (let k = 0; k < 3; k++) {
					if(grid[i][j][k].current.children[0] === container) {
						return [i as 0|1|2, j as 0|1|2 ,k as 0|1|2]
					}
				}
			}
		}
		return [1,1,1] //shouldn't happen, but just in case (and for TS)
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
	const handlePointerUp = (upEvent: ThreeEvent<PointerEvent>) => {
		if(upEvent.eventObject.uuid === upEvent.intersections[0].eventObject.uuid){
			console.log('up')
			const downEvent = pointerEvents.current[upEvent.pointerId]
			if(downEvent) {
				const [i,j] = getPosition(downEvent.eventObject)
				const dx = upEvent.x - downEvent.x
				const dy = upEvent.y - downEvent.y
				const dir = abs(dy) > abs(dx)  
					? (dy > 0 ? 'down' : 'up')
					: (dx > 0 ? 'right' : 'left')

				if(dir === 'down') {
					rotateXLayerPositive(i)
				}
				if(dir === 'up') {
					rotateXLayerNegative(i)
				}
				if(dir === 'right') {
					rotateYLayerPositive(j)
				}
				if(dir === 'left') {
					rotateYLayerNegative(j)
				}
			
				delete pointerEvents.current[upEvent.pointerId]
			}
		}
	}

	const handleWheel = (e: ThreeEvent<WheelEvent>) => {

	}

	const handleBgPointerUp = (e: ThreeEvent<PointerEvent>) => {
		
	}

	const handleBgPointerDown = (e: ThreeEvent<PointerEvent>) => {

	}

	return (<>
		<Stats />
		<OrbitControls ref={controlsRef}/>
		<mesh 
			geometry={bgGeometry}
			material={bgMaterial}
			position={[0,0,-10]}
			onPointerUp={handlePointerUp}
			onPointerDown={handleBgPointerDown}
		/>

		{coords.map(x0 => coords.map(y0 => coords.map(z0 =>(
			<Cube 
				key={`x0:${x0},y0:${y0},z0:${z0}`} 
				x0={x0} 
				y0={y0} 
				z0={z0} 
				containerRef={containerRefs[x0][y0][z0]}
				onPointerDown={handlePointerDown}
				onPointerUp={handlePointerUp}
				onWheel={handleWheel}
			/>
		))))}
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