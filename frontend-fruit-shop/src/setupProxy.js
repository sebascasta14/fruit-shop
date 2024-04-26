import { createProxyMiddleware } from 'http-proxy-middleware'

export default function (App) {
  App.use('/api', createProxyMiddleware({
    target: 'https://www.fruityvice.com',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '/api'
    }
  }))
}
