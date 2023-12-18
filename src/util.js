import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import copydir from "copy-dir";
import { exec } from "child_process";
import util from "util";
import ora from "ora";
import Handlebars from "handlebars";
import { reactAppTsx, viteConfigTs, axiosTemplate, tailwindcss, vueAppTsx, vueHooks, vueMainTs } from "./templates.js";
import { reactDependencies, vueDependencies } from "./common.js";
const spinner = ora("下载中...");
const execPromisr = util.promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function installDependencies(projectName) {
  spinner.start("正在按装依赖...");
  await execPromisr(`cd ${projectName} && yarn`);
  spinner.succeed("依赖安装完成");
}

export function compile(content, data) {
  const template = Handlebars.compile(content);
  return template(data);
}
export function checkPath(path) {
  return fs.existsSync(path);
}
function copyDir(from, to, options) {
  copydir.sync(path.resolve(__dirname, from), path.resolve(process.cwd(), to), options);
}
function fsWriteTempalte(pathName, template) {
  fs.writeFileSync(path.resolve(process.cwd(), pathName), template, "utf8");
}
// 处理React模板
function handleReactTemplateFiles(projectName, dependencies) {
  if (dependencies.includes("axios")) {
    const template = compile(axiosTemplate);
    fsWriteTempalte(`./${projectName}/src/utils/request.ts`, template);
  }
  if (dependencies.includes("tailwindcss")) {
    const template = compile(tailwindcss);
    fsWriteTempalte(`./${projectName}/src/index.css`, template);
    copyDir(`../templates/Tailwind`, `./${projectName}`);
  }
  if (dependencies.includes("react-router-dom")) {
    copyDir(`../templates/React-Router`, `./${projectName}/src`);
  }
  if (dependencies.includes("react-redux")) {
    copyDir(`../templates/Redux`, `./${projectName}/src/store`);
  }
  let template = "";
  if (dependencies.includes("react-router-dom") && dependencies.includes("react-redux")) {
    template = compile(reactAppTsx, { includeRouter: true, includeRedux: true });
  } else if (dependencies.includes("react-router-dom")) {
    template = compile(reactAppTsx, { includeRouter: true });
  } else if (dependencies.includes("react-redux")) {
    template = compile(reactAppTsx, { includeRedux: true });
  } else {
    template = compile(reactAppTsx);
  }
  fsWriteTempalte(`./${projectName}/src/App.tsx`, template);
}
// 处理ReactPackageJson模板
function handleReactPackageJson(projectName, dependencies) {
  const packageJson = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), `./${projectName}/package.json`), "utf8"));
  packageJson.name = projectName;
  dependencies.forEach((dep) => {
    if (dep === "react-redux") {
      packageJson.dependencies[dep] = reactDependencies[dep];
      packageJson.dependencies["@reduxjs/toolkit"] = reactDependencies["@reduxjs/toolkit"];
    }
    if (dep === "tailwindcss") {
      packageJson.dependencies[dep] = reactDependencies[dep];
      packageJson.dependencies["postcss"] = reactDependencies["postcss"];
      packageJson.dependencies["autoprefixer"] = reactDependencies["autoprefixer"];
    }
    packageJson.dependencies[dep] = reactDependencies[dep];
  });
  fsWriteTempalte(`./${projectName}/package.json`, JSON.stringify(packageJson, null, 2));
}
// 处理viteConfigTs模板
function handleViteTemplate(projectName, projectType, includeTailWind) {
  const template = compile(viteConfigTs, { includeTailWind, isReact: projectType === "React", isVue: projectType === "Vue" });
  fsWriteTempalte(`./${projectName}/vite.config.ts`, template);
}

export function handleReact({ projectName, dependencies }) {
  return new Promise((resolve, reject) => {
    copyDir(`../templates/React`, `./${projectName}`);
    handleReactPackageJson(projectName, dependencies);
    handleReactTemplateFiles(projectName, dependencies);
    handleViteTemplate(projectName, "React", dependencies.includes("tailwindcss"));
    resolve();
  });
}
// 处理VuePackageJson模板
function handleVuePackageJson(projectName, dependencies) {
  const packageJson = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), `./${projectName}/package.json`), "utf8"));
  packageJson.name = projectName;
  dependencies.forEach((dep) => {
    if (dep === "tailwindcss") {
      packageJson.dependencies[dep] = vueDependencies[dep];
      packageJson.dependencies["postcss"] = vueDependencies["postcss"];
      packageJson.dependencies["autoprefixer"] = vueDependencies["autoprefixer"];
    }
    if (dep === "pinia") {
      packageJson.dependencies[dep] = vueDependencies[dep];
      packageJson.devDependencies["@types/pinia"] = vueDependencies["@types/pinia"];
    }
    packageJson.dependencies[dep] = vueDependencies[dep];
  });
  fsWriteTempalte(`./${projectName}/package.json`, JSON.stringify(packageJson, null, 2));
}
// 处理Vue模板
function handleVueTemplateFiles(projectName, dependencies) {
  if (dependencies.includes("axios")) {
    const template = compile(axiosTemplate);
    fsWriteTempalte(`./${projectName}/src/utils/request.ts`, template);
  }
  if (dependencies.includes("tailwindcss")) {
    const template = compile(tailwindcss);
    fsWriteTempalte(`./${projectName}/src/index.css`, template);
    copyDir(`../templates/Tailwind`, `./${projectName}`);
  }
  if (dependencies.includes("vue-router")) {
    copyDir(`../templates/Vue-Router`, `./${projectName}/src/router`);
    console.log(dependencies);
    const apptsxTemplate = compile(vueAppTsx, { router: true });
    fsWriteTempalte(`./${projectName}/src/App.tsx`, apptsxTemplate);
  }
  if (dependencies.includes("pinia")) {
    copyDir(`../templates/Pinia`, `./${projectName}/src/store`);
    const hookTemplate = compile(vueHooks);
    fsWriteTempalte(`./${projectName}/src/hooks/useUser.ts`, hookTemplate);
  }
  let template = "";
  if (dependencies.includes("vue-router") && dependencies.includes("pinia")) {
    template = compile(vueMainTs, { router: true, pinia: true });
  } else if (dependencies.includes("vue-router")) {
    template = compile(vueMainTs, { router: true });
  } else if (dependencies.includes("pinia")) {
    template = compile(vueMainTs, { pinia: true });
  } else {
    template = compile(vueMainTs);
  }
  fsWriteTempalte(`./${projectName}/src/main.ts`, template);
}
export function handleVue({ projectName, dependencies }) {
  return new Promise((resolve, reject) => {
    copyDir(`../templates/Vue`, `./${projectName}`);
    handleVuePackageJson(projectName, dependencies);
    handleVueTemplateFiles(projectName, dependencies);
    handleViteTemplate(projectName, "Vue", dependencies.includes("tailwindcss"));
    resolve();
  });
}
export function handleNext({ projectName }) {
  return new Promise((resolve, reject) => {
    copyDir(`../templates/Next`, `./${projectName}`);
    const packageJson = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), `./${projectName}/package.json`), "utf8"));
    packageJson.name = projectName;
    fsWriteTempalte(`./${projectName}/package.json`, JSON.stringify(packageJson, null, 2));
    resolve();
  });
}
export function handleNest({ projectName }) {
  return new Promise((resolve, reject) => {
    copyDir(`../templates/Nest`, `./${projectName}`);
    const packageJson = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), `./${projectName}/package.json`), "utf8"));
    packageJson.name = projectName;
    fsWriteTempalte(`./${projectName}/package.json`, JSON.stringify(packageJson, null, 2));
    resolve();
  });
}
