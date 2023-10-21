import useAppStore, { actionsSelector, startTimeSelector } from '@/app/store/useAppStore'
import styles from './GameControles.module.css'
import useScramble from '@/app/utils/useScramble';



export type GameControlsProps = {
  onStart: () => void;
  onStop: () => void;
}

const GameControls = () => {

  const startTime = useAppStore(startTimeSelector)
  const { startTimer, stopTimer } = useAppStore(actionsSelector)
  const isInPlay = startTime !== null

  const scramble = useScramble()

  return (
    <div className={styles.gameControls}>
      {!isInPlay && <button type='button' onClick={startTimer}>Start</button>}
      {isInPlay && <button type='button' onClick={stopTimer}>Stop</button>}
      {!isInPlay && <button type='button' onClick={scramble}>Scramble</button>}
    </div>
  )
}

export default GameControls