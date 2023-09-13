import Aos from "aos";

export function randomAosEffects() {
  const AOS_EFFECTS = [
    "fade",
    "fade-up",
    "fade-down",
    "fade-left",
    "fade-right",
    "fade-up-right",
    "fade-up-left",
    "fade-down-right",
    "fade-down-left",
    "flip-up",
    "flip-down",
    "flip-left",
    "flip-right",
    "slide-up",
    "slide-down",
    "slide-left",
    "slide-right",
    "zoom-in",
    "zoom-in-up",
    "zoom-in-down",
    "zoom-in-left",
    "zoom-in-right",
    "zoom-out",
    "zoom-out-up",
    "zoom-out-down",
    "zoom-out-left",
    "zoom-out-right",
  ];

  const randomIndex = Math.floor(Math.random() * AOS_EFFECTS.length);
  return AOS_EFFECTS[randomIndex];
}
export function functionAos() {
  return Aos.init({
    duration: 1000,
    easing: "ease-in-out",
    once: true,
    mirror: false,
  });
}
