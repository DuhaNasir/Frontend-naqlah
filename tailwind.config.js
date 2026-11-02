export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--blue)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        paper: "var(--paper)",
        confirmed: "var(--teal)",
        interest: "var(--purple)",
        missing: "var(--amber)",
        border: "var(--border)",
      },
      fontFamily: {
        sans: ["IBM Plex Sans Arabic", "Inter", "sans-serif"],
        latin: ["Inter", "sans-serif"],
      },
      borderRadius: { card: "12px", control: "8px" },
      boxShadow: { card: "var(--shadow)" },
    },
  },
  plugins: [],
};
