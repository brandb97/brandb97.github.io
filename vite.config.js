import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        post: 'src/post/index.html',
        shell: 'src/post/shell/ShellTips.html',
        proverb: 'src/post/proverb/Proverb.html',
        git_diff: 'src/post/git-diff/git-diff.html',
        myscreen: 'src/post/myscreen/myscreen.html',
      }
    }
  }
})
