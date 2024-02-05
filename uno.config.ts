import { defineConfig, presetUno } from "unocss";

export default defineConfig({
  content: {
    filesystem: ["**/*.{jsx,tsx}"],
  },
  presets: [presetUno()],
  theme: {
    colors: {
      dark: "#1d2216",
      primary: "#01B834",
      secondary: "#0BF705",
      highlight: "#BDBDBD",
      contrast: "#828282",
      card: {
        dark: "#01B834",
      },
      container: {
        dark: "#000401",
      },
    },
  },
  shortcuts: {
    "bg-primary": "bg-gradient-to-r from-primary/50 to-secondary/50",
  },
});
