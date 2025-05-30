import { ANIMATION_TIME } from "@/utils/constants";
import styles from "./UndoButton.module.css";
import { useCubeStore } from "@/store/cubeSlice";
import { MoveCode } from "@/utils/moveCodes";
import { countMutations } from "@/utils/history";


const UndoButton = () => {
  const { undoLastMove, moves, isRotating }  = useCubeStore();
  const moveCount = countMutations(moves)

  return (
    <>
    <div className={styles.backgroundBox}/>
    <button
      className={styles.undoButton}
      onClick={() => {
        if(!isRotating.current) {
          undoLastMove(ANIMATION_TIME)
        }
      }}
      disabled={moves.length === 0}
    >
      {moveCount}
    </button></>
  );
}

export default UndoButton;