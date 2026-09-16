import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // mock 데이터로 전환되며 실제 백엔드 호출이 없어져 proxy 설정 제거함
})