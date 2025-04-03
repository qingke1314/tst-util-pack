import { defineConfig } from 'father';
import path from 'path';

export default defineConfig({
  // more father config: https://github.com/umijs/father/blob/master/docs/config.md
  esm: { output: 'dist' },
  alias: {
    '@': path.resolve(__dirname, 'src'),
  },
});
