import path from 'path'
import typescript from 'rollup-plugin-typescript'
import babel from '@rollup/plugin-babel'

export default [{
  input: path.resolve(__dirname, '../src/main.tsx'),
  output: {
    file: 'build/main1.js',
    format: 'amd',
    name: 'main1'
  },
  plugins: [
    typescript(),
    babel({
      presets: ['@babel/preset-react']
    })
  ]
}]