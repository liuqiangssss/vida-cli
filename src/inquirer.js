import inquirer from "inquirer";
import chalk from "chalk";
import prompts from "prompts";

export async function selectProjectType() {
  return await prompts([
    {
      type: "text",
      name: "projectName",
      message: "请输入项目名称",
      initial: "my-app",
    },
    {
      type: "select",
      name: "projectType",
      message: "请选择项目类型",
      choices: [{ title: chalk.hex("#61dafb")("React"), value: "React" }, { title: chalk.hex("#00b374")("Vue"), value: "VUe" }, { title: chalk.hex("#ed2945")("Nest"), value: "Nest" }, "Next"],
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
        { name: "husky" },
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
        { name: "husky" },
      ],
    },
  ]);
}
export async function selectNestInfo() {
  return await prompts([
    {
      type: "toggle",
      name: "cookieGuard",
      message: "是否需要cookieGuard",
      initial: true,
      active: "yes",
      inactive: "no",
    },
    {
      type: "toggle",
      name: "userCRUD",
      message: "是否需要crud示例",
      initial: true,
      active: "yes",
      inactive: "no",
    },
    {
      type: "toggle",
      name: "validFilter",
      message: "是否需要参数校验过滤器",
      initial: true,
      active: "yes",
      inactive: "no",
    },
  ]);
}
