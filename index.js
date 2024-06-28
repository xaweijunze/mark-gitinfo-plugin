const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const { formatDateTime } = require("./utils/format");

class MarkGitinfoPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.done.tapAsync("MarkGitinfoPlugin", (stats, callback) => {
      const gitInfo = this.getGitInfo();
      const filePath = `${stats.compilation.outputOptions.path}/version.js`;
      const { version_info_name = "__version_info__" } = this.options || {};
      const versionJsContent = `${version_info_name} = ${JSON.stringify(
        gitInfo,
        null,
        2
      )};\n`;

      fs.writeFile(filePath, versionJsContent, (err) => {
        if (err) throw err;
        console.log(`Git info written to ${filePath}`);
        callback();
      });
    });
  }

  getGitInfo() {
    let gitinfo = {};
    try {
      // 获取当前脚本文件所在的目录
      const scriptDirectory = __dirname;
      // 获取当前目录的父级目录
      const parentDirectory = path.basename(
        path.dirname(path.dirname(scriptDirectory))
      );
      gitinfo["Project Name"] = parentDirectory;
    } catch (error) {
      console.log(error);
      gitinfo["Project Name"] = "获取项目名称失败！";
    }

    try {
      // 获取打包时的仓库地址
      const remoteUrl = execSync("git config --get remote.origin.url")
        .toString()
        .trim();
      const match = remoteUrl.match(/\/([^/]+)\.git$/);
      const remote = match ? match[1] : "";
      gitinfo["Project Remote"] = remote;
    } catch (error) {
      console.log(error);
      gitinfo["Project Remote"] = "获取仓库名称失败！";
    }

    try {
      // 获取打包时的分支
      const branch = execSync("git rev-parse --abbrev-ref HEAD")
        .toString()
        .trim();
      gitinfo["Project Branch"] = branch;
    } catch (error) {
      console.log(error);
      gitinfo["Project Branch"] = "获取版本失败！";
    }

    try {
      // 获取最近提交hash值
      const hash = execSync("git rev-parse --short HEAD").toString().trim();
      gitinfo["Last Commit Hash"] = hash;
    } catch (error) {
      console.log(error);
      gitinfo["Last Commit Hash"] = "获取最近提交失败！";
    }

    try {
      // 获取最近提交时间
      const lastCommitTime = parseInt(
        execSync("git log -1 --pretty=format:%ct").toString(),
        10
      );
      const lastCommitDate = new Date(lastCommitTime * 1000);
      const lastCommitDateStr = formatDateTime(lastCommitDate);
      gitinfo["Last Commit Date"] = lastCommitDateStr;
    } catch (error) {
      console.log(error);
      gitinfo["Last Commit Date"] = "获取最近提交时间失败！";
    }

    try {
      // 获取打包时服务器时间
      const buildDate = new Date();
      // 日期转换
      const buildDateStr = formatDateTime(buildDate);
      gitinfo["Build Date"] = buildDateStr;
    } catch (error) {
      console.log(error);
      gitinfo["Build Date"] = "获取打包时间失败！";
    }
    return gitinfo;
  }
}

module.exports = MarkGitinfoPlugin;
