import { defineConfig } from 'vite';
import { resolve } from 'path';
import { globSync } from 'glob';

// Find all artifact HTML files
const artifactFiles = globSync('src/artifacts/**/index.html');
const input = {
  main: resolve(__dirname, 'index.html'),
};

// Add each artifact as an entry point
artifactFiles.forEach((file) => {
  const name = file.replace('src/artifacts/', '').replace('/index.html', '');
  input[name] = resolve(__dirname, file);
});

export default defineConfig({
  root: '.',
  base: './',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input,
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@assets': resolve(__dirname, 'src/assets'),
      '@images': resolve(__dirname, 'src/assets/images'),
    },
  },
  server: {
    open: false,
  },
});
