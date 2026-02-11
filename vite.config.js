import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        quiz: resolve(__dirname, 'quiz.html'),
        resultado: resolve(__dirname, 'resultado.html'),
        termos: resolve(__dirname, 'termos.html'),
        privacidade: resolve(__dirname, 'privacidade.html'),
        disclaimer: resolve(__dirname, 'disclaimer.html')
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
