
'use client'

import Cubes from './components/Cubes'
import styles from './page.module.css'
import Log from './components/Log'
import GameControls from './components/GameControls/GameCntrols'


export default function App() {

  return (
    <div className={styles.main}>
      <Log />
      <GameControls />
      <Cubes />
    </div>
  )
}