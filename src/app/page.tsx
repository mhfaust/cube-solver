
'use client'

import Cube from './components/Cube'
import styles from './page.module.css'
import Timer from './components/Timer'
import { useEffect } from 'react'
import { useActions } from './store/useAppStore'
import { useHistory, useIsSolved, usePlayMode } from "./store/selectors"
import { useCubeGrid, useStartTime } from "./store/selectors"
import Completed from './components/Completed'
import Menu from './components/Menu/Menu'
import UndoButton from './components/UndoButton/UndoButton'
import Log from './components/Log'
import NoSsr from './components/NoSsr/NoSsr'

export default function App() {
//   const { setThemeName } = useAppStore(actionsSelector)
// 	useEffect(() => {
//     setTimeout(() => {
//       setThemeName('neon')
//     }, 4000)
//   }, [setThemeName])

  const playMode = usePlayMode()
  const isSolved = useIsSolved();
  const grid = useCubeGrid()
  const startTime = useStartTime()
  const { stopTimer } = useActions()
  const history = useHistory()

  
  useEffect(() => {
    if (startTime && isSolved) {

      stopTimer(true)
    }
  }, [grid, isSolved, startTime, stopTimer])
  
  return (
      <div className={styles.main}>
        {history.length > 0 && (
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
        <Log />
      </div>
  )
}