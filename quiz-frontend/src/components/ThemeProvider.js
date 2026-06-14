"use client";
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  // Read saved client theme preferences immediately on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("qwizzy_theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.setAttribute("data-bs-theme", "dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextMode = !darkMode;
    setDarkMode(nextMode);
    localStorage.setItem("qwizzy_theme", nextMode ? "dark" : "light");
    document.documentElement.setAttribute(
      "data-bs-theme",
      nextMode ? "dark" : "light",
    );
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <div
        className={
          darkMode
            ? "bg-dark text-white min-vh-100"
            : "bg-light text-dark min-vh-100"
        }
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
