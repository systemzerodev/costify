import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: 'autoUpdate',

      includeAssets: [
        'favicon.svg',
        'apple-touch-icon.png',
      ],

      manifest: {
        id: '/',

        name: 'Costify',
        short_name: 'Costify',

        description:
          'Calculate capital, HPP, profit, margin, and selling price with confidence.',

        theme_color: '#4f46e5',
        background_color: '#f8fafc',

        display: 'standalone',

        start_url: '/',
        scope: '/',

        orientation: 'portrait-primary',

        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },

      workbox: {
        cleanupOutdatedCaches: true,

        navigateFallback: 'index.html',

        globPatterns: [
          '**/*.{js,css,html,ico,png,svg,webp}',
        ],
      },

      devOptions: {
        enabled: true,
      },
    }),
  ],
})