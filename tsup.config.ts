import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    button: 'src/components/button/index.ts',
    dialog: 'src/components/dialog/index.ts',
    toast: 'src/components/toast/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  minify: true,
  treeshake: true,
  splitting: false,
  target: 'es2019',
  external: ['react', 'react-dom', 'react/jsx-runtime'],
});
