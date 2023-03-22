import { defineConfig } from 'vite'
import path from 'path'

import vue from '@vitejs/plugin-vue2'
import vueJsx from '@vitejs/plugin-vue2-jsx'
import graphql from '@rollup/plugin-graphql'
import eslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true
  },
  resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
  },
  plugins: [
    vue(),
    vueJsx(),
    eslint(),
    graphql()
  ],
})
