/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        TrailGreen: "var(--TrailGreen)",
        LogoColor: "var(--title-color)",
      },
    },
  },
  plugins: [],
});
