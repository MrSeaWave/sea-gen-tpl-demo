// 测试参考 https://github.com/fadehelix/generator-simple-react-component/tree/0c2ce1d9e080895b366e7ceea970a94387a1ae89
const helpers = require("yeoman-test");
const assert = require("yeoman-assert");

describe("build Javascript ", () => {
  beforeEach(() => {
    return helpers
      .run(path.join(__dirname, "./index"))
      .inDir(path.join(__dirname, "tmp"))
      .withPrompts({
        appName:'sea-work-demo',
        language: "Javascript",
      });
  });
  it('创建了文件',()=>{
      const filePath=path.join(__dirname, `tmp/sea-work-demo/index.html`)
      console.log('filePath',filePath)
      assert.file([filePath]);
  })
});
