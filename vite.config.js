import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Optimize chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'framer-motion'],
          'icons': ['lucide-react', 'react-icons'],
        }
      }
    },
    // Use esbuild for minification (built-in, no additional dependency)
    minify: 'esbuild',
    // Reduce build output noise
    reportCompressedSize: false,
  },
  // Pre-bundle dependencies for faster cold starts
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'lucide-react', 'react-icons', 'clsx', 'tailwind-merge'],
  },
})
