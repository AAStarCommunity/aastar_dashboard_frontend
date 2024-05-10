import { Cxt } from "@/utils/contextFactory";
import { IStore, ObjType, setStateType } from "@/utils/types";
import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useMemo,
  Dispatch,
  SetStateAction,
} from "react";

/**
 * Saves the old theme for future use
 * @param {string} theme - Name of curent theme
 * @return {string} previousTheme
 */
function usePrevious(theme: string | boolean) {
  const ref: { [key: string]: any } = useRef({});
  useEffect(() => {
    ref.current = theme;
  });
  return ref.current;
}

/**
 * Gets user preferences from local storage
 * @param {string} key - localStorage key
 * @return {array} getter and setter for user preferred theme
 */
function useStorageTheme(key: string): Array<setStateType | string | boolean> {
  const userPreference =
    !!window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [theme, setTheme] = useState(
    // use stored theme; fallback to user preference
    localStorage.getItem(key) || userPreference
  );

  // update stored theme
  useEffect(() => {
    return localStorage.setItem(key, theme.toString());
  }, [theme, key]);

  return [theme, setTheme];
}

// create context
export const ThemeContext: React.Context<ObjType> = React.createContext({});

// create context provider
export const ThemeProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [theme, setTheme] = useStorageTheme("theme");

  // update root element class on theme change
  const oldTheme = usePrevious(theme as string);
  useLayoutEffect(() => {
    document.documentElement.classList.remove(`theme-${oldTheme}`);
    document.documentElement.classList.add(`theme-${theme}`);
  }, [theme, oldTheme]);

  function toggleTheme() {
    if (theme === "light") (setTheme as setStateType)("dark");
    else (setTheme as setStateType)("light");
  }

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
