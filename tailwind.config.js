module.exports = {
  daisyui: {
    themes: [
      {
        mytheme: {

        "primary": "#1EB854",
                
        "secondary": "#1FD65F",
                
        "accent": "#D99330",
                
        "neutral": "#110E0E",
                
        "base-100": "#171212",
                
        "info": "#3ABFF8",
                
        "success": "#36D399",
                
        "warning": "#FBBD23",
                
        "error": "#F87272",
        },
      },
      
      "light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter",]
    },
  content: ['./src/**/*.{svelte,js,ts}'],
  plugins: [require("@tailwindcss/typography"), require('daisyui')],
};
