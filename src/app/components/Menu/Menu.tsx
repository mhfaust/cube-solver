import { ThemeName, themeNames } from "@/app/themes/useTheme";
import styles from "./Menu.module.css";
import { useThemeName } from "@/app/store/selectors";
import { useActions } from "@/app/store/useAppStore";
import { useState } from "react";
import clsx from "clsx";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedThemeName = useThemeName();
  const { setThemeName } = useActions();

  return (
    <div className={styles.container}>
      {isOpen && (
        <div className={styles.menu}>
          {themeNames.map((name) => (
            <label
              // for={name}
              key={name}
            >
              <input
                // className={clsx({[styles.selected]: selectedThemeName === name})}
                type="radio"
                // onChange={(isChecked) => setThemeName(name)}
                onChange={(e) => setThemeName(e.target.value as ThemeName)}
                checked={selectedThemeName === name}
                value={name}
                id={name}
                className={styles.radio}
              />
              {name}
            </label>
          ))}
          <button
            onClick={() => setIsOpen(false)}
            className={styles.doneButton}
          >
            Done
          </button>
        </div>
      )}

      {!isOpen && (
        <div onClick={() => setIsOpen(true)} className={styles.icon}>
          Theme
        </div>
      )}
    </div>
  );
};

export default Menu;
