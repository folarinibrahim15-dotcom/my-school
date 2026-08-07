// ============================================================
// src/components/hero/useHeroSlider.js
// ------------------------------------------------------------
// Custom Hero Slider Hook
//
// Features:
// • Auto play (10 seconds)
// • Pause on hover
// • Resume autoplay
// • Previous / Next
// • Infinite Loop
// • Mobile Swipe Support
// • Keyboard Navigation
// ============================================================

import { useState, useEffect, useRef, useCallback } from "react";

const AUTOPLAY_DELAY = 10000;

export default function useHeroSlider(totalSlides) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const intervalRef = useRef(null);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // ===========================
  // Next Slide
  // ===========================
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  // ===========================
  // Previous Slide
  // ===========================
  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) =>
      prev === 0 ? totalSlides - 1 : prev - 1
    );
  }, [totalSlides]);

  // ===========================
  // Go To Slide
  // ===========================
  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  // ===========================
  // Pause
  // ===========================
  const pauseSlider = () => {
    setIsPaused(true);
  };

  // ===========================
  // Resume
  // ===========================
  const resumeSlider = () => {
    setIsPaused(false);
  };

  // ===========================
  // Auto Play
  // ===========================
  useEffect(() => {
    if (isPaused) return;

    intervalRef.current = setInterval(() => {
      nextSlide();
    }, AUTOPLAY_DELAY);

    return () => clearInterval(intervalRef.current);
  }, [nextSlide, isPaused]);

  // ===========================
  // Keyboard Navigation
  // ===========================
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        nextSlide();
      }

      if (e.key === "ArrowLeft") {
        prevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () =>
      window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // ===========================
  // Mobile Swipe
  // ===========================
  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;

    const distance = touchStartX.current - touchEndX.current;

    if (distance > 60) {
      nextSlide();
    }

    if (distance < -60) {
      prevSlide();
    }
  };

  return {
    currentSlide,

    nextSlide,
    prevSlide,
    goToSlide,

    pauseSlider,
    resumeSlider,

    handleTouchStart,
    handleTouchEnd,
  };
}

// const {
//   currentSlide,
//   nextSlide,
//   prevSlide,
//   goToSlide,
//   pauseSlider,
//   resumeSlider,
//   handleTouchStart,
//   handleTouchEnd,
// } = useHeroSlider(heroSlides.length);