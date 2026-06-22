/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}', './lib/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Consumer brand (green)
        brand: {
          DEFAULT: '#0F5C46',
          deep: '#0C4A38',
          deeper: '#0A3528',
          bright: '#15795C',
          tint: '#EAF5EF',
          tint2: '#EFF5F1',
          footer: '#0C2C22',
        },
        // SacredChain (indigo)
        chain: {
          DEFAULT: '#2547D8',
          bright: '#3A63F0',
          deep: '#1E3DBE',
          navy: '#0F1B33',
          tint: '#EEF2FE',
          footer: '#0C152C',
        },
        ink: '#10271F',
        body: '#3D4A43',
        muted: '#8A938C',
        star: '#F5A524',
        live: '#E8572A',
        online: '#34C759',
        surface: '#FBFCFA',
        line: '#EAEDE6',
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', '-apple-system', 'system-ui', 'sans-serif'],
        amiri: ['var(--font-amiri)', 'serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(20,40,30,.03)',
        'card-hover': '0 20px 46px -24px rgba(15,92,70,.34)',
        btn: '0 10px 22px -12px rgba(15,92,70,.8)',
        float: '0 18px 44px -26px rgba(15,92,70,.4)',
      },
      keyframes: {
        fadeUp: { from: { opacity: 0, transform: 'translateY(16px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        pulse2: { '0%,100%': { opacity: 0.5 }, '50%': { opacity: 1 } },
      },
      animation: {
        fadeUp: 'fadeUp .6s cubic-bezier(.2,.7,.3,1) both',
        float: 'float 6s ease-in-out infinite',
        floatSlow: 'float 6.6s ease-in-out infinite .5s',
        pulse2: 'pulse2 1.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
