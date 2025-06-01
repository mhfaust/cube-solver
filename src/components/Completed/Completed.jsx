import { useGameControlsStore } from "@/store/gameControlsSlice"
import styles from "./Completed.module.css"
import { reportTime } from "@/utils/displayTime"
import { useCubeStore } from "@/store/cubeSlice"
import { useRecordsStore } from '@/store/recordsSlice'
import { countMutations } from "@/utils/history"
import { useNavigation } from '@/utils/useNavigation'
import { useThemeStore } from "@/store/themeSlice"
import { nanoid } from "nanoid"

const Completed = () => {
  const { resetTimer, startTime, completionTime } = useGameControlsStore()
  const { clearMoves, moves, initialState } = useCubeStore()
  const { pushRecord } = useRecordsStore()
  const { themeName } = useThemeStore();
  const { goto } = useNavigation();

  const handleSaveClick = () => {

    const duration = moves[moves.length-1].moveTime - startTime;
    const id =  nanoid()

    pushRecord({ 
      id, 
      initialState, 
      startTime, 
      moves, 
      duration, 
      themeName 
    });
    
    resetTimer();
    clearMoves();
    goto.gamePlay(id);
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