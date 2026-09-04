const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');

module.exports = defineConfig({
  base: '/lolcoaching/',
  plugins: [react()],
  server: {
    proxy: { '/api': 'http://localhost:4242' }
  },
  build: { outDir: 'dist', emptyOutDir: true }
});
