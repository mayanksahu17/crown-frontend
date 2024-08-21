/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "576px",
      // => @media (min-width: 576px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "992px",
      // => @media (min-width: 992px) { ... }

      xl: "1200px",
      // => @media (min-width: 1200px) { ... }

      xxl: "1400px",
      // => @media (min-width: 1400px) { ... }
    },
    extend: {
      fontFamily: {
        // Add your custom fonts
        dmSans: ["Rubik"],
        clashDisplay: ["Rubik"],
        raleway: ["Rubik"],
        spaceGrotesk: ["Rubik"],
        body: ["Rubik"],
      },

      colors: {
        colorCodGray: "#191919",
        colorOrangyRed: "#00B3FF",
        colorLinenRuffle: "#EFEAE3",
        colorViolet: "#321CA4",
        colorGreen: "#39FF14",
        bgblue: "#000000",
        textred: "#FA895F",
        textwhite: "#FFFFFF",
        themeColor: "#D5AA6D",
        primary: "#315DFF",
        secondary: "#093AED",
      },
      backgroundImage: {
        "custom-eclipse":
          "linear-gradient(134.15deg, #FEFFFE -1.52%, #F4FBFF 100%)",
      },
    },
  },
  plugins: [],
};
