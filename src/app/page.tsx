
'use client'

import Cubes from './components/Cubes'
import styles from './page.module.css'
import StartStop from './components/Timer/StartStop'
import Timer from './components/Timer'
import isSolved from './utils/isSolved'
import { useEffect } from 'react'
import { useActions, useGridModel, useStartTime } from './store/useAppStore'

export default function App() {
//   const { setThemeName } = useAppStore(actionsSelector)
// 	useEffect(() => {
//     setTimeout(() => {
//       setThemeName('neon')
//     }, 4000)
//   }, [setThemeName])

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
      <Cubes />
      <Timer />
    </div>
  )
}