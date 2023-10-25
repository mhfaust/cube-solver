'use client'

import Cube from "@/app/components/Cube"
import styles from '@/app/page.module.css'
import { useActions, useGridModel, useIsRotating } from "@/app/store/useAppStore"
import useTheme from "@/app/themes/useTheme"
import dialingAngle from "@/app/touch/dialingAngle"
import { Pointers, addDownPointer, addMovePointer, getLatestMove, getOtherPointer, isOnCube, removePointer, swipeInfo } from "@/app/touch/pointers"
import spinFrontOrBack from "@/app/touch/spinFrontOrBack"
import spinRowXOrY from "@/app/touch/spinRowXOrY"
import SpinScheduler from "@/app/touch/spinScheduler"
import spinWholeCube from "@/app/touch/spinWholeCube"
import spinZ from "@/app/touch/spinZ"
import swipesAreCoincident from "@/app/touch/swipesAreCoincident"
import twoFingerSpinDirection from "@/app/touch/twoFingerSpinDirection"
import { ANIMATION_TIME, FOV_ANGLE, MAX_SWIPE_ANGLE, MAX_SWIPE_TIME, MIN_DIAL_ANGLE } from "@/app/utils/constants"
import { _012, getCubePosition } from "@/app/utils/grid"
import { MoveCode, asKeyCode, inverse, keyMoves } from "@/app/utils/moveCodes"
import useSpinFunctions from "@/app/utils/useSpinFunctions"
import { OrbitControls } from '@react-three/drei'
import { Canvas, ThreeEvent, useFrame, useThree } from "@react-three/fiber"
import { RefObject, useCallback, useEffect, useRef, useState } from 'react'
import { Color, PlaneGeometry, Vector3 } from "three"
import { OrbitControls as ThreeOrbitControls } from 'three-stdlib'

const { PI, abs, floor, max } = Math
const bgGeometry = new PlaneGeometry(50, 50)

const CubesContainer = ({ canvas }:{ canvas: RefObject<HTMLCanvasElement> }) => {
	const { log, setFingersOn } = useActions()
	const isRotating = useIsRotating()
	const grid = useGridModel()
	const { bgMaterial, pointLightIntensity, ambientLightIntensity } = useTheme()

	const { camera } = useThree();
	const [_history, setHistory] = useState<MoveCode[]>([])
	const controls = useRef<ThreeOrbitControls>(null);
	const pointers = useRef<Pointers>({})
	const swipeTimeout = useRef<NodeJS.Timeout | null>(null)

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
		controls.current.enableRotate = true
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
			spinFunctions[inverse(last)](ANIMATION_TIME)
			return newHistory
		})
	}, [spinFunctions])
	
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
				spinFunctions[move](ANIMATION_TIME)
				setHistory(h => [...h, move])
			}
		};
		document.addEventListener('keydown', handleKeyDown);
		return () => {
				document.removeEventListener('keydown', handleKeyDown);
		};
	}, [isRotating, spinFunctions, undo]);

	const handlePointerDown = useCallback((e: ThreeEvent<PointerEvent>) => {

		
		if(e.eventObject.uuid === e.intersections[0].eventObject.uuid){
			setTimeout(() => controls.current!.enableRotate = false, 0)
			addDownPointer(pointers.current, e)
			setFingersOn(Object.keys(pointers.current).length)
			clearTimeout(swipeTimeout.current!)
			swipeTimeout.current = setTimeout(() => controls.current!.enableRotate = true, MAX_SWIPE_TIME)
		}
	}, [setFingersOn])

	const handlePointerUp = useCallback((upPointer: ThreeEvent<PointerEvent>) => {

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
				ANIMATION_TIME
			)
			const swipe1 = swipeInfo(downPointer, upPointer)
			const fingers = Object.values(pointers.current).length

			const isSwipe = swipe1.distance > 5 && swipe1.time <= MAX_SWIPE_TIME

			const dial = dialingAngle(pointers.current, upPointer)
			if(dial > MAX_SWIPE_ANGLE && dial < MIN_DIAL_ANGLE) {
				//do nothing
				 log(`no-action: ambiguous dial: ${dial.toFixed(1)}°  (fingers: ${fingers})`)
			}
			else if(fingers === 1 && isSwipe){
				const cubePosition = getCubePosition(grid, downPointer.eventObject)

				if(cubePosition){
					if(dial > MIN_DIAL_ANGLE) {
						// Array(floor(dial + (90 - MIN_DIAL_ANGLE) / 90)).fill('').forEach(() => {
							spins.queue('F')
						// })
					}
					else if (dial < - MIN_DIAL_ANGLE){
						spins.queue('F′')
					}
					else if (abs(dial) < MAX_SWIPE_ANGLE) {
						spins.queue(spinRowXOrY(grid, downPointer, upPointer))
					}
				} 
				else {
					if(dial > MIN_DIAL_ANGLE) {
						spins.queue('Z')
					}
					else if (dial < -MIN_DIAL_ANGLE){
						spins.queue('Z′')
					}
					else if (abs(dial) < MAX_SWIPE_ANGLE) {
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
						if(swipe2.time < MAX_SWIPE_TIME && swipe1.axisDirection === swipe2.axisDirection &&
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

		setFingersOn(Object.keys(pointers.current).length)

	}, [grid, isRotating, log, setFingersOn, spinFunctions])

	const handlePointerMove = useCallback((e: ThreeEvent<PointerEvent>) => {
		if(e.eventObject.uuid === e.intersections[0].eventObject.uuid) {

			const speed = addMovePointer(pointers.current, e)

			if(controls.current){
				controls.current.enableRotate = speed !== undefined && speed < .25
			}
		}
	}, [])

	return (
		<>
			<pointLight 
				position={[0, 0, 3]} 
				visible={true} 
				intensity={pointLightIntensity} 
				color={ new Color(1, 1, 1)} 
			/>
			<ambientLight 
				visible={true} 
				intensity={ambientLightIntensity} 
				color={ new Color(1, 1, 1)}
			/>
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
				<CubesContainer canvas={canvas}/>
			</Canvas>
		</div>
	)
};

export default Cubes