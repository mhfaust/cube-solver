import { useEffect, useRef, useState } from "react"
import styles from './Timer.module.css'
import { usePlayMode } from "@/app/store/selectors"
import StartStop from "@/app/components/Timer/StartStop"
import { stopWatchTime } from "@/app/utils/displayTime"
import { useGameControlsStore } from "@/app/store/gameControlsSlice"

const Timer = () => {

  const timerRef = useRef<NodeJS.Timeout>()

  const [ellapsedTime, setEllapsedTime] = useState<number>()
  const { startTime } = useGameControlsStore()
  const mode = usePlayMode()
  
  useEffect(() => {

    if( startTime && !timerRef.current && mode === 'in-play' ) {
      timerRef.current = setInterval(() => {
          setEllapsedTime(Date.now() - startTime)
      }, 10)
    }

    if (timerRef.current && mode !== 'in-play'){
      clearTimeout(timerRef.current)
      timerRef.current = undefined
      setEllapsedTime(undefined)
    }
  }, [mode, startTime])


  return (
    <div className={styles.timer}>
      {stopWatchTime(ellapsedTime)}
      <StartStop />
    </div>
  )
}

export default Timer