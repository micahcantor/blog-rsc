"use client";

import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";

export default function ThemeSwitcher({}) {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme}>
      Change Theme
    </button>
  )
}
