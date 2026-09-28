import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    base: '/',
    publicDir: 'public',
    plugins: [
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
      dedupe: ['react', 'react-dom'],
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'lucide-react'],
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      sourcemap: true,
      minify: 'esbuild',
      chunkSizeWarningLimit: 3000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom')) {
                return 'vendor';
              }
              if (id.includes('lucide-react')) {
                return 'ui';
              }
              if (id.includes('pdfjs-dist') || id.includes('pdf-lib') || id.includes('@pdf-lib')) {
                return 'pdf-deps';
              }
              if (id.includes('@imgly')) {
                return 'bg-removal-deps';
              }
              if (id.includes('docx') || id.includes('mammoth') || id.includes('jszip')) {
                return 'doc-deps';
              }
              return 'vendor-deps';
            }
          }
        }
      }
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
