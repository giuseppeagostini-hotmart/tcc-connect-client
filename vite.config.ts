/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ command }) => {
  const config = {
    plugins: [react(), tsconfigPaths()],
    base: '/',
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/setupTests.ts']
    }
  }

  if (command !== 'serve') {
    config.base = '/tcc-connect-client/'
  }

  return config
})

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react(), tsconfigPaths()],
//   base: '/tcc-connect-client/',
//   test: {
//     globals: true,
//     environment: 'jsdom',
//     setupFiles: ['./src/setupTests.ts']
//   }
// })
