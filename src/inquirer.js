import inquirer from "inquirer";
import chalk from "chalk";

export async function selectProjectType() {
  return await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "请输入项目名称",
      default: "my-app",
    },
    {
      type: "list",
      name: "projectType",
      message: "请选择项目类型",
      prefix: chalk.yellow("★"), // 自定义前缀
      choices: [
        chalk.hex("#61dafb")("React"),
        chalk.hex("#00b374")("Vue"),
        chalk.hex("#ed2945")("Nest"),
        "Next",
      ]
    },
  ]);
}
export async function selectReactInfo() {
  return await inquirer.prompt([
    {
      // 多选
      type: "checkbox",
      name: "dependencies",
      message: "请选择依赖",
      choices: [
        { name: "axios" },
        { name: "react-router-dom" },
        { name: "antd" },
        { name: "react-redux" },
        { name: "@ant-design/icons" },
        { name: "tailwindcss" },
        { name: "dayjs" },
        { name: "classnames" },
      ],
    },
  ]);
}
export async function selectVueInfo() {
  return await inquirer.prompt([
    {
      // 多选
      type: "checkbox",
      name: "dependencies",
      message: "请选择依赖",
      choices: [
        { name: "axios" },
        { name: "tailwindcss" },
        { name: "dayjs" },
        { name: "vue-router" },
        // { name: "element-plus" },
        { name: "pinia" },
      ],
    },
  ]);
}
export async function selectNestInfo() {
  return await inquirer.prompt([
    {
      type: "confirm",
      name: "cookieGuard",
      message: "是否需要cookieGuard",
      default: false,
      active: "yes",
      inactive: "no",
    },
    {
      type: "confirm",
      name: "userCRUD",
      message: "是否需要crud示例",
      default: false,
      active: "yes",
      inactive: "no",
    },
    {
      type: "confirm",
      name: "validFilter",
      message: "是否需要参数校验过滤器",
      default: false,
      active: "yes",
      inactive: "no",
    },
  ]);
}