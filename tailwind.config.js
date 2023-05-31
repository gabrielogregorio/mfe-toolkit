module.exports = {
  content: ['./index.html', './src/**/*.{jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        'default': '0 4px 8px 2px rgba(0, 0, 0, 0.25)',
      },
      fontFamily: {
        sans: ['Helvetica', 'Roboto', 'Arial', 'sans-serif'],
        cursive: ['RubikVinyl', 'sans-serif'],
        serif: ['Mukta'],
        mono: ['"Fira Code"', 'ui-monospace'],
        display: ['Oswald'],
      },

      animation: {
        fadeIn: 'fadeIn .3s ease-in-out',
        animateWidthResize: 'animateWidthResize 4s linear infinite alternate both'
      },
      keyframes: () => ({
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },

        animateWidthResize: {
          '0%': { width: '10%' },
          '100%': { width: '100%' },
        },
      }),
    },
  },
  plugins: [],
};
