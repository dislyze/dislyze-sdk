import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: "src/sdk.ts",
      name: "dislyze SDK",
      fileName: "dislyze-sdk"
    }
  },
  plugins: [
    svelte({
        compilerOptions: {
          customElement: true,
        },
      })
    ]
})
