module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/gradients.ts',
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      // colors: {
      //   'dark-accent-1': '#111111',
      //   'dark-accent-2': '#333333',
      //   'dark-accent-3': '#444444',
      //   'dark-accent-5': '#888888'
      // }
    }
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography'), require("tailwindcss-animate")]
};
