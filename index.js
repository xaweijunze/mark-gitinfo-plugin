const fs = require('fs');
const { execSync } = require('child_process');
const { formatDateTime } = require('./utils/format');

class MarkGitinfoPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.done.tapAsync('MarkGitinfoPlugin', (stats, callback) => {
      const gitInfo = this.getGitInfo();
      const filePath = `${stats.compilation.outputOptions.path}/verson.txt`;

      fs.writeFile(filePath, gitInfo, (err) => {
        if (err) throw err;
        console.log(`Git info written to ${filePath}`);
        callback();
      });
    });
  }

  getGitInfo() {
    let gitinfo = ''
    try
      {
        // 获取打包时的仓库地址
        const remoteUrl = execSync('git config --get remote.origin.url').toString().trim();
        const match = remoteUrl.match(/\/([^/]+)\.git$/);
        const remote = match ? match[1] : '';
        // 获取打包时的分支
        const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
        // 获取最近提交hash值
        const hash = execSync('git rev-parse --short HEAD').toString().trim();
        // 获取最近提交时间
        const lastCommitTime = parseInt(execSync('git log -1 --pretty=format:%ct').toString(), 10);
        const lastCommitDate = new Date(lastCommitTime * 1000);
        // 获取打包时服务器时间
        const buildDate = new Date();
        // 日期转换
        const lastCommitDateStr = formatDateTime(lastCommitDate);
        const buildDateStr = formatDateTime(buildDate);
        gitinfo = `Project Remote: ${remote}\n`+
                  `Project Branch: ${branch}\n`+
                  `Last Commit Hash: ${hash}\n`+
                  `Last Commit Date: ${lastCommitDateStr}\n`+
                  `Build Date: ${buildDateStr}\n`;
      }
    catch(error){
      console.log(error)
      gitinfo = '获取版本失败，请查看日志！'
    }

    return gitinfo
  }
}

module.exports = MarkGitinfoPlugin