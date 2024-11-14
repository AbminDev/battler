import colors from "tailwindcss/colors";
import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
  colors: {
    ...colors,
    transparent: "transparent",
    white: "#FFFFFF",
    "light-gray": "#D9D9D9",
    "dark-gray": "#D1D1D1",
    "darker-gray": "9C9C9C",
    dark: "#19191B",
    "dark-outer": "#AFB1B6",
    "gray-back": "#EFEFF0",
    "progress-bar": "#EAEAEB",
    light: "#EFEEF3",
    accent: "#007AFF",
    "progress-bar-active": "#3A00E5",
    "start-gradient": "rgba(35, 33, 71, 0.9)",
    "middle-gradient": "rgba(35, 33, 71, 0.7)",
    header: "#21263F",
  },
  extend: {
    textShadow: {
      sm: "0 1px 2px var(--tw-shadow-color)",
      DEFAULT: "0 2px 4px var(--tw-shadow-color)",
      lg: "0 8px 16px var(--tw-shadow-color)",
    },
    backgroundImage: {
      "border-button-gradient":
        "linear-gradient(rgba(255,245,46,1),rgba(255,246,32,1),rgba(255,211,31,1),rgba(252,223,128,1),rgba(255,211,31,1))",
      "hero-card":
        "linear-gradient(rgba(249,224,190,1)0%,rgba(243,234,212,1)12%,rgba(242,236,217,1)87%,rgba(249,223,188,1)100%)",
      "gradient-buttons": "linear-gradient(#5A60FF, #3F44C2)",
    },
    gradientColorStopPositions: {
      start: "0.06%",
      middle: "49.96%",
      end: "99.94%",
    },
    boxShadow: {
      "inner-sm-white": "inset 0 0 3px 0 rgba(255, 232, 232, 0.5)",
      "inner-sm-black":
        "0 0 1px 0 rgba(255, 249, 249, 0.2), 0 0 4px 0 #000 inset",
    },
    scale: {
      200: "2",
    },
    keyframes: {
      wiggle: {
        '0%, 100%': { transform: 'rotate(-3deg)' },
        '50%': { transform: 'rotate(3deg)' },
      },
      smoothAppear: {
        "0%": { bottom: -70, opacity: 1 },
        "100%": { bottom: 0, opacity: 1 },
      },
      smoothApearing: {
        "0%": { height: 0 },
        "100%": { height: 250 },
      },
      smoothDisapearing: {
        "0%": { height: 250 },
        "100%": { height: 0 },
      },
      transition: {
        "0%": { opacity: 0 },
        "100%": { opacity: 1 },
      },
      smoothMove: {
        "0%": { bottom: 0, opacity: 1 },
        "100%": { bottom: 100, opacity: 1 },
      },
      fadeOutUp: {
        "0%": { transform: "translateY(0)", opacity: 1 },
        "100%": { transform: "translateY(-40px)", opacity: 0 },
      },
      opacityTransition: {
        "0%,100%": { opacity: 0.5 },
        "50%": { opacity: 1 },
      }
    },
    animation: {
      wiggle: 'wiggle 1s ease-in-out infinite',
      fadeOutUp: "fadeOutUp .7s forwards",
      smoothAppear: "smoothAppear 0.5s ease forwards",
      smoothMove: "smoothMove 0.5s ease forwards",
      smoothApearing: "smoothApearing 0.5s ease forwards",
      smoothDisapearing: "smoothDisapearing 0.5s ease forwards",
      transition: "transition 2s ease forwards",
      opacityTransition: "opacityTransition 1.2s linear infinite",
    },
  },
};
export const plugins = [
  require("@designbycode/tailwindcss-text-stroke"),
  function ({ addUtilities }) {
    const newUtilities = {
      ".text-stroke-small": {
        textShadow: "1px 1px 0 #19191B, -1px 1px 0 #19191B, 1px -1px 0 #19191B, -1px -1px 0 #19191B, 1px 0 0 #19191B, -1px 0 0 #19191B, 0 1px 0 #19191B, 0 -1px 0 #19191B",
      },
      ".text-stroke-regular": {
        textShadow: "1px 1px 0 #19191B, -1px 1px 0 #19191B, 1px -1px 0 #19191B, -1px -1px 0 #19191B, 1px 0 0 #19191B, -1px 0 0 #19191B, 0 1px 0 #19191B, 0 -1px 0 #19191B",
      },
      ".blue-glow:before": {
        content: '""',
        position: "absolute",
        left: "-3%",
        top: "-3%",
        width: "105%",
        height: "105%",
        background: "rgba(3, 169, 244, 0.8)",
        zIndex: "-1",
        filter: "blur(3px)",
        boxSizing: "content-box",
        borderRadius: "15px",
      },
      ".yellow-glow:before": {
        content: '""',
        position: "absolute",
        left: "-3%",
        top: "-3%",
        width: "105%",
        height: "105%",
        background: "rgba(244,240,3,0.8)",
        zIndex: "-1",
        filter: "blur(3px)",
        boxSizing: "content-box",
        borderRadius: "15px",
      },
      ".rounded-card.blue-glow:before": {
        borderRadius: "33% 33% 15px 15px",
      },
      ".yellow-glow.blue-glow:before": {
        borderRadius: "33% 33% 15px 15px",
      },
      ".react-draggable-transparent-selection .effect-btn-zIndex": {
        zIndex: "1",
      },
      ".btn-pulse:before": {
        content: '""',
        position: 'absolute',
        left: "-6%",
        top: "-10%",
        width: "111%",
        height: "120%",
        background: "#03a9f4",
        zIndex: "-1",
        filter: "blur(3px)",
        boxSizing: "content-box",
        borderRadius: "6px",
        animation: "opacityTransition 1.2s linear infinite",
    }
    };

    addUtilities(newUtilities, ["responsive", "hover"]);
  },
];
export const mode = "jit";
