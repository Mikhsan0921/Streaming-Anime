import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {}
    }
  },
  plugins: [nextui({
    prefix: 'nextui',
    "themes": {
      "light": {
        "colors": {
          "default": {
            "50": "#fafafa",
            "100": "#f2f2f3",
            "200": "#ebebec",
            "300": "#e3e3e6",
            "400": "#dcdcdf",
            "500": "#d4d4d8",
            "600": "#afafb2",
            "700": "#8a8a8c",
            "800": "#656567",
            "900": "#404041",
            "foreground": "#000",
            "DEFAULT": "#d4d4d8"
          },
          "primary": {
            "50": "#dfedfd",
            "100": "#b3d4fa",
            "200": "#86bbf7",
            "300": "#59a1f4",
            "400": "#2d88f1",
            "500": "#006fee",
            "600": "#005cc4",
            "700": "#00489b",
            "800": "#003571",
            "900": "#002147",
            "foreground": "#fff",
            "DEFAULT": "#006fee"
          },
          "secondary": {
            "50": "#eee4f8",
            "100": "#d7bfef",
            "200": "#bf99e5",
            "300": "#a773db",
            "400": "#904ed2",
            "500": "#7828c8",
            "600": "#6321a5",
            "700": "#4e1a82",
            "800": "#39135f",
            "900": "#240c3c",
            "foreground": "#fff",
            "DEFAULT": "#7828c8"
          },
          "success": {
            "50": "#e2f8ec",
            "100": "#b9efd1",
            "200": "#91e5b5",
            "300": "#68dc9a",
            "400": "#40d27f",
            "500": "#17c964",
            "600": "#13a653",
            "700": "#0f8341",
            "800": "#0b5f30",
            "900": "#073c1e",
            "foreground": "#000",
            "DEFAULT": "#17c964"
          },
          "warning": {
            "50": "#fef4e4",
            "100": "#fce4bd",
            "200": "#fad497",
            "300": "#f9c571",
            "400": "#f7b54a",
            "500": "#f5a524",
            "600": "#ca881e",
            "700": "#9f6b17",
            "800": "#744e11",
            "900": "#4a320b",
            "foreground": "#000",
            "DEFAULT": "#f5a524"
          },
          "danger": {
            "50": "#ffe5e5",
            "100": "#ffc2c2",
            "200": "#ff9e9e",
            "300": "#ff7a7a",
            "400": "#ff5656",
            "500": "#ff3232",
            "600": "#d22929",
            "700": "#a62121",
            "800": "#791818",
            "900": "#4d0f0f",
            "foreground": "#000",
            "DEFAULT": "#ff3232"
          },
          "background": "#ffffff",
          "foreground": {
            "50": "#dfdfdf",
            "100": "#b3b3b3",
            "200": "#868686",
            "300": "#595959",
            "400": "#2d2d2d",
            "500": "#000000",
            "600": "#000000",
            "700": "#000000",
            "800": "#000000",
            "900": "#000000",
            "foreground": "#fff",
            "DEFAULT": "#000000"
          },
          "content1": {
            "DEFAULT": "#ffffff",
            "foreground": "#000"
          },
          "content2": {
            "DEFAULT": "#f4f4f5",
            "foreground": "#000"
          },
          "content3": {
            "DEFAULT": "#e4e4e7",
            "foreground": "#000"
          },
          "content4": {
            "DEFAULT": "#d4d4d8",
            "foreground": "#000"
          },
          "focus": "#006FEE",
          "overlay": "#000000",
          "divider": "#111111"
        }
      },
      "dark": {
        "colors": {
          "default": {
            "50": "#0d0d0e",
            "100": "#19191c",
            "200": "#26262a",
            "300": "#323238",
            "400": "#3f3f46",
            "500": "#65656b",
            "600": "#8c8c90",
            "700": "#b2b2b5",
            "800": "#d9d9da",
            "900": "#ffffff",
            "foreground": "#fff",
            "DEFAULT": "#3f3f46"
          },
          "primary": {
            "50": "#dfedfd",
            "100": "#b3d4fa",
            "200": "#86bbf7",
            "300": "#59a1f4",
            "400": "#2d88f1",
            "500": "#006fee",
            "600": "#005cc4",
            "700": "#00489b",
            "800": "#003571",
            "900": "#002147",
            "foreground": "#fff",
            "DEFAULT": "#006fee"
          },
          "secondary": {
            "50": "#eee4f8",
            "100": "#d7bfef",
            "200": "#bf99e5",
            "300": "#a773db",
            "400": "#904ed2",
            "500": "#7828c8",
            "600": "#6321a5",
            "700": "#4e1a82",
            "800": "#39135f",
            "900": "#240c3c",
            "foreground": "#fff",
            "DEFAULT": "#7828c8"
          },
          "success": {
            "50": "#e2f8ec",
            "100": "#b9efd1",
            "200": "#91e5b5",
            "300": "#68dc9a",
            "400": "#40d27f",
            "500": "#17c964",
            "600": "#13a653",
            "700": "#0f8341",
            "800": "#0b5f30",
            "900": "#073c1e",
            "foreground": "#000",
            "DEFAULT": "#17c964"
          },
          "warning": {
            "50": "#fef4e4",
            "100": "#fce4bd",
            "200": "#fad497",
            "300": "#f9c571",
            "400": "#f7b54a",
            "500": "#f5a524",
            "600": "#ca881e",
            "700": "#9f6b17",
            "800": "#744e11",
            "900": "#4a320b",
            "foreground": "#000",
            "DEFAULT": "#f5a524"
          },
          "danger": {
            "50": "#4d0f0f",
            "100": "#791818",
            "200": "#a62121",
            "300": "#d22929",
            "400": "#ff3232",
            "500": "#ff5656",
            "600": "#ff7a7a",
            "700": "#ff9e9e",
            "800": "#ffc2c2",
            "900": "#ffe5e5",
            "foreground": "#000",
            "DEFAULT": "#ff3232"
          },
          "background": "#000000",
          "foreground": {
            "50": "#ffffff",
            "100": "#ffffff",
            "200": "#ffffff",
            "300": "#ffffff",
            "400": "#ffffff",
            "500": "#ffffff",
            "600": "#d2d2d2",
            "700": "#a6a6a6",
            "800": "#797979",
            "900": "#4d4d4d",
            "foreground": "#000",
            "DEFAULT": "#ffffff"
          },
          "content1": {
            "DEFAULT": "#18181b",
            "foreground": "#fff"
          },
          "content2": {
            "DEFAULT": "#27272a",
            "foreground": "#fff"
          },
          "content3": {
            "DEFAULT": "#3f3f46",
            "foreground": "#fff"
          },
          "content4": {
            "DEFAULT": "#52525b",
            "foreground": "#fff"
          },
          "focus": "#006FEE",
          "overlay": "#ffffff",
          "divider": "#ffffff"
        }
      }
    },
    "layout": {
      "fontSize": {
        "tiny": "0.75rem",
        "small": "0.875rem",
        "medium": "1rem",
        "large": "1.125rem"
      },
      "lineHeight": {
        "tiny": "1rem",
        "small": "1.25rem",
        "medium": "1.5rem",
        "large": "1.75rem"
      },
      "radius": {
        "small": "0.5rem",
        "medium": "0.75rem",
        "large": "0.875rem"
      },
      "borderWidth": {
        "small": "1px",
        "medium": "2px",
        "large": "3px"
      },
      "disabledOpacity": "0.5",
      "dividerWeight": "1",
      "hoverOpacity": "0.9"
    }
  })],
};

export default config;
