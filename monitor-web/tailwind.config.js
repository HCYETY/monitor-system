module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{ts,tsx,js,jsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      dark70: 'rgba(0,0,0,.7)'
    }),
    extend: {
    },
  },
  variants: {},
  plugins: [],
};
