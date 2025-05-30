import { ANIMATION_TIME } from "@/app/utils/constants";
import styles from "./UndoButton.module.css";
import { useCubeStore } from "@/app/store/cubeSlice";
import { MoveCode } from "@/app/utils/moveCodes";

const wholeCubeSpins = new Set<MoveCode>(['X', 'Xi', 'Y', 'Yi', 'Z', 'Zi'])

const UndoButton = () => {
  const { undoLastMove, history, isRotating }  = useCubeStore();
  const moveCount = history.filter(m => !wholeCubeSpins.has(m)).length

  return (
    <button
      className={styles.undoButton}
      onClick={() => {
        if(!isRotating.current) {
          undoLastMove(ANIMATION_TIME)
        }
      }}
      disabled={history.length === 0}
    >
      {moveCount}
    </button>
  );
}

export default UndoButton;