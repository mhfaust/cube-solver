'use client'

import Cube from "./Cube"
import { Stats, OrbitControls } from '@react-three/drei'
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { createRef, useEffect, useRef, useState } from 'react'
import { Mesh, Object3D, Vector3, Quaternion, Clock } from "three"
import { Easing, Tween, update } from "three/examples/jsm/libs/tween.module.js"
import { OrbitControls as ThreeOrbitControls } from 'three-stdlib';
import { 
	rotateModelXLayerNegative, 
	rotateModelXLayerPositive, 
	rotateModelYLayerNegative, 
	rotateModelYLayerPositive, 
	rotateModelZLayerNegative,
	rotateModelZYalerPositive
} from "./gridModelRotations"

const { PI } = Math

const oppositeKeys = {
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
type Key = keyof typeof oppositeKeys;

function rotate(
        cube: Object3D, 
        axis: Vector3, 
        angle: number, 
    ) {
		const steps = 30
		const r = (i: number) => {
			setTimeout(() => {
				cube.rotateOnWorldAxis(axis, angle / (steps))
				if(i < steps - 1){
					r(i + 1)
				}
			}, 135 / steps)
		}
		r(0)
}

const rotateXPositive = (cube: Object3D) => rotate(cube, xAxis, PI / 2)
const rotateXNegative = (cube: Object3D) => rotate(cube, xAxis, -PI / 2)
const rotateYPositive = (cube: Object3D) => rotate(cube, yAxis, PI / 2)
const rotateYNegative = (cube: Object3D) => rotate(cube, yAxis, -PI / 2)
const rotateZPositive = (cube: Object3D) => rotate(cube, zAxis, PI / 2)
const rotateZNegative = (cube: Object3D) => rotate(cube, zAxis, -PI / 2)

const coords = [0,1,2] as const

const xAxis = new Vector3(1, 0,0 ).normalize()
const yAxis = new Vector3(0, 1, 0).normalize()
const zAxis = new Vector3(0, 0, 1).normalize()
const origin = new Vector3(0, 0, 0).normalize()

const CubesContainer = () => {
    const { scene, camera } = useThree();
    const controlsRef = useRef<ThreeOrbitControls>(null);

		const [history, setHistory] = useState<Key[]>([])

    useFrame(({ clock }) => {
        controlsRef.current?.update()
				// const a = clock.getElapsedTime()
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
			controls.minPolarAngle = 2/5 * PI;
			controls.maxPolarAngle = 3/5 * PI;

			controls.minAzimuthAngle = -1/10 * PI;
			controls.maxAzimuthAngle = 1/10 * PI;

			controls.maxDistance = 16
			controls.minDistance = 16

			controls.enablePan = false
    }, [camera, controls])

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
            [useRef({} as Mesh), useRef({} as Mesh),useRef({} as Mesh)]
        ],
    ]

    const [grid, setGrid] = useState(refs)

    
    useEffect(() => {
        const rotateXLayerPositive = (x:0|1|2) => {
            const cubes = grid[x].flat().map(r => r.current)
            cubes.forEach(rotateXPositive)
            setGrid(rotateModelXLayerPositive(grid, x))
        }
    
        const rotateXLayerNegative = (x:0|1|2) => {
            const cubes = grid[x].flat().map(r => r.current)
            cubes.forEach(rotateXNegative)
            setGrid(rotateModelXLayerNegative(grid, x))
        }
    
        const rotateYLayerPositive = (y: 0|1|2) => {
            const cubes = grid.map(layer => layer[y])
                .flat().map(r => r.current)
            cubes.forEach(rotateYPositive)
            setGrid(rotateModelYLayerPositive(grid, y))
        }
    
        const rotateYLayerNegative = (y: 0|1|2) => {
            const cubes = grid.map(layer => layer[y])
                .flat().map(r => r.current)
            cubes.forEach(rotateYNegative)
            setGrid(rotateModelYLayerNegative(grid, y))
        }
    
        const rotateZLayerPositive = (z: 0|1|2) => {
            const cubes = grid.map(layer => layer.map(line => line[z]))
                .flat().map(r => r.current)
            cubes.forEach(rotateZPositive)
            setGrid(rotateModelZYalerPositive(grid, z))
        }
    
        const rotateZLayerNegative = (z:0|1|2) => {
            const cubes = grid.map(layer => layer.map(line => line[z]))
                .flat().map(r => r.current)
            cubes.forEach(rotateZNegative)
            setGrid(rotateModelZLayerNegative(grid, z))
        }

        const keyCodeFunctions: Record<string, () => void> = {
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
								
						}
						const fn = keyCodeFunctions[e.key]
						if(fn){
							fn()
							setHistory(h => [...h, e.key as Key])
						}
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
      }, [grid]);

    return (<>
        <Stats />
        <OrbitControls ref={controlsRef}/>
        {coords.map(i => coords.map(j => coords.map(k =>(
            <Cube 
                key={`i:${i},j:${j},k:${k}`} 
                x0={i-1} 
                y0={j-1} 
                z0={k-1} 
                containerRef={refs[i][j][k]}
            />
        ))))}
     </>)
}

const Cubes = () => (
	<Canvas>
		<CubesContainer/>
	</Canvas>
);

export default Cubes