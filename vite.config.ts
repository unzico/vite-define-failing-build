import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
export default ({ mode }): ReturnType<typeof defineConfig> => ({
  plugins: [reactRefresh()],
  define: {
    // Comment out the following line to make the build process work.
    // __DEV__: mode === "development",
  },
});
