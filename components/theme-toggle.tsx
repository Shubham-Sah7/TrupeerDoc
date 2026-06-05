"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <div className="h-9 w-[148px] rounded-full bg-[#F4F4F5] dark:bg-[#26262B] animate-pulse" />
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <div
      role="group"
      aria-label="Theme"
      className="relative flex items-center h-9 p-0.5 rounded-full bg-[#F0F0F0] dark:bg-[#26262B] border border-[#E4E4E7] dark:border-[#3A3A40]"
    >
      {/* Sliding pill */}
      <span
        aria-hidden
        className={[
          "absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-full",
          "bg-white dark:bg-[#17171A]",
          "shadow-[0_1px_4px_rgba(0,0,0,0.12)] dark:shadow-[0_1px_4px_rgba(0,0,0,0.4)]",
          isDark
            ? "left-[calc(50%+2px)] shadow-[0_0_0_1px_rgba(216,91,214,0.20),0_1px_4px_rgba(0,0,0,0.4)]"
            : "left-0.5",
          "transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
        ].join(" ")}
      />

      {/* Light option */}
      <button
        onClick={() => setTheme("light")}
        className={[
          "relative z-10 flex items-center gap-1.5 h-full px-3.5 rounded-full text-[12px] font-medium",
          "transition-colors duration-[250ms]",
          !isDark
            ? "text-[#18181B]"
            : "text-[#71717A] hover:text-[#52525B] dark:text-[#71717A] dark:hover:text-[#A1A1AA]",
        ].join(" ")}
        aria-pressed={!isDark}
      >
        <Sun className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={2} />
        <span>Light</span>
      </button>

      {/* Dark option */}
      <button
        onClick={() => setTheme("dark")}
        className={[
          "relative z-10 flex items-center gap-1.5 h-full px-3.5 rounded-full text-[12px] font-medium",
          "transition-colors duration-[250ms]",
          isDark
            ? "text-[#D85BD6]"
            : "text-[#71717A] hover:text-[#52525B]",
        ].join(" ")}
        aria-pressed={isDark}
      >
        <Moon className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={2} />
        <span>Dark</span>
      </button>
    </div>
  )
}
