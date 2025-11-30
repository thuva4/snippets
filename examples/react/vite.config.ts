import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
    plugins: [
        react(),
        viteCompression()
    ],
    base: '/',
    server: {
        port: 3001,
    },
    define: {
        'process.env': {},
        'global': 'globalThis',
    },
    optimizeDeps: {
        esbuildOptions: {
            define: {
                global: 'globalThis'
            }
        }
    },
    build: {
        minify: 'terser',
        rollupOptions: {
            output: {
                manualChunks: {
                    'vendor-react': ['react', 'react-dom'],
                    'vendor-shiki': ['shiki'],
                    'vendor-utils': ['html-to-image'],
                }
            }
        }
    }
})
