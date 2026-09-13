// vite.config.js
import { defineConfig } from "file:///C:/Users/admin/OneDrive/Desktop/sih/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/admin/OneDrive/Desktop/sih/node_modules/@vitejs/plugin-react/dist/index.js";
import { VitePWA } from "file:///C:/Users/admin/OneDrive/Desktop/sih/node_modules/vite-plugin-pwa/dist/index.js";
import path from "path";
var __vite_injected_original_dirname = "C:\\Users\\admin\\OneDrive\\Desktop\\sih\\apps\\web";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png"],
      manifest: {
        name: "SAHAY \u2014 Well-being Monitoring System",
        short_name: "SAHAY",
        description: "SAHAY: AI-Powered Dynamic Mental Health Monitoring and Distress Prediction System for Victims of Atrocities \u2014 Smart India Hackathon Prototype",
        theme_color: "#1B3A6B",
        background_color: "#F7F5F2",
        display: "standalone",
        orientation: "portrait",
        icons: [
          { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/icon-512.png", sizes: "512x512", type: "image/png" }
        ]
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: { cacheName: "google-fonts-cache" }
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src"),
      "@sahay/shared": path.resolve(__vite_injected_original_dirname, "../../packages/shared/src")
    }
  },
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tICd2aXRlLXBsdWdpbi1wd2EnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIFZpdGVQV0Eoe1xuICAgICAgcmVnaXN0ZXJUeXBlOiAnYXV0b1VwZGF0ZScsXG4gICAgICBpbmNsdWRlQXNzZXRzOiBbJ2Zhdmljb24uaWNvJywgJ2FwcGxlLXRvdWNoLWljb24ucG5nJ10sXG4gICAgICBtYW5pZmVzdDoge1xuICAgICAgICBuYW1lOiAnU0FIQVkgXHUyMDE0IFdlbGwtYmVpbmcgTW9uaXRvcmluZyBTeXN0ZW0nLFxuICAgICAgICBzaG9ydF9uYW1lOiAnU0FIQVknLFxuICAgICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgICAnU0FIQVk6IEFJLVBvd2VyZWQgRHluYW1pYyBNZW50YWwgSGVhbHRoIE1vbml0b3JpbmcgYW5kIERpc3RyZXNzIFByZWRpY3Rpb24gU3lzdGVtIGZvciBWaWN0aW1zIG9mIEF0cm9jaXRpZXMgXHUyMDE0IFNtYXJ0IEluZGlhIEhhY2thdGhvbiBQcm90b3R5cGUnLFxuICAgICAgICB0aGVtZV9jb2xvcjogJyMxQjNBNkInLFxuICAgICAgICBiYWNrZ3JvdW5kX2NvbG9yOiAnI0Y3RjVGMicsXG4gICAgICAgIGRpc3BsYXk6ICdzdGFuZGFsb25lJyxcbiAgICAgICAgb3JpZW50YXRpb246ICdwb3J0cmFpdCcsXG4gICAgICAgIGljb25zOiBbXG4gICAgICAgICAgeyBzcmM6ICcvaWNvbi0xOTIucG5nJywgc2l6ZXM6ICcxOTJ4MTkyJywgdHlwZTogJ2ltYWdlL3BuZycgfSxcbiAgICAgICAgICB7IHNyYzogJy9pY29uLTUxMi5wbmcnLCBzaXplczogJzUxMng1MTInLCB0eXBlOiAnaW1hZ2UvcG5nJyB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIHdvcmtib3g6IHtcbiAgICAgICAgZ2xvYlBhdHRlcm5zOiBbJyoqLyoue2pzLGNzcyxodG1sLGljbyxwbmcsc3ZnfSddLFxuICAgICAgICBydW50aW1lQ2FjaGluZzogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHVybFBhdHRlcm46IC9eaHR0cHM6XFwvXFwvZm9udHNcXC5nb29nbGVhcGlzXFwuY29tXFwvLiovaSxcbiAgICAgICAgICAgIGhhbmRsZXI6ICdDYWNoZUZpcnN0JyxcbiAgICAgICAgICAgIG9wdGlvbnM6IHsgY2FjaGVOYW1lOiAnZ29vZ2xlLWZvbnRzLWNhY2hlJyB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXG4gICAgICAnQHNhaGF5L3NoYXJlZCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi8uLi9wYWNrYWdlcy9zaGFyZWQvc3JjJyksXG4gICAgfSxcbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgcG9ydDogNTE3MyxcbiAgICBwcm94eToge1xuICAgICAgJy9hcGknOiB7XG4gICAgICAgIHRhcmdldDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMScsXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFvQyxTQUFBLG9CQUFBO0FBQ3BDLE9BQU8sV0FBVztBQUNsQixTQUFTLGVBQWU7QUFDeEIsT0FBTyxVQUFVO0FBSGpCLElBQUEsbUNBQW9DO0FBS3BDLElBQUEsc0JBQWUsYUFBYTtFQUMxQixTQUFTO0lBQ1AsTUFBSztJQUNMLFFBQVE7TUFDTixjQUFjO01BQ2QsZUFBZSxDQUFDLGVBQWUsc0JBQXNCO01BQ3JELFVBQVU7UUFDUixNQUFNO1FBQ04sWUFBWTtRQUNaLGFBQ0U7UUFDRixhQUFhO1FBQ2Isa0JBQWtCO1FBQ2xCLFNBQVM7UUFDVCxhQUFhO1FBQ2IsT0FBTztVQUNMLEVBQUUsS0FBSyxpQkFBaUIsT0FBTyxXQUFXLE1BQU0sWUFBVztVQUMzRCxFQUFFLEtBQUssaUJBQWlCLE9BQU8sV0FBVyxNQUFNLFlBQVc7OztNQUcvRCxTQUFTO1FBQ1AsY0FBYyxDQUFDLGdDQUFnQztRQUMvQyxnQkFBZ0I7VUFDZDtZQUNFLFlBQVk7WUFDWixTQUFTO1lBQ1QsU0FBUyxFQUFFLFdBQVcscUJBQW9COzs7O0tBSWpEOztFQUVILFNBQVM7SUFDUCxPQUFPO01BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztNQUNwQyxpQkFBaUIsS0FBSyxRQUFRLGtDQUFXLDJCQUEyQjs7O0VBR3hFLFFBQVE7SUFDTixNQUFNO0lBQ04sT0FBTztNQUNMLFFBQVE7UUFDTixRQUFRO1FBQ1IsY0FBYzs7OztDQUlyQjsiLAogICJuYW1lcyI6IFtdCn0K
