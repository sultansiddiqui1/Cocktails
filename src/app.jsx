import React from "react";
import { gsap } from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Cocktails from "./components/cocktails.jsx";
import About from "./components/About.jsx";
import Art from "./components/Art.jsx";
gsap.registerPlugin(ScrollTrigger, SplitText);

const app = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      {/* <div className="h-dvh bg-black"></div> */}
      {/* hdvh is the full height */}
      <Cocktails />
      <About />
      <Art />
    </main>
  );
};

export default app;
