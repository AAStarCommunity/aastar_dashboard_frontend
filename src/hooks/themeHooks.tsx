import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { IStore, ObjType, setStateType, IPropChild } from "@/utils/types";
import { useAppContext, connectFactory } from "../utils/contextFactory";

const KEY = "theme";
const DEFAULT_VALUE = {};
/**
 * Saves the old theme for future use
 * @param {string} theme - Name of curent theme
 * @return {string} previousTheme
 */
function usePrevious(theme: string | boolean): string {
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

export const useThemeContext = () => useAppContext(KEY);

export const connect = connectFactory(KEY, DEFAULT_VALUE);

const ThemeInfo = ({ children }: IPropChild) => {
  const { store, setStore } = useThemeContext();
  const [theme, setTheme] = useStorageTheme("theme");

  // update root element class on theme change
  const oldTheme = usePrevious(theme as string);
  useEffect(() => {
    document.documentElement.classList.remove(`theme-${oldTheme}`);
    document.documentElement.classList.add(`theme-${theme}`);
  }, [theme, oldTheme]);

  return children

};
