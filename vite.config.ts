import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import nodePolyfills from 'rollup-plugin-node-polyfills';

const PACKAGE_NAME = 'EnhancedocsChat';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      generateScopedName(name) {
        return name;
      }
    }
  },
  build: {
    lib: {
      name: PACKAGE_NAME,
      entry: './lib/index.ts',
      fileName: (format) => `enhancedocs-chat.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        name: PACKAGE_NAME,
        exports: 'named',
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM'
        }
      },
      plugins: [nodePolyfills()]
    },
    emptyOutDir: false,
    copyPublicDir: false
  },
  ssr: {
    noExternal: ['react-markdown']
  }
});
