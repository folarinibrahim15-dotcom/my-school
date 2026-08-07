// ===========================================================
// src/data/heroSlides.js
// -----------------------------------------------------------
// Hero Slider Data
// Sound Peace International Schools
//
// Contains:
// • Hero Image
// • Heading
// • Subtitle
// • Button Text
// • Button Link
// ===========================================================

import hero from "../assets/images/hero.jpg";
import hero2 from "../assets/images/hero2.jpg";
import hero3 from "../assets/images/hero3.jpg";
import hero4 from "../assets/images/hero4.jpg";
import hero5 from "../assets/images/hero5.jpg";

const heroSlides = [
  {
    id: 1,

    image: hero,

    title: "Raising Future Leaders Through Excellence",

    buttonText: "Apply for Admission",

    buttonLink: "/admissions/ApplyOnline",

    overlay: "rgba(0,0,0,.45)",
  },

  {
    id: 2,

    image: hero2,

    title: "A Safe Environment For Learning",

    subtitle:
      "Our modern classrooms, experienced teachers and secure campus create the perfect atmosphere for learning, creativity and character development.",

    buttonText: "Explore Facilities",

    buttonLink: "/facilities",

    overlay: "rgba(0,0,0,.40)",
  },

  {
    id: 3,

    image: hero3,

    title: "Academic Excellence Meets Character",

    subtitle:
      "We inspire students to excel academically while developing integrity, leadership and lifelong values that shape responsible global citizens.",

    buttonText: "Why Choose Us",

    buttonLink: "/about/Mission",

    overlay: "rgba(0,0,0,.45)",
  },

  {
    id: 4,

    image: hero4,

    title: "World-Class Learning Facilities",

    subtitle:
      "Our laboratories, ICT suites, library, sports complex and creative learning spaces empower every learner to discover and maximize their potential.",

    buttonText: "View Facilities",

    buttonLink: "/facilities",

    overlay: "rgba(0,0,0,.45)",
  },

  {
    id: 5,

    image: hero5,

    title: "Join Our Family Today",

    subtitle:
      "Admissions are now open. Begin your child's journey toward academic excellence, innovation and purposeful leadership at Sound Peace International Schools.",

    buttonText: "Start Application",

    buttonLink: "/admissions/ApplyOnline",

    overlay: "rgba(0,0,0,.45)",
  },
];

export default heroSlides;