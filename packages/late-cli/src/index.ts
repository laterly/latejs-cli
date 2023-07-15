import { program } from "commander";
import create from "./create";
//快速创建模板
program
  .command("create <app-name>")
  .description("create a new project")
  .option("-f, --force", "overwrite target directory if it exists")
  .action((name, options) => {
    create(name, options);
  });

program.parse(process.argv);
