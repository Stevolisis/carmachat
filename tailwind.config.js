/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    screens:{
      lg:'950px',
      md:'768px',
      sm:"640px"
    },
    extend: {
      colors:{
        bgPrimary:'#ffffff',
        bgSecondary:'#8030ec',
        bgBlue:'#a5e9ff',
        bgOrange:'#fee5a5',
        bgRed:'#faa6a4',
        txtPrimary:'#444444',
        txtRed:'#d39d9f',
        txtinput:'#c7c7c7',
        txtLinks:'#ab91e5'
      },
    },
  },
  plugins: [],
}
