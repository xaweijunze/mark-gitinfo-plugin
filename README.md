# 使用方法
1. `npm i mark-gitinfo-plugin` or `yarn add mark-gitinfo-plugin`
2. 在 webpackConfig 中引用  `const MarkGitinfoPlugin = require('mark-gitinfo-plugin')`
3. 在 webpackConfig 的plugins 中插入 `new MarkGitinfoPlugin({ version_info_name: yourProjectName })`
4. 在index.html中插入 `<script src="%{PUBLIC_URL}%/version.js"></script>`
5. 在index.html 同级文件夹中添加空文件 version.js (以免本地运行报文件找不到)
6. 
-  例如：在CRA项目中的 config-overrides.js 文件中
```Javascript 
const MarkGitinfoPlugin = require('mark-gitinfo-plugin')

module.exports = function override(config){
    if(config.mode === 'production'){
        setPlugins()
    }
    return config

    function setPlugins(){
        config.plugins.push(new MarkGitinfoPlugin({ version_info_name: 'app-base' }))
    }
}
```
# 效果
在build中生成version.js文件,生成如下信息
```
  version_info_name = {
  "Project Name": "app-base"
  "Project Remote": "app-base"
  "Project Branch": "master"
  "Commit Hash": "7413fa2"
  "Commit Date": "2023-05-22 22:34:49"
  "Build Date": "2023-05-22 22:56:59"
  }
```