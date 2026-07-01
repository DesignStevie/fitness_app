import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
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
    plugins: [react(), localApiPlugin()],
  }
})
