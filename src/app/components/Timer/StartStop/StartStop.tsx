import styles from './StartStop.module.css'
import useScramble from '@/app/utils/useScramble';
import clsx from 'clsx'
import { useGameControlsStore } from '@/app/store/gameControlsSlice';

const StartStop = () => {
  const { startTime, startTimer, stopTimer } = useGameControlsStore()
  const isInPlay = startTime !== null

  const handleClick = isInPlay  
    ? () => stopTimer(false) 
    : () => {
      scramble()
      startTimer()
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