
'use client'

import Cubes from './Cubes'
import styles from './page.module.css'
import Log from './Log'


export default function App() {

  return (
    <div className={styles.main}>
      <Log />
      <Cubes />
    </div>
  )
}