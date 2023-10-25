import useScramble from '@/app/utils/useScramble';
import useAppStore, { startTimeSelector } from '@/app/store/useAppStore';
import styles from '@/app/page.module.css'

const Scramble = () => {
  const startTime = useAppStore(startTimeSelector)
  const isInPlay = startTime !== null
  const scramble = useScramble()

  if(isInPlay) {
    return null
  }
  return (
    <button 
      type='button' 
      className={styles.scrambleButton} 
      onClick={scramble}
    >
      {' '}
    </button>
  )
}

export default Scramble