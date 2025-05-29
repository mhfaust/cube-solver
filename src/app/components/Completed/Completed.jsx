import { useGameControlsStore } from "@/app/store/gameControlsSlice"
import styles from "./Completed.module.css"
import { reportTime } from "@/app/utils/displayTime"

const Completed = () => {
  const { resetTimer, startTime, completedTime } = useGameControlsStore()

  return (
    <div className={styles.completed}>
      <p>Solved in</p>
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