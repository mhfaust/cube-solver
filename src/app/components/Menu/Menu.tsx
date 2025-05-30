import { ThemeName, themeNames } from "@/app/themes/useThemeAssets";
import styles from "./Menu.module.css";
import {  } from "@/app/store/selectors";
import { MouseEventHandler, useState } from "react";
import clsx from "clsx";
import { useThemeStore } from "@/app/store/themeSlice";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { setThemeName, themeName } = useThemeStore();

  return (
    <div className={styles.container}>
      {isOpen && (
        <div className={styles.menu}>
          {themeNames.map((name) => (
            <label
              htmlFor={name}
              key={name}
            >
              <input
                type="radio"
                onClick={() => {
                  setThemeName(name);
                  setIsOpen(false);
                }}
                onChange={() => {}}
                checked={themeName === name}
                value={name}
                id={name}
                className={styles.radio}
              />
              {name}
            </label>
          ))}
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
