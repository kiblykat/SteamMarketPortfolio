/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
import { transform } from "typescript";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-cw": "spin 0.3s ease-in-out",
        "spin-ccw": "spinReverse 0.3s ease-in-out",
      },
      keyframes: {
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(60deg)" },
        },
        spinReverse: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-60deg)" },
        },
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light", "dark", "retro", "corporate"],
  },
};
