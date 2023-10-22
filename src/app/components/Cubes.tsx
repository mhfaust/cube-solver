/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import Cube from "./Cube"
import { OrbitControls } from '@react-three/drei'
import { Canvas, ThreeEvent, useFrame, useThree } from "@react-three/fiber"
import { useCallback, useEffect, useRef, useState } from 'react'
import { Color, MeshBasicMaterial, PlaneGeometry, Vector3 } from "three"
import { OrbitControls as ThreeOrbitControls } from 'three-stdlib';
import { MoveCode, asKeyCode, inverse, keyMoves } from "@/app/utils/moveCodes"
import { addDownPointer, addMovePointer, getLatestMove, getOtherPointer, isOnCube, removePointer, swipeInfo } from "@/app/touch/pointers"
import { _012, getCubePosition } from "../utils/grid"
import spinFrontOrBack from "../touch/spinFrontOrBack"
import spinRowXOrY from "../touch/spinRowXOrY"
import twoFingerSpinDirection from "../touch/twoFingerSpinDirection"
import useAppStore, { actionsSelector, gridModelSelector, isRotatingSelector } from "../store/useAppStore"
import SpinScheduler from "../touch/spinScheduler"
import spinWholeCube from "../touch/spinWholeCube"
import swipesAreCoincident from "../touch/swipesAreCoincident"
import spinZ from "../touch/spinZ"
import styles from '../page.module.css'
import useSpinFunctions from "../utils/useSpinFunctions"
import isSolved from "../utils/isSolved"
import dialingAngle from "../touch/dialingAngle"
import { FOV_ANGLE, MIN_DIAL, NORMAL_ROTATION_TIME } from "../utils/constants"

const { PI } = Math
const bgGeometry = new PlaneGeometry(50, 50)
const bgMaterial = new MeshBasicMaterial( { color: 0x222222 } );

export type Pointers = Record<number, {
	down: ThreeEvent<PointerEvent>,
	moves: ThreeEvent<PointerEvent>[],
}>

const CubesContainer = () => {
	const { camera } = useThree();
	const [_history, setHistory] = useState<MoveCode[]>([])
	const { log } = useAppStore(actionsSelector)
	const controls = useRef<ThreeOrbitControls>(null);
	const isRotating = useAppStore(isRotatingSelector)
	const pointers = useRef<Pointers>({})
	const grid = useAppStore(gridModelSelector)

	if(isSolved(grid)){
		// console.log('SOLVED')
	}

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

		camera.position.set(
			controls.current.minPolarAngle,
			FOV_ANGLE,
			0
		);
		camera.lookAt(new Vector3(0,0,0)); // Set look at coordinate like this
		camera.updateProjectionMatrix()
	}, [camera])

	const spinFunctions = useSpinFunctions()

	const undo = useCallback(() => {
		setHistory((h) => {
			const newHistory = [...h]
			const last = newHistory.pop()
			if(!last) {
				return h
			}
			spinFunctions[inverse(last)](NORMAL_ROTATION_TIME)
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
				spinFunctions[move](NORMAL_ROTATION_TIME)
				setHistory(h => [...h, move])
			}
		};
		document.addEventListener('keydown', handleKeyDown);
		return () => {
				document.removeEventListener('keydown', handleKeyDown);
		};
	}, [spinFunctions]);

	const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
		if(e.eventObject.uuid === e.intersections[0].eventObject.uuid){
			addDownPointer(pointers.current, e)

			if(controls.current && isOnCube(e)){
				controls.current.enableRotate = false
			}
		}
	}

	const handlePointerUp = (upPointer: ThreeEvent<PointerEvent>) => {

		const downPointer = pointers.current[upPointer.pointerId]?.down
		if(isRotating.current || !downPointer){
			removePointer(pointers.current, upPointer.pointerId)
			return
		}
		if(upPointer.eventObject.uuid === upPointer.intersections[0].eventObject.uuid) {

			const spins = new SpinScheduler(
				spinFunctions, 
				moves => setHistory(h => [...h, ...moves]),
				log,
				NORMAL_ROTATION_TIME
			)
			const swipe1 = swipeInfo(downPointer, upPointer)
			const fingers = Object.values(pointers.current).length
			const isSwipe = swipe1.distance > 5 && swipe1.time < 500

			const dial = dialingAngle(pointers.current, upPointer)
			if(dial > 60 && dial < 90) {
				 //do nothing: ambigous, dial vs swipe
			}
			else if(fingers === 1 && isSwipe){
				const cubePosition = getCubePosition(grid, downPointer.eventObject)

				if(cubePosition){
					if(dial > MIN_DIAL) {
						spins.queue('F')
					}
					else if (dial < -MIN_DIAL){
						spins.queue('F′')
					}
					else {
						spins.queue(spinRowXOrY(grid, downPointer, upPointer))
					}
				} 
				else {
					if(dial > MIN_DIAL) {
						spins.queue('Z')
					}
					else if (dial < -MIN_DIAL){
						spins.queue('Z′')
					}
					else {
						spins.queue(spinWholeCube(swipe1))
					}
				}
			}

			if(fingers === 2 && isSwipe) {
				const {pointerId} = downPointer
				const baseDownPointer = getOtherPointer(pointers.current, downPointer)!.down
				const baseMovePointer = getLatestMove(pointers.current, pointerId)//getPointer(movePointers, baseDownPointer.pointerId)
				const isUpFromCube = isOnCube(upPointer)
				const isBaseOnCube = isOnCube(baseDownPointer)

				//both fingers off:
				if (!isUpFromCube && !isBaseOnCube){
					spins.queue(spinZ(downPointer, upPointer, baseDownPointer))
				}
				//1 finger on, 1 finger off:
				else if(isUpFromCube !== isBaseOnCube){
					spins.queue(spinFrontOrBack(grid, downPointer, upPointer, baseDownPointer))
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
							spins.queue(spinRowXOrY(grid, downPointer, upPointer))
							spins.queue(spinRowXOrY(grid, baseDownPointer, baseMovePointer))
						} 
						else {
							const rotation = twoFingerSpinDirection(
								[downPointer, upPointer],
								[baseMovePointer, baseMovePointer]
							)

							spins.queue(rotation === 1 ? 'F' : rotation === -1 ? 'F′': undefined)
						}
					}
				}

			} 
			
			if(fingers > 2 && isSwipe) {
				spins.queue(spinWholeCube(swipe1))
				for(let p of Object.values(pointers.current)){
					removePointer(pointers.current, p.down.pointerId)
				}
			} 

			spins.execute()
		}
		removePointer(pointers.current, upPointer.pointerId)

		if(!Object.values(pointers.current).map(p => p.down).some(isOnCube)) {
				controls.current!.enableRotate = true
		}
	}

	const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
		if(e.eventObject.uuid === e.intersections[0].eventObject.uuid) {
			addMovePointer(pointers.current, e)
		}
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
				onPointerMove={handlePointerMove}
			/>

			{(_012).map(x0 => (_012).map(y0 => (_012).map(z0 =>(
				<Cube 
					key={`x0:${x0},y0:${y0},z0:${z0}`} 
					x0={x0} 
					y0={y0} 
					z0={z0} 
					containerRef={grid[x0][y0][z0].wrapperMesh}
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