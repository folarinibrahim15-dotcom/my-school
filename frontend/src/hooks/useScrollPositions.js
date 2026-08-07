// ==========================================================
// src/hooks/useScrollPosition.js
// ----------------------------------------------------------
// Premium Scroll Position Hook
//
// Features
// • Show/Hide Button
// • Scroll Progress
// • Mobile Responsive
// • Smooth Performance
// ==========================================================

import { useState, useEffect } from "react";

export default function useScrollPosition(showAfter = 350) {
  const [showButton, setShowButton] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop;

      const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const progress =
        documentHeight > 0
          ? (scrollTop / documentHeight) * 100
          : 0;

      setScrollProgress(progress);

      setShowButton(scrollTop > showAfter);

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    updateScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", updateScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, [showAfter]);

  // ============================
  // Scroll To Top
  // ============================

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return {
    showButton,
    scrollProgress,
    scrollToTop,
  };
}