/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main': {
          'primary': '#EB6D20',
          'third': '#EB8426',
          'white': '#FFFFFF',
          'thickblack': '#040404',
          'middleblack': '#0B0B0B',
          'softblack': '#1B1B1B',
          'light': '#D6D6D6',
          'medium': '#5F5F5F',
          'regular': '#303030',
        },
        'typography': {
          'text': '#3E3E3E',
          'subtext': '#9A9A9A',
          'paragraph': '#292929',
        },
        'system': {
          'success': '#6DB95A',
          'error': '#DD5E5E',
          'warning': '#D89614',
          'url': '#177DDC',
        },
        'base': {
          'border': '#E9E9E9',
          'disabled': '#D9D9D9',
          'background': '#FDFDFD',
          'softbackground': '#FFF9F3',
          'graybackground': '#F5F6F8',
          'bluebackground': '#5959D9',
        }
      },
    },
    display: ["group-hover"],
    fontFamily: {
      'poppins': ['Poppins'],
    },
    fontSize: {
      'body-1': ['12px', '16px'],
      'body-2': ['12px', '16px'],
      'body-3': ['16px', '20px'],
      'body-4': ['16px', '20px'],
      'body-5': ['14px', '18px'],
      'body-6': ['14px', '24px'],
      'heading-1': ['14px', '18px'],
      'heading-2': ['16px', '20px'],
      'heading-3': ['18px', '26px'],
      'heading-4': ['20px', '24px'],
      'heading-5': ['24px', '28px'],
      'heading-6': ['28px', '32px'],
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
}

