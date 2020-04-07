## 使用
  `npm install`
## 配置
  根目录下app.json文件
```json
  {
    "pages": [           // 项目数组  每项都是单独的页面或者（应用）
      {
        "entry": "home",  // 入口文件夹      
        "title": "首页",  // 页面title
        "cdn": {}        // 本页面的的cdn链接  
      },
      {
        "entry": "workflow",
        "title": "工作流",
        "cdn": {}
      }
    ],
    "basePath": "../src/pages",  // pages文件夹的路径
    "cdn": {                     // 全局公共的cdn
      "js": [],
      "css": []
    },
    "externals": {}              // 打包的时候需要排除的包
  }
```
#### 启动项目 
```
npm run dev <page>
# OR
npm run start <page>
```
#### 项目打包
```
npm run dist-test <page>  // 生成测试环境下的静态文件 dist-test/<page>
npm run dist-uat  <page> // 生成灰度环境下的静态文件 dist-uat/<page>
npm run dist-prod <page> // 生成生产环境下的静态文件 dist-prod/<page>
or
npm run dist-xxx // 一次性打包所有page
```

#### 打包第三方库
```
npm run build-dll   // 项目中有添加新的包 执行一次这个命令，可以提高热更新和打包速度
```

