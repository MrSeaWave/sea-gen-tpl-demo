// 测试参考 https://github.com/fadehelix/generator-simple-react-component/tree/0c2ce1d9e080895b366e7ceea970a94387a1ae89
const path = require("path");
const helpers = require("yeoman-test");
const assert = require("yeoman-assert");
const rimraf = require('rimraf');

// 有时会有如下错误
//  Error: Timeout of 10000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise,
describe("build Javascript ", () => {
  // beforeEach(async done => {
  //   const result = await helpers
  //     .run(path.join(__dirname, "../index.js"))
  //     .inDir(path.join(__dirname, "tmp"))
  //     .withPrompts({
  //       appName: "sea-work-demo",
  //       language: "Javascript",
  //     });
  // });
  afterEach(() => {
    // 删除文件
    rimraf.sync(path.join(__dirname, "tmp"));
  });
  it("创建了文件", async () => {
    const result = await helpers
      .run(path.join(__dirname, "../index.js"))
      .inDir(path.join(__dirname, "tmp"))
      .withPrompts({
        appName: "sea-work-demo",
        language: "Javascript",
      });
    const filePath = path.join(__dirname, `tmp/sea-work-demo/index.html`);
    assert.file([filePath]);
    // done();
  });
});
