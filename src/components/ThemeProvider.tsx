"use client";

import { createContext, ReactNode, useCallback, useState } from "react";

type ThemeValue = "light" | "dark"

interface Theme {
  theme: ThemeValue,
  toggleTheme: () => void,
}

export const ThemeContext = createContext<Theme>({theme: "light", toggleTheme: () => {}})

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeValue>("light");
  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => prevTheme === "light" ? "dark" : "light");
  }, [setTheme]);

  return (
    <ThemeContext value={{ theme, toggleTheme }}>
      <div className="h-full w-full bg-white dark:bg-gray-950 dark:text-amber-50 pt-2" data-theme={theme}>
        {children}
      </div>
    </ThemeContext>
  );
}
