import { useGameControlsStore } from "@/store/gameControlsSlice"
import styles from "./Completed.module.css"
import { reportTime } from "@/utils/displayTime"
import { useCubeStore } from "@/store/cubeSlice"
import { countMutations } from "@/utils/history"

const Completed = () => {
  const { resetTimer, startTime, completionTime } = useGameControlsStore()
  const { clearMoves, moves } = useCubeStore()

  const handleSaveClick = () => {
    resetTimer()
    clearMoves()
  }

  const handleDismissClick = () => {
    resetTimer()
    clearMoves()
  }

  const mutations = countMutations(moves)

  return (
    <div className={styles.completed}>
      <p className={styles.completionTime}>{mutations} moves, {reportTime(completionTime - startTime)}</p>
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