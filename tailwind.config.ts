import type { Config } from "tailwindcss";
// import windmill from "@windmill/react-ui/config";
// import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class", "theme-dark"],
  content: [
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
    "./src/pages/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      // fontFamily: {
      //   sans: ["Inter", ...defaultTheme.fontFamily.sans],
      // },
      // boxShadow: {
      //   bottom:
      //     "0 5px 6px -7px rgba(0, 0, 0, 0.6), 0 2px 4px -5px rgba(0, 0, 0, 0.06)",
      // },
    },
  },
  variants: {},
  plugins: [],
};
export default config;
