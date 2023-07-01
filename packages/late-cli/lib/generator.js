const path = require("path");
const fs = require("fs-extra");
const chalk = require("chalk");
const inquirer = require("inquirer");
const util = require("util");
const { exec } = require("child_process");
const downloadGitRepo = require("download-git-repo"); // 不支持 Promise
const { wrapLoading } = require("./utils");
const { getRepoList } = require("./http");
class Generator {
  constructor(name, targetDir) {
    // 目录名称
    this.name = name;
    // 创建位置
    this.targetDir = targetDir;
    // 对 download-git-repo 进行 promise 化改造
    this.downloadGitRepo = util.promisify(downloadGitRepo);
  }
  // 下载远程模板
  // 1）拼接下载地址
  // 2）调用下载方法
  // https://github.com/laterly/react-ts-webpack5.git
  async download(repo) {
    // 1）拼接下载地址
    const requestUrl = `direct:https://github.com/laterly/${repo}.git`;

    // 2）调用下载方法
    await wrapLoading(
      this.downloadGitRepo, // 远程下载方法
      "waiting download template", // 加载提示信息
      requestUrl, // 参数1: 下载地址
      path.resolve(process.cwd(), this.targetDir), // 参数2: 创建位置
      {
        clone: true,
      }
    );
  }
  // 获取用户选择的模板
  // 1）从远程拉取模板数据
  // 2）用户选择自己新下载的模板名称
  // 3）return 用户选择的名称

  async getRepo() {
    // 1）从远程拉取模板数据
    const repoList = await wrapLoading(getRepoList, "waiting fetch template");
    if (!repoList) return;

    // 过滤我们需要的模板名称
    const repos = repoList.map((item) => item.name);

    // 2）用户选择自己新下载的模板名称
    const { repo } = await inquirer.prompt({
      name: "repo",
      type: "list",
      choices: repos,
      message: "Please choose a template to create project",
    });

    // 3）return 用户选择的名称
    return repo;
  }

  // 核心创建逻辑
  // 1）获取模板名称
  // 2）获取 tag 名称
  // 3）下载模板到模板目录
  async create() {
    // 1）获取模板名称
    const repo = await this.getRepo();
    // console.log("用户选择了，repo=" + repo + "，tag=" + tag);
    // 3）下载模板到模板目录
    await this.download(repo);

    // .git 目录路径
    // const gitFolderPath = path.resolve(process.cwd(), this.targetDir,'.git');
    // 删除 .git 目录
    const gitFolderPath = path.resolve(process.cwd(), this.targetDir, ".git");
    fs.remove(gitFolderPath, (error) => {
      if (error) {
        console.error(`删除 .git 目录时出错：${error}`);
        return;
      }
      //执行 git init 命令
      exec(
        "git init",
        { cwd: path.resolve(process.cwd(), this.targetDir) },
        (error, stdout, stderr) => {
          if (error) {
            console.error(`执行Git初始化时出错：${error}`);
            return;
          }

          console.log("Git初始化成功！");
          // 4）模板使用提示
          console.log(
            `\r\nSuccessfully created project ${chalk.cyan(this.name)}`
          );
          console.log(`  cd ${chalk.cyan(this.name)}`);
          console.log(`  pnpm install`);
          console.log(`  pnpm dev`);
          console.log(`  pnpm build`);
          console.log(`  pnpm lint`);
          console.log("  pnpm lint:style\r\n");
        }
      );
    });
  }
}

module.exports = Generator;
