/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}", "./node_modules/flowbite/**/*.js"],
  
  theme: {
    extend: {
      fontFamily: {
        'body': [
          'Inter', 
          'ui-sans-serif', 
          'system-ui',
        
        ],
        'sans': [
          'Inter', 
          'ui-sans-serif', 
          'system-ui',
          
        ]
      }

    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}