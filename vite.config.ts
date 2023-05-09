import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

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
      entry: './lib/index.ts'
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        name: PACKAGE_NAME,
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM'
        }
      }
    },
    emptyOutDir: false,
    copyPublicDir: false
  },
  ssr: {
    noExternal: ['react-markdown']
  }
});
