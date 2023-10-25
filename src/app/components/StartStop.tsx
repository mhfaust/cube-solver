import useAppStore, { actionsSelector, startTimeSelector } from '@/app/store/useAppStore'
import styles from '@/app/page.module.css'
import useScramble from '@/app/utils/useScramble';
import clsx from 'clsx'

const StartStop = () => {
  const startTime = useAppStore(startTimeSelector)
  const { startTimer, stopTimer } = useAppStore(actionsSelector)
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