/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#42A7C3",
        secondary: "#E2F6FC",
        text: "#333333",
        "text-second": "#8F8F8F",
        btn: "#FA8443",
        "btn-dark": "#B33F00",
      },
      fontFamily: {
        body: ["Poppins"],
        title: ["Luckiest Guy"],
        card: ["Lato"],
      },
      height: {
        card: "58rem",
      },
    },
  },
  plugins: [],
};
