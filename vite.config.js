import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)

function localApiPlugin() {
  return {
    name: 'local-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/')) return next()

        let body = ''
        req.on('data', chunk => (body += chunk))
        await new Promise(resolve => req.on('end', resolve))
        try { req.body = JSON.parse(body) } catch { req.body = {} }

        res.json = data => {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(data))
        }
        res.status = code => { res.statusCode = code; return res }

        try {
          const handler = require('./api/schedule.js')
          await handler(req, res)
        } catch (err) {
          res.statusCode = 500
          res.json({ error: err.message })
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  if (env.MONGODB_URI) process.env.MONGODB_URI = env.MONGODB_URI

  return {
    plugins: [
      react(),
      localApiPlugin(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
        manifest: {
          name: 'Fitness App',
          short_name: 'Fitness',
          description: 'Weekly workout planner and set tracker',
          start_url: '/',
          scope: '/',
          display: 'standalone',
          orientation: 'portrait',
          background_color: '#eeeff1',
          theme_color: '#eeeff1',
          icons: [
            { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
            { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
            { src: 'maskable-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
          navigateFallbackDenylist: [/^\/api\//],
          runtimeCaching: [
            {
              // Serve fresh schedule when online, fall back to last copy when offline (e.g. gym basement)
              urlPattern: ({ url, request }) => url.pathname.startsWith('/api/') && request.method === 'GET',
              handler: 'NetworkFirst',
              options: {
                cacheName: 'api-cache',
                networkTimeoutSeconds: 5,
                expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 7 },
              },
            },
          ],
        },
      }),
    ],
  }
})
