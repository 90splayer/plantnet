import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f3f7f0',
          100: '#e4eddd',
          200: '#c9dbbb',
          300: '#a3c290',
          400: '#7aa566',
          500: '#598a47',
          600: '#446e36',
          700: '#36572c',
          800: '#2d4626',
          900: '#263a21',
        },
        moss: {
          50: '#f0f4ee',
          100: '#dce6d8',
          200: '#bcccb4',
          300: '#92aa88',
          400: '#6d8c63',
          500: '#517048',
          600: '#3e5838',
          700: '#32472d',
          800: '#293927',
          900: '#222f21',
        },
        cream: {
          50: '#fdfdf8',
          100: '#faf9ef',
          200: '#f4f2db',
          300: '#ede8be',
          400: '#e2da97',
        }
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Lato', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
    },
  },
  plugins: [],
}
export default config
