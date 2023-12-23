import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import copydir from "copy-dir";
import { exec, execSync } from "child_process";
import util from "util";
import ora from "ora";
import Handlebars from "handlebars";
import { reactAppTsx, viteConfigTs, tailwindcss, vueAppTsx, vueHooks, vueMainTs, reactHooks, reactPackageJson, vuePackageJson } from "./templates.js";
import { reactDependencies, vueDependencies } from "./common.js";
const spinner = ora("下载中...");
const execPromisr = util.promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function installDependencies(projectName) {
  spinner.start("正在按装依赖...");
  // await execPromisr(`cd ${projectName} && yarn`);
  execSync(`cd ${projectName} && yarn`, { stdio: "inherit" });
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
const checkIncludes = (dependencies, dep) => dependencies.includes(dep);

// 处理React模板
function handleReactTemplateFiles(projectName, dependencies) {
  if (dependencies.includes("axios")) {
    copyDir(`../templates/Axios`, `./${projectName}/src/utils`);
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
    const template = compile(reactHooks);
    fsWriteTempalte(`./${projectName}/src/App.tsx`, template);
    copyDir(`../templates/Redux`, `./${projectName}/src/store`);
  }
  const template = compile(reactAppTsx, {
    includeRouter: checkIncludes(dependencies, "react-router-dom"),
    includeRedux: checkIncludes(dependencies, " react-redux"),
    antd: checkIncludes(dependencies, "antd"),
  });
  fsWriteTempalte(`./${projectName}/src/App.tsx`, template.replace(/&#123;/g, "{").replace(/&#125;/g, "}"));
}

// 处理ReactPackageJson模板
function handleReactPackageJson(projectName, dependencies) {
  const template = compile(reactPackageJson, {
    projectName,
    "@ant-design/icons": checkIncludes(dependencies, "@ant-design/icons"),
    antd: checkIncludes(dependencies, "antd"),
    tailwindcss: checkIncludes(dependencies, "tailwindcss"),
    axios: checkIncludes(dependencies, "axios"),
    dayjs: checkIncludes(dependencies, "dayjs"),
    "react-redux": checkIncludes(dependencies, "react-redux"),
    classnames: checkIncludes(dependencies, "classnames"),
    husky: checkIncludes(dependencies, "husky"),
    "react-router-dom": checkIncludes(dependencies, "react-router-dom"),
  });
  fsWriteTempalte(`./${projectName}/package.json`, template);
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
  const template = compile(vuePackageJson, {
    projectName,
    tailwindcss: checkIncludes(dependencies, "tailwindcss"),
    axios: checkIncludes(dependencies, "axios"),
    dayjs: checkIncludes(dependencies, "dayjs"),
    pinia: checkIncludes(dependencies, "react-redux"),
    husky: checkIncludes(dependencies, "husky"),
    "vue-router": checkIncludes(dependencies, "vue-router"),
  });
  fsWriteTempalte(`./${projectName}/package.json`, template);
}
// 处理Vue模板
function handleVueTemplateFiles(projectName, dependencies) {
  if (dependencies.includes("axios")) {
    copyDir(`../templates/Axios`, `./${projectName}/src/utils`);
  }
  if (dependencies.includes("tailwindcss")) {
    const template = compile(tailwindcss);
    fsWriteTempalte(`./${projectName}/src/index.css`, template);
    copyDir(`../templates/Tailwind`, `./${projectName}`);
  }
  if (dependencies.includes("vue-router")) {
    copyDir(`../templates/Vue-Router`, `./${projectName}/src/router`);
  }
  if (dependencies.includes("pinia")) {
    copyDir(`../templates/Pinia`, `./${projectName}/src/store`);
    const hookTemplate = compile(vueHooks);
    fsWriteTempalte(`./${projectName}/src/hooks/useCount.ts`, hookTemplate);
  }
  const apptsxTemplate = compile(vueAppTsx, { router: checkIncludes(dependencies, "vue-router") });
  fsWriteTempalte(`./${projectName}/src/App.tsx`, apptsxTemplate);
  const template = compile(vueMainTs, { router: checkIncludes(dependencies, "vue-router"), pinia: checkIncludes(dependencies, "pinia") });
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
export function handleElectronReact({ projectName }) {
  return new Promise((resolve, reject) => {
    copyDir(`../templates/Electron-React`, `./${projectName}`);
    const packageJson = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), `./${projectName}/package.json`), "utf8"));
    packageJson.name = projectName;
    fsWriteTempalte(`./${projectName}/package.json`, JSON.stringify(packageJson, null, 2));
    resolve();
  });
}
export function handleElectronVue({ projectName }) {
  return new Promise((resolve, reject) => {
    copyDir(`../templates/Electron-Vue`, `./${projectName}`);
    const packageJson = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), `./${projectName}/package.json`), "utf8"));
    packageJson.name = projectName;
    fsWriteTempalte(`./${projectName}/package.json`, JSON.stringify(packageJson, null, 2));
    resolve();
  });
}
