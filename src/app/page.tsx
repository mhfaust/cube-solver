
'use client'

import Cubes from './components/Cubes'
import styles from './page.module.css'
import StartStop from './components/Timer/StartStop'
import Timer from './components/Timer'
import isSolved from './utils/isSolved'
import { useEffect } from 'react'
import { useActions } from './store/useAppStore'
import { usePlayMode } from "./store/selectors"
import { useGridModel, useStartTime } from "./store/selectors"
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

  const grid = useGridModel()
  const startTime = useStartTime()
  const { startTimer, stopTimer } = useActions()

  useEffect(() => {
    if (startTime && isSolved(grid)) {

      stopTimer(true)
    }
  }, [grid, startTime, stopTimer])
  
  if(isSolved(grid)){
		console.log('SOLVED')
	}

  return (
    <div className={styles.main}>
      {playMode === 'casual' && (
        <Menu />
      )}
      {playMode === 'complete' && (
        <Completed />
      )}
      <Cubes />
      {playMode !== 'complete' && (
        <Timer />
      )}
    </div>
  )
}