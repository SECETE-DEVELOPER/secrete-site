/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        cosmicStart: '#020214',
        cosmicEnd: '#090f24'
      }
    }
  },
  plugins: []
};
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        cosmicStart: '#020214',
        cosmicEnd: '#090f24'
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(34,211,238,0.12)',
        'glow-pink': '0 0 18px rgba(236,72,153,0.10)'
      }
    }
  },
  plugins: []
};