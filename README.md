# 使用方法
1. ·npm i mark-gitinfo-plugin
2. 在webpackConfig 中引用  const MarkGitinfoPlugin = require('mark-gitinfo-plugin')
3. 在webpackConfig 的plugins 中插入 new MarkGitinfoPlugin()
-  例如：在CRA项目中的 config-overrides.js 文件中
```Javascript 
const MarkGitinfoPlugin = require('mark-gitinfo-plugin')

module.exports = function override(config){
    if(config.mode === 'production'){
        setPlugins()
    }
    return config

    function setPlugins(){
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
  Commit Date: 2023-05-22 22:34:49
  Build Date: 2023-05-22 22:56:59
```