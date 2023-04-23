const fs = require('fs');
const childProcess = require('child_process');

class MarkGitinfoPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.done.tapAsync('MarkGitinfoPlugin', (stats, callback) => {
      const gitInfo = this.getGitInfo();
      const filePath = `${stats.compilation.outputOptions.path}/git-info.txt`;

      fs.writeFile(filePath, gitInfo, (err) => {
        if (err) throw err;
        console.log(`Git info written to ${filePath}`);
        callback();
      });
    });
  }

  getGitInfo() {
    const branch = childProcess.execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
    const hash = childProcess.execSync('git rev-parse --short HEAD').toString().trim();
    const message = childProcess.execSync('git log -1 --pretty=%B').toString().trim();
    const date = new Date().toISOString();

    return `Branch: ${branch}\nCommit Hash: ${hash}\nCommit Message: ${message}\nCommit Date: ${date}\n`;
  }
}

module.exports = MarkGitinfoPlugin