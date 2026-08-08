
import React, { useState } from "react";

import heroSlides from "../../data/heroSlides";

import HeroSlide from "./HeroSlide";
import HeroControls from "./HeroControls";
import HeroDots from "./HeroDots";
import useHeroSlider from "./useHeroSLider";

export default function HeroSlider() {
  const [showControls, setShowControls] = useState(false);

  const {
    currentSlide,
    nextSlide,
    prevSlide,
    goToSlide,
    pauseSlider,
    resumeSlider,
    handleTouchStart,
    handleTouchEnd,
  } = useHeroSlider(heroSlides.length);

  return (
    <>
      <style>
        {`
        /* ===================================================
           PREMIUM HERO WRAPPER
        =================================================== */

        .hero-wrapper{

            position:relative;

            width:100%;

            overflow:hidden;

            isolation:isolate;

            margin:0;

            padding:0;

            background:transparent;

            /*
             Responsive Hero Height
            */

            height:clamp(230px,52vw,720px);
        }

        /* Extra Large Screens */

        @media (min-width:1600px){

            .hero-wrapper{

                height:760px;

            }

        }

        /* Large Desktop */

        @media (max-width:1400px){

            .hero-wrapper{

                height:clamp(520px,45vw,680px);

            }

        }

        /* Laptop */

        @media (max-width:1200px){

            .hero-wrapper{

                height:clamp(420px,48vw,560px);

            }

        }

        /* Tablet */

        @media (max-width:992px){

            .hero-wrapper{

                height:clamp(340px,50vw,460px);

            }

        }

        /* iPad */

        @media (max-width:768px){

            .hero-wrapper{

                height:clamp(260px,56vw,360px);

            }

        }

        /* Phones */

        @media (max-width:576px){

            .hero-wrapper{

                height:clamp(220px,58vw,310px);

            }

        }

        /* Small Phones */

        @media (max-width:400px){

            .hero-wrapper{

                height:clamp(200px,60vw,260px);

            }

        }

        `}
      </style>

      <section
        className="hero-wrapper"
        aria-label="Hero Slider"
        onMouseEnter={() => {
          pauseSlider();
          setShowControls(true);
        }}
        onMouseLeave={() => {
          resumeSlider();
          setShowControls(false);
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slides */}

        {heroSlides.map((slide, index) => (
          <HeroSlide
            key={slide.id}
            slide={slide}
            active={currentSlide === index}
          />
        ))}

        {/* Controls */}

        <HeroControls
          visible={showControls}
          onPrevious={prevSlide}
          onNext={nextSlide}
        />

        {/* Pagination */}

        <HeroDots
          totalSlides={heroSlides.length}
          currentSlide={currentSlide}
          onSelect={goToSlide}
        />
      </section>
    </>
  );
}