/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx,html,js}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
});
