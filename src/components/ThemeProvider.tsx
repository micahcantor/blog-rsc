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
      <div className="min-h-screen w-full bg-slate-100 dark:bg-slate-900 dark:text-slate-100" data-theme={theme}>
        {children}
      </div>
    </ThemeContext>
  );
}
