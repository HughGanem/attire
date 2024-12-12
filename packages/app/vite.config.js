import { resolve } from "path";

export default {
  server: {
    proxy: {
      "/api": "http://localhost:3000",
      "/auth": "http://localhost:3000"
    }
  },
  build: {
    rollupOptions: {
      input: {
        spa: resolve(__dirname, "index.html"),
        login: resolve(__dirname, "dreaminlogin.html")
      }
    }
  }
};