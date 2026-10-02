import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // './' makes every asset reference in the built index.html RELATIVE rather than
  // absolute from the domain root. Google Cloud serves the site from
  // storage.googleapis.com/<bucket>/, so an absolute /assets/... would look for the
  // file at the domain root, 404, and leave the page blank.
  base: './',
  plugins: [react()],
})
