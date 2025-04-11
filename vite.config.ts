import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { compression } from 'vite-plugin-compression2';


export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: 'gzip',
      exclude: [/\.(br)$/, /\.(gz)$/],
      threshold: 1024
    }),
    compression({
      algorithm: 'brotliCompress',
      exclude: [/\.(br)$/, /\.(gz)$/],
      threshold: 1024
    })
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['react', 'react-dom', 'react-router-dom']
  },
  build: {
    target: 'esnext',
    modulePreload: {
      polyfill: false
    },
    rollupOptions: {
      output: {
        /*manualChunks(id) {
          if (id.includes('node_modules/react')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-icons';
          }
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }, */
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js'
      }
    },
    cssCodeSplit: true,
    sourcemap: false,
    minify: 'esbuild',
    terserOptions: {
      format: {
        comments: false,
        ecma: 2020
      },
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn', 'console.error'],
        passes: 3,
        ecma: 2020
      }
    },
    reportCompressedSize: false,
    assetsInlineLimit: 8192,
    chunkSizeWarningLimit: 2000,
    emptyOutDir: true,
    commonjsOptions: {
      transformMixedEsModules: true
    },
    dynamicImportVarsOptions: {
      warnOnError: false
    },
    cssMinify: true,
    manifest: true
  }
});
