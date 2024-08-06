// tailwind.config.js
module.exports = {
  // Configuración existente de Tailwind CSS
  content: [
    './src/**/*.{js,ts,jsx,tsx,html}', // Ajusta esta ruta según la estructura de tu proyecto
  ],
  theme: {
    extend: {
      // Tus configuraciones personalizadas
    },
  },
  plugins: [
    require('tailwindcss-animated'),
  ],
}
