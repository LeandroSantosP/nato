import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      },
      backgroundColor: {
        "my-dracula-light": "#2C2740",
        "my-dracula-dark": "#0E0D11",
        "my-grey-light": "#1E1E1E",
        "my-green-one": "#71D385",
        "my-green-two": "#50BC69"
      },
      textColor: {
        "my-green-one": "#71D385",
        "my-green-two": "#50BC69"
      }
    }
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })]
};
export default config;
