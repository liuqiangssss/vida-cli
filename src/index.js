#!/usr/bin/env node
import { program } from "commander";
import fs from "fs";
import { selectProjectType, selectReactInfo, selectVueInfo } from "./inquirer.js";
import { checkPath, handleReact, installDependencies, handleVue, handleNext } from "./util.js";
import path from "path";
import { fileURLToPath } from "url";
import ora from "ora";
// import chalk from "chalk";
import { exec } from "child_process";
import util from "util";
const execPromisr = util.promisify(exec);
const spinner = ora("下载中...");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../package.json"), "utf8"));
program.version(packageJson.version, "-v, --version, -V", "显示程序版本号");
program
  .command("create")
  .alias("init")
  .description("Create a new project")
  .action(async () => {
    const { projectName, projectType } = await selectProjectType();
    if (checkPath(projectName)) {
      console.log("文件夹已存在");
      return;
    }
    if (projectType === "React") {
      const { dependencies } = await selectReactInfo();
      spinner.start();
      await handleReact({ projectName, dependencies });
      spinner.succeed("下载成功");
      await execPromisr(`cd ${projectName} & yarn format`);
      await installDependencies(projectName);
    }
    if (projectType === "Vue") {
      const { dependencies } = await selectVueInfo();
      spinner.start();
      await handleVue({ projectName, dependencies });
      spinner.succeed("下载成功");
      await execPromisr(`cd ${projectName} & yarn format`);
      await installDependencies(projectName);
    }
    if (projectType === "Next") {
      spinner.start();
      await handleNext({ projectName });
      spinner.succeed("下载成功");
      await installDependencies(projectName);
    }
  });
program.parse(process.argv);
