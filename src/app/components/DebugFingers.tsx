import styles from '@/app/page.module.css'
import { useFingersOn } from '@/app/store/useAppStore'

const DebugFingers = () => {

  const fingersOn = useFingersOn()
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