import styles from './StartStop.module.css'
import useScramble from '@/utils/useScramble';
import clsx from 'clsx'
import { useGameControlsStore } from '@/store/gameControlsSlice';
import { useCubeStore } from '@/store/cubeSlice';

const StartStop = () => {
  const { startTime, startTimer, stopTimer } = useGameControlsStore()
  const { initializeGame } = useCubeStore();
  const isInPlay = startTime !== null

  const handleClick = isInPlay  
    ? () => stopTimer(false) 
    : async () => {
      await scramble();
      startTimer();
      initializeGame();
    }

  const scramble = useScramble()
  return (
    <button 
      type='button'
      onClick={handleClick}
      className={clsx({
        [styles.stopButton]: isInPlay,
        [styles.startButton]: !isInPlay,
      })
    }></button>
  )
}

export default StartStop