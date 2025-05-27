import { useHistory, useIsRotating } from "@/app/store/selectors";
import { ANIMATION_TIME } from "@/app/utils/constants";
import styles from "./UndoButton.module.css";
import { useActions } from "@/app/store/useAppStore";

const UndoButton = () => {
  const {undoLastMove}  = useActions();
  const isRotating = useIsRotating();
  const history = useHistory();

  return (
    <button
      className={styles.undoButton}
      onClick={() => {
        if(!isRotating.current) {
          undoLastMove(ANIMATION_TIME)}}
        }
      disabled={history.length === 0}
    >
      Undo Move
    </button>
  );
}

export default UndoButton;