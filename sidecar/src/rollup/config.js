import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.js',
  output: {
    banner: '#!/usr/bin/env node\n',
    format: 'es',
    file: 'dist/sidecar-git',
    plugins: [terser({
      output: {
        max_line_len: 80,
        semicolons: false
      }})],
  },
  external(id) {
    return id.startsWith('node:')
  },
}
