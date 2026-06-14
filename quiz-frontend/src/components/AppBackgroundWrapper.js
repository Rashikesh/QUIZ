"use client";
import { useTheme } from "@/components/ThemeProvider";

export default function AppBackgroundWrapper({ children }) {
  const { darkMode } = useTheme();

  return (
    <div
      className={`min-vh-100 transition-colors ${darkMode ? "bg-dark text-white" : "bg-light text-dark"}`}
    >
      {children}

      <style jsx global>{`
        .transition-colors {
          transition:
            background-color 0.3s ease,
            color 0.3s ease;
        }
      `}</style>
    </div>
  );
}
