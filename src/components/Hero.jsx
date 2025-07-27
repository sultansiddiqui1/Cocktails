import React from "react";
import { useGSAP } from "@gsap/react";
import { SplitText, ScrollTrigger } from "gsap/all";
import { gsap } from "gsap";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(SplitText, ScrollTrigger);

const Hero = () => {
  const videoRef = useRef();
  const videoTimelineRef = useRef();
  const isMobile = useMediaQuery({ maxWidth: 767 });

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

    const startValue = isMobile ? "top 50%" : "center 60%";
    // so when top of the video reaches 50 percent down the screen. when the center of the video reaches 60% down
    const endValue = isMobile ? "120% top" : "bottom top";
    //when the top of the video goes 120% past the top of the screen end the animation. when the bottom of the video reaches the top of the screen then the animation ends.

    //video animation timeline:
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "video",
        start: startValue,
        end: endValue,
        scrub: true,
        // links scroll position to animation progress- scroll up/down to
        pin: true,
        // the pin allows us to keep the video stuck on the screen as we scroll
      },
    });
    videoRef.current.onloadedmetadata = () => {
      tl.to(videoRef.current, {
        currentTime: videoRef.current.duration,
      });
    };
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

      <div className="video absolute inset-0">
        <video
          src="/videos/output.mp4"
          muted
          playsInline
          preload="auto"
          ref={videoRef}
        ></video>
      </div>
    </>
  );
  // ffmpeg can be good and that is what is made for the output.mp4
};

export default Hero;
