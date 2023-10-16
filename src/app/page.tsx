
'use client'

import { useState } from 'react'
import Cubes from './Cubes'
import styles from './page.module.css'

export default function App() {
	const [message, setMessage] = useState<string>('')

  
  return (
    <div className={styles.main}>
      <div 
        style={{ position: 'fixed', top: 0, height: '2em', left: 0, right: 0, zIndex: 1, background: 'blue' }}
      >{'>: '}{message}</div>
      <Cubes setMessage={setMessage}/>
    </div>
  )
}