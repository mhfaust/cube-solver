'use client';

import Block from "@/components/Block";
import styles from '@/app/my-cube/page.module.css';
import { useIsSolved } from "@/store/selectors";
import useThemeAssets from "@/themes/useThemeAssets";
import calculateDialingAngle from "@/touch/calculateDialingAngle";
import { 
	Pointers, addDownPointer, addMovePointer, getLatestMove, 
	getOtherPointer, isOnCube, removePointer, swipeInfo 
} from "@/touch/pointers";
import spinFrontOrBack from "@/touch/spinFrontOrBack";
import spinRowXOrY from "@/touch/spinRowXOrY";
import spinWholeCube from "@/touch/spinWholeCube";
import spinS from "@/touch/spinS";
import swipesAreCoincident from "@/touch/swipesAreCoincident";
import twoFingerSpinDirection from "@/touch/twoFingerSpinDirection";
import { 
	ANIMATION_TIME, FIELD_OF_VIEW_ANGLE, MAX_SWIPE_ANGLE, 
	MAX_SWIPE_TIME, MIN_DIAL_ANGLE 
} from "@/utils/constants";
import { _012, getBlockPosition } from "@/utils/grid";
import { MoveCode, asKeyCode, keyMoves } from "@/utils/moveCodes";
import { OrbitControls } from '@react-three/drei';
import { Canvas, ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import { RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Color, PlaneGeometry, Vector3 } from "three";
import { OrbitControls as ThreeOrbitControls } from 'three-stdlib';
import { printCube } from "@/logic/console/printCube";
import useEffectOnce from "@/utils/useEffectOnce";
import { mapAllBlockColors } from "@/utils/mapAllBlockColors";
import { useLoggerStore } from "@/store/loggerSlice";
import { useCubeStore } from "@/store/cubeSlice";
import { useThemeStore } from "@/store/themeSlice";

const { PI, abs } = Math;
const bgGeometry = new PlaneGeometry(50, 50);

const BlocksContainer = ({ canvas }:{ canvas: RefObject<HTMLCanvasElement> }) => {
	const { 
		cubeGrid, 
		faces, 
		isRotating, 
		executeMove, 
		undoLastMove 
	} = useCubeStore();
	
	const { log, setFingersOn } = useLoggerStore();
	const isSolved = useIsSolved();
	const { themeName } = useThemeStore();

	const { bgMaterial, pointLightIntensity, ambientLightIntensity } = useThemeAssets(themeName);

	const { camera } = useThree();
	const controls = useRef<ThreeOrbitControls>(null);
	const pointers = useRef<Pointers>({});
	const swipeTimeout = useRef<NodeJS.Timeout | null>(null);

	const [allInitialBlockColors] = useState(mapAllBlockColors(faces));

	useEffectOnce(() => {
		console.log(printCube(faces));
	});

	useFrame(({ clock }) => {
		controls.current?.update();
	});

	useEffect(() => {
		if(camera){
			(camera as any).fov = 30; //r3-fiber isn't typing camera correctly :-(
			camera.updateProjectionMatrix();
		}

		if(!controls.current) {
				return;
		}
		controls.current.enableRotate = true;
		controls.current.minPolarAngle = PI/2 - FIELD_OF_VIEW_ANGLE;
		controls.current.maxPolarAngle = PI/2 + FIELD_OF_VIEW_ANGLE;
		controls.current.minAzimuthAngle = - FIELD_OF_VIEW_ANGLE;
		controls.current.maxAzimuthAngle =  FIELD_OF_VIEW_ANGLE;
		controls.current.maxDistance = 16;
		controls.current.minDistance = 16;
		controls.current.enablePan = false;

		camera.position.set(
			controls.current.minPolarAngle,
			FIELD_OF_VIEW_ANGLE,
			0
		);
		camera.lookAt(new Vector3(0,0,0)); // Set look at coordinate like this
		camera.updateProjectionMatrix();
	}, [camera]);

	
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			const keyCode = asKeyCode(e.key);
			if(!keyCode || isRotating.current){
				return;
			}
			if(e.metaKey && keyCode === 'z'){
				undoLastMove(ANIMATION_TIME);
			} else { 
				const move = keyMoves[keyCode];
				executeMove(move, ANIMATION_TIME);
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
				document.removeEventListener('keydown', handleKeyDown);
		};
	}, [executeMove, isRotating, undoLastMove]);

	const handlePointerDown = useCallback((e: ThreeEvent<PointerEvent>) => {
		if(e.eventObject.uuid === e.intersections[0].eventObject.uuid){
			setTimeout(() => controls.current!.enableRotate = false, 0);
			addDownPointer(pointers.current, e);
			setFingersOn(Object.keys(pointers.current).length);
			clearTimeout(swipeTimeout.current!);
			swipeTimeout.current = setTimeout(() => controls.current!.enableRotate = true, MAX_SWIPE_TIME);
		}
	}, [setFingersOn]);

	const handlePointerUp = useCallback((upPointer: ThreeEvent<PointerEvent>) => {
		const moveCodes: MoveCode[] = [];

		if(Object.entries(pointers.current).length <= 1) {
			controls.current!.enableRotate = true;
		}

		const downPointer = pointers.current[upPointer.pointerId]?.down;
		if(isRotating.current || !downPointer){
			removePointer(pointers.current, upPointer.pointerId);
			return;
		}

		if(upPointer.eventObject.uuid === upPointer.intersections[0].eventObject.uuid) {
			const swipe1 = swipeInfo(downPointer, upPointer);
			const fingers = Object.values(pointers.current).length;

			const pointerIndicatesMove = swipe1.distance > 5 && swipe1.time <= MAX_SWIPE_TIME;

			const dial = calculateDialingAngle(pointers.current, upPointer);

			if(dial > MAX_SWIPE_ANGLE && dial < MIN_DIAL_ANGLE) {
				log(`no-action: ambiguous swipe/dial: ${dial.toFixed(1)}°  (fingers: ${fingers})`);
			}

			else if(fingers === 1 && pointerIndicatesMove){
				const blockPosition = getBlockPosition(cubeGrid, downPointer.eventObject);

				if(blockPosition){
					if(dial > MIN_DIAL_ANGLE) {
						moveCodes.push('F');
					}
					else if (dial < -MIN_DIAL_ANGLE){
						moveCodes.push('Fi');
					}
					else if (abs(dial) < MAX_SWIPE_ANGLE) {
						const moveCode = spinRowXOrY(cubeGrid, downPointer, upPointer);
						if(moveCode) {
							moveCodes.push(moveCode);
						}
					}
				} 

				else {
					if(dial > MIN_DIAL_ANGLE) {
						moveCodes.push('Zi');
					}
					else if (dial < -MIN_DIAL_ANGLE){
						moveCodes.push('Z');
					}
					else if (abs(dial) < MAX_SWIPE_ANGLE) {
						const moveCode = spinWholeCube(swipe1);
						if(moveCode) {
							moveCodes.push(moveCode);
						}
					}
				}
			}

			if(fingers === 2 && pointerIndicatesMove) {
				const {pointerId} = downPointer;
				const baseDownPointer = getOtherPointer(pointers.current, downPointer)!.down;
				const baseMovePointer = getLatestMove(pointers.current, pointerId);
				const isUpFromCube = isOnCube(upPointer);
				const isBaseOnCube = isOnCube(baseDownPointer);

				if (!isUpFromCube && !isBaseOnCube){
					moveCodes.push(spinS(downPointer, upPointer, baseDownPointer));
				}
				else if(isUpFromCube !== isBaseOnCube){
					const moveCode = spinFrontOrBack(cubeGrid, downPointer, upPointer, baseDownPointer);
					if(moveCode) {
						moveCodes.push(moveCode);
					}
				} 
				else if(isUpFromCube && isBaseOnCube){
					if(baseMovePointer){
						const swipe2 = swipeInfo(baseDownPointer, baseMovePointer);
						if(swipe2.time < MAX_SWIPE_TIME && swipe1.axisDirection === swipe2.axisDirection &&
							!swipesAreCoincident(
								cubeGrid, 
								[upPointer, downPointer], 
								[baseDownPointer, baseMovePointer]
							)
							&& swipe2.distance > 10
						) {
							const move1 = spinRowXOrY(cubeGrid, downPointer, upPointer);
							if(move1) {
								moveCodes.push(move1);
							}
							const move2 = spinRowXOrY(cubeGrid, baseDownPointer, baseMovePointer);
							if(move2) {
								moveCodes.push(move2);
							}
						}
						else {
							const rotation = twoFingerSpinDirection(
								[downPointer, upPointer],
								[baseMovePointer, baseMovePointer]
							);
							const moveCode = rotation === 1 ? 'F' : rotation === -1 ? 'Fi': undefined;
							if(moveCode) {
								moveCodes.push(moveCode);
							}
						}
					}
				}
			} 
			
			if(fingers > 2 && pointerIndicatesMove) {
				moveCodes.push(spinWholeCube(swipe1));
				for(let p of Object.values(pointers.current)){
					removePointer(pointers.current, p.down.pointerId);
				}
			} 
			moveCodes.forEach(move => {
				executeMove(move, ANIMATION_TIME);
			});
		}
		removePointer(pointers.current, upPointer.pointerId);
		setFingersOn(Object.keys(pointers.current).length);
	}, [cubeGrid, executeMove, isRotating, log, setFingersOn]);

	const handlePointerMove = useCallback((e: ThreeEvent<PointerEvent>) => {
		if(e.eventObject.uuid === e.intersections[0].eventObject.uuid) {
			const speed = addMovePointer(pointers.current, e);
			if(controls.current){
				controls.current.enableRotate = speed !== undefined && speed < .25;
			}
		}
	}, []);


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
				<Block 
					key={`x0:${x0},y0:${y0},z0:${z0}`} 
					x0={x0} 
					y0={y0} 
					z0={z0} 
					initialFaceColors={allInitialBlockColors[x0][y0][z0]}
					containerRef={cubeGrid[x0][y0][z0]}
					onPointerDown={handlePointerDown}
					onPointerUp={handlePointerUp}
					onPointerMove={handlePointerMove}
				/>
			))))}
		</>
	)
};

const Cube = () => { 
	const canvas = useRef<HTMLCanvasElement>(null);
	return (
		<div className={styles.canvas}>
			<Canvas ref={canvas} >
				<BlocksContainer canvas={canvas}/>
			</Canvas>
		</div>
	);
};

export default Cube;