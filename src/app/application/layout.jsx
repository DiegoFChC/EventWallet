"use client";
import { Sidebar } from "@/components/sidebar/Sidebar";
import "./appLayout.css";
import React, { useState, useEffect } from "react";

export default function ApplicationLayout({ children }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      const width = document.body.clientWidth;
      console.log(`updateWidth con ${width}`);
      setWidth(width);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
  });

  return (
    <main className="ApplicationLayout">
      {width >= 768 ? <Sidebar /> : null}
      {children}
    </main>
  );
}
