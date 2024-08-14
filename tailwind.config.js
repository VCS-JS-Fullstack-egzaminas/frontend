/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ecstasy: {
          DEFAULT: "#F48313",
          50: "#FCDFC2",
          100: "#FBD5AF",
          200: "#F9C088",
          300: "#F8AC61",
          400: "#F6973A",
          500: "#F48313",
          600: "#C66709",
          700: "#904B07",
          800: "#5A2F04",
          900: "#251302",
          950: "#0A0500",
        },
        "river-bed": {
          DEFAULT: "#495867",
          50: "#D7DDE2",
          100: "#CBD2DA",
          200: "#B3BEC9",
          300: "#9BAAB8",
          400: "#8395A7",
          500: "#6B8196",
          600: "#5A6C7F",
          700: "#495867",
          800: "#323C46",
          900: "#1A2025",
          950: "#0F1215",
        },
      },
    },
  },
  plugins: [],
};
