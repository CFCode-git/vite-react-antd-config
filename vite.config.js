import {defineConfig} from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import vitePluginImp from 'vite-plugin-imp/dist'
import path from 'path'
import fs from 'fs'
import lessToJS from 'less-vars-to-js'
import config from './config'

console.log(__dirname)
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './config/variables.less'), 'utf8')
)

// console.log('process::env',process.argv)
const env = process.argv[process.argv.length-1]
const base = config[env]

// https://vitejs.dev/config/
export default defineConfig({
  base:base.cdn,
  plugins: [
    reactRefresh(),
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: (name) => `antd/lib/${name}/style/index.less`
        }
      ]
    })
  ],
  resolve:{
    alias:{
      '~':path.resolve(__dirname,'./'), // 根目录
      '@':path.resolve(__dirname,'./src') // src路径
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
        // 重写 less 变量，定制样式
        modifyVars: themeVariables
      }
    }
  },
  server:{
    port:3001, // 开发环境启动的接口
    proxy:{
      '/api':{
        // 当遇到 api 路径时，将其转化成 target 的值.
        target:'http://47.99.134.126:28019/api/v1',
        changeOrigin:true,
        rewrite:path=>path.replace(/^\/api/,'') //将 api 重写为空
      }
    }
  }
})
