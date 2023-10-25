import styles from "./Completed.module.css"
import { useStartTime } from "@/app/store/selectors"
import { useCompletionTime } from "@/app/store/selectors"
import { useActions } from "@/app/store/useAppStore"
import { reportTime } from "@/app/utils/displayTime"

const Completed = () => {
  const { resetTimer } = useActions()
  const startTime = useStartTime()
  const completedTime = useCompletionTime()

  return (
    <div className={styles.completed}>
      <p>solved in:</p>
      <p>{reportTime(completedTime - startTime)}</p>
      <div className={styles.completedButtons}>
        <button onClick={resetTimer} type="button">
            Save
        </button>
        <button onClick={resetTimer} type="button">
            Discard
        </button>
      </div>

    </div>
  )
}

export default Completed