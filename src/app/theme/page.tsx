'use client'

import { themeNames } from '@/themes/useThemeAssets';
import MainNav from '@/components/MainNav'
import NoSsr from '@/components/NoSsr/NoSsr'
import { useThemeStore } from '@/store/themeSlice';
import styles from './page.module.css';

const ThemePage = () => {
  const { setThemeName, themeName } = useThemeStore();

    return (
        <NoSsr>
            <div className={styles.main}>
                <div className={styles.menu}>
                    {themeNames.map((name) => (
                        <label
                            htmlFor={name}
                            key={name}
                            className={styles.label}
                        >
                            <input
                                type="radio"
                                onClick={() => setThemeName(name)}
                                onChange={() => {}}
                                checked={themeName === name}
                                value={name}
                                id={name}
                            />
                            {name}
                        </label>
                    ))}
                </div>

                <MainNav />
            </div>
        </NoSsr>
    )
}

export default ThemePage;