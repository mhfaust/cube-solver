import { useEffect, useRef, useState } from "react"
import styles from '@/app/page.module.css'
import { useStartTime } from "@/app/store/useAppStore"
import StartStop from "@/app/components/Timer/StartStop"

const { floor, pow, min } = Math
const ps = ['','0','00','000']
const pad0 = (n: number, p = 2) => {
  const s = n.toString()
  return `${ps[min(p - s.length)]}${s}`
}

const displayTime = (milis: number | undefined) => {
  if(milis === undefined) {
    return ''
  }
  const hun = floor(milis / 10) % 100
  const s = floor(milis / 1000) % 60
  const m = floor(milis / 60000) % 60
  const h = floor (milis / 3600000)
  return `${pad0(h)}:${pad0(m)}:${pad0(s)}.${pad0(hun)}`
}

const Timer = () => {

  const timerRef = useRef<NodeJS.Timeout>()

  const [ellapsedTime, setEllapsedTime] = useState<number>()
  const startTime = useStartTime()
  
  useEffect(() => {

    console.log({startTime}, {timer: timerRef.current})
    if( !timerRef.current && startTime !== null ) {
      timerRef.current = setInterval(() => {
          setEllapsedTime(Date.now() - startTime)
      }, 10)
    }

    if (timerRef.current && startTime === null){
      clearTimeout(timerRef.current)
      timerRef.current = undefined
      setEllapsedTime(undefined)
    }
  }, [startTime])


  return (
    <div className={styles.timer}>
      {displayTime(ellapsedTime)}
      <StartStop />
    </div>
  )
}

export default Timer