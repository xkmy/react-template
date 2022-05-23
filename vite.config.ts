import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
import imagemin from 'vite-plugin-imagemin'
import eslint from 'vite-plugin-eslint'
import vitePlugin from 'vite-plugin-import-lyrical'

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5000
  },
  plugins: [
    react({
      babel: {
        plugins: [
          ['@babel/plugin-proposal-decorators', { legacy: true }],
          ['@babel/plugin-proposal-class-properties', { loose: true }]
        ]
      }
    }),
    eslint(),
    // 图片压缩
    imagemin({
      optipng: {
        optimizationLevel: 7
      },
      pngquant: {
        quality: [0.8, 0.9]
      },
      // svg 优化
      svgo: {
        plugins: [
          {
            name: 'removeViewBox'
          },
          {
            name: 'removeEmptyAttrs',
            active: false
          }
        ]
      }
    }),
    vitePlugin({
      libList: [
        {
          name: 'antd',
          style: {
            transform: name => `antd/es/${name}/style`
          }
        }
      ]
    })
  ],
  resolve: {
    alias: {
      '@assets': pathJoin('assets'),
      '@components': pathJoin('components'),
      '@utils': pathJoin('utils'),
      '@constants': pathJoin('constants'),
      '@services': pathJoin('services'),
      '@views': pathJoin('views'),
      '@stores': pathJoin('stores')
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        // 从入口点创建的块的打包输出格式[name]表示文件名
        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: assetFileTransform,
        manualChunks: {
          basic: ['react', 'react-dom', 'react-router-dom', 'mobx', 'mobx-react'],
          antd: ['antd', '@ant-design/icons']
        }
      }
    }
  }
})

function assetFileTransform(v: { name: string | undefined; source: string | Uint8Array; type: 'asset' }) {
  const suffix = v.name.substring(v.name.lastIndexOf('.') + 1)
  const suffixs = ['png', 'jpg', 'jpeg', 'gif', 'psd', 'svg', 'tiff', 'wmf', 'bmp', 'webp']

  if (suffixs.includes(suffix.toLowerCase())) {
    return 'imgs/[name]-[hash].[ext]'
  }

  return `${suffix}/[name]-[hash].[ext]`
}

function pathJoin(name: string) {
  return path.join(__dirname, `src/${name}`)
}
