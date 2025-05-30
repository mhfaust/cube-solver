import { useGameControlsStore } from "@/app/store/gameControlsSlice"
import styles from "./Completed.module.css"
import { reportTime } from "@/app/utils/displayTime"
import { useCubeStore } from "@/app/store/cubeSlice"

const Completed = () => {
  const { resetTimer, startTime, completionTime } = useGameControlsStore()
  const { clearHistory } = useCubeStore()

  const handleSaveClick = () => {
    resetTimer()
    clearHistory()
  }

  const handleDismissClick = () => {
    resetTimer()
    clearHistory()
  }

  return (
    <div className={styles.completed}>
      <p className={styles.completionTime}>Solved in {reportTime(completionTime - startTime)}</p>
      <div className={styles.completedButtons}>
        <button onClick={handleSaveClick} 
          type="button" 
          className={styles.save}
        >
            Save
        </button>
        <button onClick={handleDismissClick} 
          type="button" 
          className={styles.discard}
        >
            Discard
        </button>
      </div>

    </div>
  )
}

export default Completed