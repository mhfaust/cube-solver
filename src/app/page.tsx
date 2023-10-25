
'use client'

import Cubes from './components/Cubes'
import styles from './page.module.css'
import StartStop from './components/StartStop'
import Timer from './components/Timer'
import isSolved from './utils/isSolved'
import useAppStore, { actionsSelector, gridModelSelector, startTimeSelector } from './store/useAppStore'
import { useEffect } from 'react'

export default function App() {
//   const { setThemeName } = useAppStore(actionsSelector)
// 	useEffect(() => {
//     setTimeout(() => {
//       setThemeName('neon')
//     }, 4000)
//   }, [setThemeName])

  const grid = useAppStore(gridModelSelector)
  const startTime = useAppStore(startTimeSelector)
  const { startTimer, stopTimer } = useAppStore(actionsSelector)

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
      {/* <Log /> */}
      <Cubes />
      <StartStop />
      <Timer />
    </div>
  )
}