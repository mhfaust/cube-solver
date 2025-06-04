import styles from './MainNav.module.css';
import SpeedometerIcon from './SpeedometerIcon';
import ThemesIcon from './ThemesIcon';
import CubeIcon from './CubeIcon';
import Link from 'next/link';
import { routes, useIsCurrentRoot } from '@/utils/useNavigation';
import { clsx } from 'clsx';


const MainNav = () => {

  const isSelected = useIsCurrentRoot();

  return (
    <div className={styles.mainNav}>
      <Link 
        className={clsx(styles.button, )} 
        href={routes.myCube}
      >
        <CubeIcon className={clsx(styles.cubeIcon, { 
            [styles.selectedSvg]: isSelected(routes.myCube)
          })} 
        />
      </Link>
      <Link 
        className={clsx(styles.button)} 
        href={routes.gamePlays}
      >
        <SpeedometerIcon className={clsx(styles.speedometerIcon, { 
            [styles.selectedSvg]: isSelected(routes.gamePlays)
          })} 
        />
      </Link>
      <Link 
        className={clsx(styles.button)} 
        href={routes.theme}
      >
        <ThemesIcon className={clsx(styles.themesIcon, { 
            [styles.selectedSvg]: isSelected(routes.theme)
          })} 
        />
      </Link>
    </div>
  );
};

export default MainNav;