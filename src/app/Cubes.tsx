/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import Cube from "./Cube"
import { Stats, OrbitControls } from '@react-three/drei'
import { Canvas, ThreeEvent, useFrame, useThree } from "@react-three/fiber"
import { MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Color, Mesh, MeshBasicMaterial, Object3D, PlaneGeometry, PointLight, Vector3 } from "three"
import { OrbitControls as ThreeOrbitControls } from 'three-stdlib';
import { 
	GridModel,
	cubeRotator,
	layerRotator,
} from "./rotations"
import { MoveCode, asKeyCode, inverse, keyMoves } from "@/utils/moveNotation"

const { PI, abs, sqrt, pow } = Math

const FOV_ANGLE = PI/20

function everyCube<T>(things: T[][][], fn: (t:T) => void) {
	things.forEach(layer => layer.forEach(row => row.forEach(fn)))
}

const bgGeometry = new PlaneGeometry(20, 20)
const bgMaterial = new MeshBasicMaterial( { color: 0x222222 } );

const _012 = [0,1,2] as const

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

	const pointerDownEvents = useRef<Record<string, ThreeEvent<PointerEvent>>>({})



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
			pointerDownEvents.current[e.pointerId] = e
		}
	}

	const handlePointerUp = (upEvent: ThreeEvent<PointerEvent>) => {
		if(isRotating.current){
			return
		}
		console.log('handlePointerUp')
		if(upEvent.eventObject.uuid === upEvent.intersections[0].eventObject.uuid){

			const downEvent = pointerDownEvents.current[upEvent.pointerId]

			if(downEvent) {
				const position = getPosition(downEvent.eventObject)
				if(!position){
					console.log('TODO: handle pointer events originating outside the cubes')
					return
				}
				const [i,j,k] = position
				const dx = upEvent.x - downEvent.x
				const dy = upEvent.y - downEvent.y
				const distance = sqrt(pow(dx, 2) + pow(dy, 2))
				const time = upEvent.timeStamp - downEvent.timeStamp
				// console.log({ time})
				if(distance < 10 || time > 1200) {
					return
				}
				const isVertical = abs(dy) > abs(dx) 
				const swipeDirection = isVertical 
					? (dy > 0 ? 'swipedDown' : 'swipedUp')
					: (dx > 0 ? 'swipedRight' : 'swipedLeft')
				const map: Record<typeof swipeDirection, MoveCode[]> = {
					'swipedDown': ['L', 'M', 'R′'],
					'swipedUp': ['L′', 'M′', 'R'],
					'swipedRight': ['D', 'E', 'U′'],
					'swipedLeft': ['D′', 'E′', 'U'],
				}
				const move: MoveCode = map[swipeDirection][isVertical ? i : j]
				moveFunctions[move]()
				setHistory(h => [...h, move])

				delete pointerDownEvents.current[upEvent.pointerId]
			}
		}
	}

	const handleBgPointerDown = (e: ThreeEvent<PointerEvent>) => {

	}

	return (<>
		{/* <Stats /> */}
		<pointLight position={[0, 0, 5]} visible={true} intensity={7} color={ new Color(1, 1, 1)} />
		<ambientLight visible={true} intensity={2} color={ new Color(1, 1, 1)} />
		{/* <Light /> */}
		<OrbitControls ref={controlsRef}/>
		<mesh
			geometry={bgGeometry}
			material={bgMaterial}
			position={[0,0,-10]}
			onPointerUp={handlePointerUp}
			onPointerDown={handleBgPointerDown}
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