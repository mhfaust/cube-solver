
'use client'

import Cube from './components/Cube'
import styles from './page.module.css'
import Timer from './components/Timer'
import isSolved from './utils/isSolved'
import { useEffect } from 'react'
import { useActions } from './store/useAppStore'
import { usePlayMode } from "./store/selectors"
import { useCubeGrid, useStartTime } from "./store/selectors"
import Completed from './components/Completed'
import Menu from './components/Menu/Menu'

export default function App() {
//   const { setThemeName } = useAppStore(actionsSelector)
// 	useEffect(() => {
//     setTimeout(() => {
//       setThemeName('neon')
//     }, 4000)
//   }, [setThemeName])

  const playMode = usePlayMode()

  const grid = useCubeGrid()
  const startTime = useStartTime()
  const { stopTimer } = useActions()

  
  useEffect(() => {
    if (startTime && isSolved(grid)) {

      stopTimer(true)
    }
  }, [grid, startTime, stopTimer])
  
  return (
    <div className={styles.main}>
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
    </div>
  )
}