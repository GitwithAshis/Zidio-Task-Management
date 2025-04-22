module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        neon: "#0ff",
        primary: "#4F46E5", // Example: indigo
        secondary: "#F3F4F6", // light gray bg
        darkBg: "#0f172a",
        glass: "rgba(255, 255, 255, 0.05)",
      },
      boxShadow: {
        neon: "0 0 15px #0ff",
        glass: "0 4px 30px rgba(0, 0, 0, 0.1)",
      },
      backdropBlur: {
        sm: "4px",
      },
      animation: {
        gradient: "gradient 4s ease infinite",
      },
      keyframes: {
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },

  plugins: [],
};