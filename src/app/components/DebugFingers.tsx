import useAppStore, { fingersOnSelector } from "../store/useAppStore"
import styles from '../page.module.css'

const DebugFingers = () => {

  const fingersOn = useAppStore(fingersOnSelector)
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