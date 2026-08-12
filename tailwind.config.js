/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Pretendard Variable',
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'Roboto',
          'Helvetica Neue',
          'Segoe UI',
          'Apple SD Gothic Neo',
          'Malgun Gothic',
          'sans-serif',
        ],
      },
      colors: {
        // 쏙식 시그니처 컬러 — 사용자 앱 로고(#3EE7D3, 민트 터콰이즈) 기준으로 산출한 스케일
        brand: {
          50: '#EEFEFC',
          100: '#D9FCF8',
          200: '#B3FAF1',
          300: '#79F6E7',
          400: '#45E1CE', // 로고 컬러 근접
          500: '#21CAB6',
          600: '#1AA292',
          700: '#158477', // 버튼/활성 상태 기본값 (대비 AA 통과)
          800: '#116B61',
          900: '#0E584F',
        },
        ink: {
          50: '#F7F8FA',
          100: '#EEF0F3',
          200: '#DDE1E7',
          300: '#C3C9D2',
          400: '#9AA2AE',
          500: '#6C7684',
          600: '#4B5563',
          700: '#333B47',
          800: '#20252E',
          900: '#14171C',
        },
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.125rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(20, 23, 28, 0.04), 0 1px 12px rgba(20, 23, 28, 0.05)',
        'card-hover': '0 8px 28px rgba(20, 23, 28, 0.10), 0 2px 6px rgba(20, 23, 28, 0.05)',
        brand: '0 6px 16px rgba(21, 132, 119, 0.24)',
        'brand-hover': '0 10px 24px rgba(21, 132, 119, 0.30)',
      },
    },
  },
  plugins: [],
}