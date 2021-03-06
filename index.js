const fs = require("fs");
const path = require("path");
const Generator = require("yeoman-generator");
/*
生命周期
initializing

prompting

default

writing

conflicts

install

end
*/
class SeaDemoGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }
  prompting() {
    const opts = [
      {
        type: "input",
        name: "appName",
        message: "请输入你的项目名称：",
        default: "sea-demo-dir",
        validate(name) {
          if (!name) return "请输入项目名称";
          if (fs.readdirSync(".").includes(name)) {
            return "目录已存在";
          }
          return true;
        },
      },
      {
        type: "list",
        choices: ["Javascript", "Typescript"],
        name: "language",
        message: "项目语言",
        default: "Javascript",
      },
    ];
    return this.prompt(opts).then(ans => {
      this.ans = ans;
    });
  }
  _copyTpl() {
    // 将所有需要替换值得放到最外侧以_区分
    const { language, appName } = this.ans;
    // copyTpl 会使用模板引擎，替换 <%= appName %>
    // 替换package.json
    this.fs.copyTpl(
      this.templatePath(language, "_package.json"),
      this.destinationPath(appName, "package.json"),
      this.ans
    );
    // 替换app.yaml
    this.fs.copyTpl(
      this.templatePath(language, "./_app.yaml"),
      this.destinationPath(appName, "./config/app.yaml"),
      this.ans
    );
    // 替换index.html
    this.fs.copyTpl(
      this.templatePath(language, "./_index.html"),
      this.destinationPath(appName, "./index.html"),
      this.ans
    );
  }
  writing() {
    const { language, appName } = this.ans;
    // 复制可以替换的模板文件
    this._copyTpl();
    // 复制其余 copy 支持文件/文件夹
    fs.readdirSync(this.templatePath(language))
      .filter(name => {
        return !name.startsWith("_");
      })
      .forEach(item => {
        this.fs.copy(this.templatePath(language, item), this.destinationPath(appName, item));
      });
  }

  install() {
    const projectDir = path.join(process.cwd(), this.ans.appName);
    !this.options["skip-install"] &&
      this.spawnCommandSync("npm", ["install", "--registry=https://registry.npm.taobao.org"], {
        cwd: projectDir,
      });
  }

  end() {
    this.log("创建项目成功!!!");
  }
}

module.exports = SeaDemoGenerator;
