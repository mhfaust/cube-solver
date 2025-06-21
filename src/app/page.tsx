
'use client'

import NoSsr from '@/components/NoSsr/NoSsr'
import styles from './page.module.css'
import Link from 'next/link'
import CubeIcon from '@/components/CubeIcon'
import SpeedometerIcon from '@/components/SpeedometerIcon'
import ThemesIcon from '@/components/ThemesIcon'

export default function App() {

  return (
      <NoSsr>
        <div className={styles.main}>
            <h1 className={styles.h1}>CUBE<span className={styles.ist}>ist</span></h1>
            <Link href="/my-cube" className={styles.link}>
                <CubeIcon width={40}className={styles.svg}/>  My Cube
            </Link>
            <Link href="/game-plays" className={styles.link}>
                <SpeedometerIcon width={40}className={styles.svg}/>  Leaderboard
            </Link>
            <Link href="/theme" className={styles.link}>
                <ThemesIcon width={40} className={styles.svg}/> Theme
            </Link>
        </div>
      </NoSsr>
  )
}