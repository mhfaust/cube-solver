import styles from './DebugFingers.module.scss'
import {  } from "@/store/selectors"
import { useLoggerStore } from '@/store/loggerSlice'

/**
 * 
 * @returns A set of numbers for each finger that is on the screen
 */
const DebugFingers = () => {

  const { fingersOn } = useLoggerStore();
  const f = Array(fingersOn).fill('').map((_,i) => i)
  return (
    <div className={styles.fingers}>
      {f.map(i => (
        <div key={i} className={styles.finger}>{' '}</div>
      ))}
    </div>
  )
}
export default DebugFingers