/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}', './lib/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // ---- New Preply-grade system ----
        ink: '#0F1211', // near-black headlines & primary text
        paper: '#FFFFFF',
        parchment: '#F6F1E7', // warm manuscript section bg
        emerald: {
          DEFAULT: '#0E6B4F', // primary brand (refined)
          600: '#0C5B43',
          700: '#0A4A37',
          800: '#083A2B',
          tint: '#EAF3EE', // soft card fill / hover wash
        },
        gold: {
          DEFAULT: '#C99A2E', // accent: badges, stars, underlines
          ink: '#9A7412', // darkened gold for AA text on light
          soft: '#F3E9CE',
        },
        midnight: {
          DEFAULT: '#152449', // SacredChain B2B block
          600: '#1B2E5A',
          tint: '#E9EDF6',
        },
        line: '#E6E3DA', // warm border gray
        muted: '#5B615E', // secondary text

        // ---- Preserved legacy aliases (other pages depend on these) ----
        brand: {
          DEFAULT: '#0E6B4F',
          deep: '#0C5B43',
          deeper: '#0A4A37',
          bright: '#15795C',
          tint: '#EAF3EE',
          tint2: '#EFF5F1',
          footer: '#0C2C22',
        },
        chain: {
          DEFAULT: '#2547D8',
          bright: '#3A63F0',
          deep: '#1E3DBE',
          navy: '#152449',
          tint: '#EEF2FE',
          footer: '#0C152C',
        },
        body: '#3D4A43',
        star: '#C99A2E',
        live: '#E8572A',
        online: '#34C759',
        surface: '#FBFCFA',
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', '-apple-system', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-jakarta)', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-arabic)', 'var(--font-amiri)', 'serif'],
        amiri: ['var(--font-amiri)', 'serif'],
      },
      borderRadius: {
        card: '18px',
        input: '12px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(15,18,17,.04)',
        'card-hover': '0 10px 30px -18px rgba(15,18,17,.28)',
        btn: '0 10px 22px -14px rgba(14,107,79,.7)',
        float: '0 14px 40px -22px rgba(15,18,17,.22)',
      },
      keyframes: {
        fadeUp: { from: { opacity: 0, transform: 'translateY(16px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        pulse2: { '0%,100%': { opacity: 0.5 }, '50%': { opacity: 1 } },
      },
      animation: {
        fadeUp: 'fadeUp .5s cubic-bezier(.2,.7,.3,1) both',
        float: 'float 6s ease-in-out infinite',
        floatSlow: 'float 6.6s ease-in-out infinite .5s',
        pulse2: 'pulse2 1.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
