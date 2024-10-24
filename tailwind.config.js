module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
       'kanit' : ['Kanit', 'sans-serif'],
       'sf' : 'sf'
      },
      colors: {
       'greenl' : 'rgba(52,199,89)',
       'greend' : 'rgba(48,209,88)',
       'grayd1' : 'rgba(28,28,30)',
       'grayd2' : 'rgba(44,44,46)',
       'grayd3' : 'rgba(58,58,60)',
       'grayd4' : 'rgba(72,72,74)',
       'grayd5' : 'rgba(99,99,102)',
       'graydl' : 'rgba(142,142,147)',
       'grayl5' : 'rgba(174,174,178)',
       'grayl4' : 'rgba(199,199,204)',
       'grayl3' : 'rgba(209,209,214)',
       'grayl2' : 'rgba(229,229,234)',
       'grayl1' : 'rgba(242,242,247)' 
      },
      backgroundImage: {
        'test': "url('/src/assets/img/farm.jpeg')",
      }
    },
    screens: {
      'zfold': {'max': '357px'},
      'zfoldx' : {'max' : '750px'},
      'laptop': '717px',
      'laptopm': {'max': '717px'},
      'nav' : {'max': '687px'},
      'hide' : {'max': '539px'},
      'show' : '540px',
      'picm' : '1139px',
      'pic' : {'max': '1139px'}
    },
  },
  plugins: [],
  darkMode: 'media'
}