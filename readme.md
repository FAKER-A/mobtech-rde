## 使用
  `npm install`
#### 启动项目 
```
npm run dev
# OR
npm run start
```

#### 项目打包
```
npm run build-test  // 生成测试环境下的静态文件 build-test
npm run build-uat   // 生成灰度环境下的静态文件 build-uat
npm run build-prod  // 生成生产环境下的静态文件 build-prod
```

#### 打包第三方库
```
npm run build-dll   // 项目中有添加新的包 执行一次这个命令，可以提高热更新和打包速度
```

## 目录结构
```
│  .babelrc.js        // babel配置
│  .gitignore         // git push忽略规则
│  package-lock.json  // package-lock.json
│  package.json       // 项目配置信息
│  postcss.config.js  // postcss配置文件
│  readme.md          // readme.md
│  
├─build-prod          // 生产环境下的静态文件
├─build-test          // 测试环境下的静态文件
├─build-uat           // uat环境下的静态文件
├─config                      // webpack配置目录
│  │  dev.server.js           // webpack-dev-server服务配置
│  │  webpack.build.js        // webpack 打包配置
│  │  webpack.common.js       // webpack 公共配置
│  │  webpack.dev.js          // webpack 开发环境配置
│  │  webpack.dll.js          // webpack-dll配置
│  │  
│  └─dll                       // 缓存文件
│          build.config.json   // build.config.json
│          manifest.json       // manifest.json
│          
├─public              // 静态公共资源文件夹
│  │  index.html      // index.html 模板
│  │   
│  └─vendor           // 缓存文件
│          vendor.dll.771f3f20.js     // webpack.DllPlugin 生成的缓存文件
│          
├─scripts             // 脚本目录
│      build.dll.js   // npm run build-dll
│      build.js       // npm run build-test || build-uat || build-prod
│      dev.js         // npm run dev
│      
└─src            // 业务代码根目录
    │  main.js   // 入口文件 
    ├─assets     // 文件资源
    ├─config     // 项目配置
    ├─router     // 路由配置
    ├─store      // stroe配置
    ├─style      // 公共样式
    └─views      // 页面代码
```

## 项目中使用的工具
### devDependencies
* webpack: 打包工具
* webpack-cli: webpack4之后webpack-cli从webpack中分离出来，必须安装webpack-cli
* webpack-dev-server: webpack服务器
* webpack-merge: 合并webpack配置

+ babel-loader: js语法解释器
+ @babel/cli: 为babel的脚手架工具
+ @babel/core: babel-core是作为babel的核心存在，babel的核心api都在这个模块里面，比如：transform，用于字符串转码得到ASTbabel-loader: 就是用于编译JavaScript代码
+ @babel/preset-env : 官方解释“用于编写下一代JavaScript的编译器”，编译成浏览器认识的JavaScript标准
+ @babel/plugin-transform-runtime: 将babel辅助函数打包到单独文件内
+ @babel/plugin-syntax-dynamic-import: 解析import()语法
+ @babel/plugin-proposal-class-properties: 解析class类的属性
+ @babel/plugin-proposal-decorators: 解析装饰器模式语法，如使用react-redux的@connect
+ @babel/plugin-proposal-export-default-from: 解析export xxx from 'xxx'语法
+ vue-loader: vue文件处理
+ vue-style-loader: vue文件中的style处理
+ vue-template-compiler: vue文件模板处理
+ cross-env 设置环境变量

* style-loader: 将css添加到style标签
* css-loader: 处理css文件
* less: less文件处理工具
* less-loader: 处理less转换css
* postcss-loader: css工具
* autoprefixer: 配合postcss-loader 添加css兼容性浏览器前缀
* file-loader: 文件处理loader

+ html-webpack-plugin: webpack html插件
+ mini-css-extract-plugin: 将css转换为文件
+ optimize-css-assets-webpack-plugin:  压缩css文件
+ uglifyjs-webpack-plugin 压缩js
+ friendly-errors-webpack-plugin: 错误提示插件
+ clean-webpack-plugin: 清空输出文件夹
+ copy-webpack-plugin: 打包前copy文件
+ assets-webpack-plugin: 根据资源路径发出json

* chalk: 终端输出颜色插件
* ora: 终端交互插件
* portfinder: 获取可用端口
* rimraf: 删除工具
