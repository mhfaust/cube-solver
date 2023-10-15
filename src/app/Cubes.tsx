'use client'

import Cube from "./Cube"
import { Stats, OrbitControls } from '@react-three/drei'
import { Canvas, ThreeEvent, useFrame, useThree } from "@react-three/fiber"
import { MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Mesh, MeshBasicMaterial, Object3D, PlaneGeometry, Vector3 } from "three"
import { OrbitControls as ThreeOrbitControls } from 'three-stdlib';
import { 
	GridModel,
	LayerRotator,
	rotateModelXLayerNegative, 
	rotateModelXLayerPositive, 
	rotateModelYLayerNegative, 
	rotateModelYLayerPositive, 
	rotateModelZLayerNegative,
	rotateModelZYalerPositive
} from "./gridModelRotations"
import { KeyCode, MoveCode, asKeyCode, inverse, keyMoves } from "@/utils/moveNotation"

const { PI, abs } = Math

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

function everyCube<T>(things: T[][][], fn: (t:T) => void) {
	things.forEach(layer => layer.forEach(row => row.forEach(fn)))
}

const bgGeometry = new PlaneGeometry(20, 20)
const bgMaterial = new MeshBasicMaterial( { color: 0x222222 } );

// const cury = (
// 	grid: GridModel,
// 	setGrid: (g :GridModel) => void,
// 	layerRotator: LayerRotator,
// 	cubRotator: (cube: Object3D) => void,
// 	layer: 0|1|2, 
// 	isRotating: MutableRefObject<boolean>
// ) => {
// 	isRotating.current = true
// 	layerObjects(grid, 'i', layer).forEach(cubRotator)
// 	setGrid(layerRotator(grid, layer))
// }

const CubesContainer = () => {

	const { camera } = useThree();
	const [_history, setHistory] = useState<MoveCode[]>([])
	const controlsRef = useRef<ThreeOrbitControls>(null);
	const isRotating = useRef<boolean>(false)
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
	const pointerEvents = useRef<Record<string, ThreeEvent<PointerEvent>>>({})

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

	const getPosition = (container: Object3D): [0|1|2, 0|1|2, 0|1|2] | undefined => {
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

	useEffect(() => {
		const moveFunctions: Record<MoveCode, () => void> = {
			'U': () => rotateYLayerNegative(2),
			'U′': () => rotateYLayerPositive(2),
			'D': () => rotateYLayerPositive(0),
			'D′': () => rotateYLayerNegative(0),
			'L': () => rotateXLayerPositive(0),
			'L′': () => rotateXLayerNegative(0),
			'R': () => rotateXLayerNegative(2),
			'R′': () => rotateXLayerPositive(2),
			'F': () => rotateZLayerNegative(2),
			'F′': () => rotateZLayerPositive(2),
			'B': () => rotateZLayerPositive(0),
			'B′': () => rotateZLayerNegative(0),
			'Y′': () => coords.forEach(rotateYLayerNegative),
			'Y': () => coords.forEach(rotateYLayerPositive),
			'X′': () => coords.forEach(rotateXLayerNegative),
			'X': () => coords.forEach(rotateXLayerPositive),
			'Z′': () => coords.forEach(rotateZLayerPositive),
			'Z': () => coords.forEach(rotateZLayerNegative),
			'E': () => rotateYLayerNegative(1),
			'E′': () => rotateYLayerNegative(1),
			'M': () => rotateXLayerPositive(1),
			'M′': () => rotateXLayerNegative(1),
			'S': () => rotateZLayerNegative(1),
			'S′': () => rotateZLayerPositive(1)
		}

		const handleKeyDown = (e: KeyboardEvent) => {
			const keyCode = asKeyCode(e.key)
			if(!keyCode || isRotating.current){
				return
			}
			if(e.metaKey && keyCode === 'z'){
				//Undo:
				setHistory((h) => {
					const newHistory = [...h]
					const last = newHistory.pop()
					if(!last) {
						return h
					}
					moveFunctions[inverse(last)]()
					return newHistory
				})
					
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
	}, [ grid, rotateXLayerNegative, rotateXLayerPositive, rotateYLayerNegative, rotateYLayerPositive, rotateZLayerNegative, rotateZLayerPositive]);

	const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
		pointerEvents.current[e.pointerId] = e
	}
	const handlePointerUp = (upEvent: ThreeEvent<PointerEvent>) => {
		if(upEvent.eventObject.uuid === upEvent.intersections[0].eventObject.uuid){

			const downEvent = pointerEvents.current[upEvent.pointerId]
			if(downEvent) {
				const position = getPosition(downEvent.eventObject)
				if(!position){
					console.log('TODO: handle pointerevents originating outside cubes')
					return
				}

				const [i,j,k] = position
				const dx = upEvent.x - downEvent.x
				const dy = upEvent.y - downEvent.y
				const dir = abs(dy) > abs(dx)  
					? (dy > 0 ? 'down' : 'up')
					: (dx > 0 ? 'right' : 'left')

				if(dir === 'down') {
					['l']
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