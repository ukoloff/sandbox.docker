import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.js',
  output: {
    banner: '#!/bin/env node\n',
    format: 'es',
    dir: 'dist',
    plugins: [terser()],
  },
  external(id) {
    return id.startsWith('node:')
  },
}
