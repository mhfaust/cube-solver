import styles from '@/app/page.module.css';
import { usePlayMode } from "../store/selectors";
import { useStartTime } from "../store/selectors";
import useScramble from '@/app/utils/useScramble';

const Scramble = () => {
  const startTime = useStartTime()
  const mode = usePlayMode()
  const scramble = useScramble()

  if(mode === 'in-play') {
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