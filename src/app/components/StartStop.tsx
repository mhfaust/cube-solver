import useAppStore, { useActions, useStartTime } from '@/app/store/useAppStore'
import styles from '@/app/page.module.css'
import useScramble from '@/app/utils/useScramble';
import clsx from 'clsx'

const StartStop = () => {
  const startTime = useStartTime()
  const { startTimer, stopTimer } = useActions()
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