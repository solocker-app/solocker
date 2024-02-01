import { defineConfig, presetUno } from "unocss";

export default defineConfig({
  content: {
    filesystem: ["**/*.{jsx,tsx}"],
  },
  presets: [presetUno()],
  theme: {
    colors: {
      dark: "#1d2216",
      primary: "#8B4FF6",
      secondary: "#18F198",
      highlight: "#BDBDBD",
      contrast: "#828282",
      container: "#121212",
    },
  },
  shortcuts: {
    "bg-primary": "bg-gradient-to-r from-primary/50 to-secondary/50",
  },
});
