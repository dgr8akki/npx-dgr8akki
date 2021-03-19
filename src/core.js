const {wordWrap, inquirer, chalk, link, terminalImg, got} = require("./modules");
const { blue, bgRed, bold, underline, red } = chalk;
const { IMG_LINK, IMG_WIDTH } = require("./constants");

function showBasicInfo() {
  console.log(
    wordWrap(
      `
Hello, this is ${blue.bold("Aakash Pahuja")}!

I'm a passionate ${bgRed.white.bold("software engineer")} based in ${bold(
        "Bangalore, India"
      )}, working for ${link(
        chalk.hex("#3858A2").bold("Samsung R&D"),
        "https://samsung.com"
      )}.
I ${bold("created a portfolio")} about ${underline.bold.yellow(
        "myself"
      )} that can be found by visiting ${link(
        chalk.hex("#3858A2").bold("aakashpahuja.com"),
        "https://www.aakashpahuja.com"
      )}.
I love being part of development of web technologies. I like to ${bold(
        "design and build web apps"
      )}.
I love ${underline.bold.green(
        "open source development"
      )} and I build things on my GitHub profile ${link(
        red.bold("github.com/dgr8akki"),
        "https://github.com/dgr8akki"
      )}.
I love ${bold.yellow("JavaScript")} and ${bold.red("Java")}.

`.trim(),
      { width: 200, trim: true }
    )
  );
  console.log("\n\n");
}

async function showImage(callback) {
  got(IMG_LINK, { responseType: "buffer" })
    .then(image => terminalImg.buffer(image.body, { width: IMG_WIDTH }))
    .then(image => {
      console.log(image);
      showBasicInfo();
      callback();
    });
}

function showBack(callback) {
  inquirer
    .prompt([
      {
        type: "list",
        message: "",
        name: "Let's move to previous slide",
        choices: ["Back"],
      },
    ])
    .then(val => {
      callback();
    })
    .catch(function () { });
}

module.exports = {
  showBasicInfo,
  showImage,
  showBack
};
