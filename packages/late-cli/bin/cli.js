#!/usr/bin/env node

const program = require("commander");
const chalk = require("chalk");
// const figlet = require("figlet");
const pkg = require("../package.json");

//webpack构建
program
  .command("dev")
  .description("start server")
  .action((name, options) => {
    console.log("name", name, options);
  });

//快速创建模板
program
  .command("create <app-name>")
  .description("create a new project")
  .option("-f, --force", "overwrite target directory if it exists")
  .action((name, options) => {
    require("../lib/create.js")(name, options);
  });

//版本号
program
  .version(pkg.version)
  .option("-v, --version", "output the version number")
  .on("--help", () => {
    console.log(
      `\r\nRun ${chalk.cyan(`late <command> --help`)} for details.\r\n`
    );
  });

program.parse(process.argv);
