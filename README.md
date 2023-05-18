# 使用方法
1. ·npm i mark-gitinfo-plugin
2. 在webpackConfig 中引用  const MarkGitinfoPlugin = require('Mark-gitinfo-plugin')
3. 在webpackConfig 的plugins 中插入 new MarkGitinfoPlugin()
-  例如：在CRA项目中的 config-overrides.js 文件中
```Javascript 
const path = require('path')
const MarkGitinfoPlugin = require('Mark-gitinfo-plugin')

module.exports = function override(config) {
  const isProduction = config.mode === 'production'
  if (isProduction) {
    pushPlugins()
  }
  return config

  function pushPlugins(){
    config.plugins.push(new MarkGitinfoPlugin())
  }
}
```
# 效果
在build中生成verson.txt文件,生成如下信息
```
  Project Remote: app-base
  Project Branch: master
  Commit Hash: 7413fa2
  Commit Date: Sat Apr 22 2023 22:34:49 GMT+0800 (中国标准时间)
  Build Date: Sun Apr 23 2023 22:56:59 GMT+0800 (中国标准时间) 
```