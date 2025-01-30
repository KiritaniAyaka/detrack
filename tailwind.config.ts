import forms from "@tailwindcss/forms";
import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx,js,jsx}",
  ],
  plugins: [forms],
} satisfies Config;
