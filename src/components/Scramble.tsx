import styles from '@/app/page.module.css';
import { usePlayMode } from "@/store/selectors";
import useScramble from '@/utils/useScramble';

const Scramble = () => {
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