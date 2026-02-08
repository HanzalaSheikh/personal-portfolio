import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--body-background)",
                foreground: "var(--body-color)",
                primary: {
                    DEFAULT: "var(--primary-color)",
                    hover: "var(--primary-hover)",
                },
                secondary: "var(--secondary-accent)",
                muted: "var(--subtitle-color)",
                card: "var(--lighter-color)",
                border: "var(--border-color)",
            },
            fontFamily: {
                sans: ["var(--font-poppins)", "sans-serif"],
                title: ["var(--font-oswald)", "serif"],
            },
            keyframes: {
                "fade-in": {
                    "0%": { opacity: "0", transform: "translateY(10px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
            },
            animation: {
                "fade-in": "fade-in 0.5s ease-out forwards",
            },
        },
    },
    plugins: [],
};
export default config;
