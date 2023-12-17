import inquirer from "inquirer";

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
      choices: ["React", "Vue", "Nest", "Next"],
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
