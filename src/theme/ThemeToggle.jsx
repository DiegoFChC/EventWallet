"use client";
import "./themetoggle.css";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { MdOutlineChangeCircle } from "react-icons/md";

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="switch">
      <MdOutlineChangeCircle
        onClick={() => {
          theme === "ligth" ? setTheme("dark") : setTheme("ligth");
        }}
      />
    </div>
  );
};

export default ThemeToggle;
