import { defineConfig, presetUno } from "unocss";

export default defineConfig({
  content: {
    filesystem: ["**/*.{jsx,tsx}"],
  },
  presets: [presetUno()],
  theme: {
    colors: {
      dark: "#02010D",
      primary: "#8B4FF6",
      secondary: "#18F198",
      highlight: "#BDBDBD",
      contrast: "#828282",
      container: "#201F2B",
    },
  },
});
