import { useHistory, useIsRotating } from "@/app/store/selectors";
import { ANIMATION_TIME } from "@/app/utils/constants";
import { useUndoLastMove } from "@/app/utils/useExecuteMove";
import styles from "./UndoButton.module.css";

const UndoButton = () => {
  const undoLastMove  = useUndoLastMove();
  const isRotating = useIsRotating();
  const history = useHistory();

  return (
    <button
      className={styles.undoButton}
      onClick={() => {
        if(!isRotating.current) {
          undoLastMove(ANIMATION_TIME, isRotating)}}
        }
      disabled={history.length === 0}
    >
      Undo Move
    </button>
  );
}

export default UndoButton;