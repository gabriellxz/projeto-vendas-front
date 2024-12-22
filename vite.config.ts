import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { execSync } from "child_process"

// https://vitejs.dev/config/
export default defineConfig(() => {
  // Obtenha o nome da branch com git
  const branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' }).trim();

  // Defina a URL base com base na branch
  const baseURL = branch === 'main'
    ? process.env.VITE_API_LINK_MAIN
    : process.env.VITE_API_LINK_TEST;

  return {
    define: {
      'process.env.VITE_API_LINK': JSON.stringify(baseURL),
    },
  };
})


