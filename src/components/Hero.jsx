import React from "react";
import { useGSAP } from "@gsap/react";
import { SplitText, ScrollTrigger } from "gsap/all";
import { gsap } from "gsap";

gsap.registerPlugin(SplitText, ScrollTrigger);

const Hero = () => {
  useGSAP(() => {
    const heroSplit = new SplitText(".title", { type: "chars,words" });
    const paragraphSplit = new SplitText(".subtitle", { type: "lines" });

    heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));
    //animating each of the characters:
    gsap.from(heroSplit.chars, {
      yPercent: 100, // character starts from translateed downward by 100% of its own height
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06, // come after another character
    });

    // animating the lines of paragraphs:
    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
      delay: 1, // start one second after the headline animation finishes.s
    });

    // animating the leaves on scroll:
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          // top of the homepage hits the top of the screen
          end: " bottom top",
          scrub: true,
          //scrub basically meaning  the animation process will be directly related to the scroll.
          markers: true,
        },
      })
      .to(".right-leaf", { y: 200 }, 0)
      .to(".left-leaf", { y: -200 }, 0);
  }, []);

  return (
    <>
      <section id="hero" className="noisy">
        <h1 className="title">MOJITO</h1>
        <img
          src="/images/hero-left-leaf.png"
          alt="left-lead"
          className="left-leaf"
        />
        <img
          src="/images/hero-right-leaf.png"
          alt="right-lead"
          className="right-leaf"
        />

        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Cool Crisp Classic</p>
              <p className="subtitle">
                sip the spirit <br /> of summer{" "}
              </p>
            </div>

            <div className="view-cocktails">
              <p className="subtitle">
                Evert cocktail on our menu is a blend of premium ingredients,
                creative flair and timeless recipes- designed to delight your
                senses.
              </p>
              <a href="#cocktails">View Cocktails</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
