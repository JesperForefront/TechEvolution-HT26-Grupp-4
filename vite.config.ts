import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { kudosFilePlugin } from './vite/kudos-file-plugin.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), kudosFilePlugin()],
  // Saving kudos must not reload the page mid-save.
  server: { watch: { ignored: ['**/data/kudos.json', '**/data/kudos.json.tmp'] } },
})
