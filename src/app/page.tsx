
'use client'

import Cube from '@/components/Cube'
import styles from './page.module.css'
import Timer from '@/components/Timer'
import { useEffect } from 'react'
import { useIsSolved, usePlayMode } from "../store/selectors"
import Completed from '@/components/Completed'
import Menu from '@/components/Menu/Menu'
import UndoButton from '@/components/UndoButton/UndoButton'
import Log from '@/components/Log'
import NoSsr from '@/components/NoSsr/NoSsr'
import { useGameControlsStore } from '../store/gameControlsSlice'
import { useCubeStore } from '../store/cubeSlice'

export default function App() {

  const {  startTime, stopTimer } = useGameControlsStore()
  const playMode  = usePlayMode()
  const isSolved = useIsSolved();
  const { cubeGrid, moves } = useCubeStore()

  useEffect(() => {
    if (startTime && isSolved) {

      stopTimer(true)
    }
  }, [cubeGrid, isSolved, startTime, stopTimer])

  const SHOW_LOG = false;
  
  return (
      <NoSsr>
        <div className={styles.main}>
          {moves.length > 0 && (
            <UndoButton />
          )}
          {playMode === 'casual' && (
            <Menu />
          )}
          {playMode === 'complete' && ( 
            <Completed />
          )}  
          <Cube />
          {playMode !== 'complete' && (
            <Timer />
          )}
          {SHOW_LOG && <Log />}
        </div>
      </NoSsr>
  )
}