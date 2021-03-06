#!/usr/bin/env node
"use strict";
const chalk = require("chalk"),
  link = require("terminal-link"),
  terminalImg = require("terminal-image"),
  got = require("got"),
  wordWrap = require("word-wrap"),
  inquirer = require("inquirer"),
  open = require("open"),
  resume = require("./resume.json"),
  IMG_LINK = "https://avatars0.githubusercontent.com/u/17708157?s=600&v=4",
  { yellow } = chalk,
  options = {
    type: "list",
    name: "resumeOptions",
    message: "What would you like to know?",
    choices: [...Object.keys(resume), "See you!"],
  };

async function showResume() {
  console.log("Hi there 👋  my name's Aakash and welcome to my resume !!!");
  await showImage();
}

async function showImage() {
  got(IMG_LINK, { responseType: "buffer" })
    .then((image) => terminalImg.buffer(image.body, { width: "34%" }))
    .then((image) => {
      console.log(image);
      showBasicInfo();
      handleResume();
    });
}

function showBasicInfo() {
  console.log(
    wordWrap(
      `
Hello, this is ${chalk.blue.bold("Aakash Pahuja")}!

I'm a passionate ${chalk.bgRed.white.bold(
        "software engineer"
      )} based in ${chalk.bold("Bangalore, India")}, working for ${link(
        chalk.hex("#3858A2").bold("Samsung R&D"),
        "https://samsung.com"
      )}.
I ${chalk.bold("created a portfolio")} about ${chalk.underline.bold.yellow(
        "myself"
      )} that can be found by visiting ${link(
        chalk.hex("#3858A2").bold("here"),
        "https://www.aakashpahuja.com"
      )}.
I love being part of development of web technologies. I like to ${chalk.bold(
        "design and build web apps"
      )}.
I love ${chalk.underline.bold.green(
        "open source development"
      )} and I build things on my GitHub profile ${link(
        chalk.red.bold("github.com/dgr8akki"),
        "https://github.com/dgr8akki"
      )}.
I love ${chalk.bold.yellow("JavaScript")} and ${chalk.bold.red("Java")}.

`.trim(),
      { width: 200, trim: true }
    )
  );
  console.log("\n\n");
}

function handleResume() {
  inquirer
    .prompt(options)
    .then((answer) => {
      if (answer.resumeOptions == "See you!") {
        console.log(yellow("Thank you for your time!"));
        return;
      }
      console.log(JSON.stringify(answer));
      if (answer.resumeOptions == "Links 🤙") {
        handleLinks();
      } else {
        const option = resume[`${answer.resumeOptions}`];

        if (option) {
          console.log(yellow(new inquirer.Separator()));
          option.forEach((info) => {
            console.log(yellow("|   => " + info));
          });
          console.log(yellow(new inquirer.Separator()));
        }
      }

      inquirer
        .prompt({
          type: "list",
          name: "exitBack",
          message: "Go back or Exit?",
          choices: ["Back", "Exit"],
        })
        .then((choice) => {
          if (choice.exitBack == "Back") {
            handleResume();
          } else {
            console.log(yellow("Thank you for your time!"));
            return;
          }
        });
    })
    .catch((err) => console.log("Ooops,", err));
}

function handleLinks() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Do you want to learn more about me?",
        name: "open",
        choices: [
          {
            name: chalk.gray(
              `💻  What am I doing about Open Source? (${chalk.bold("GitHub")})`
            ),
            value: "https://github.com/dgr8akki",
          },
          {
            name: chalk.cyan(`🐦  What do I think? (${chalk.bold("Twitter")})`),
            value: "https://twitter.com/ImAakashPahuja",
          },
          {
            name: chalk.blue(
              `🏹  Curriculum vitae, the path of my life (${chalk.bold(
                "LinkedIn"
              )})`
            ),
            value: "https://linkedin.com/in/dgr8akki",
          },
          { name: chalk.red("👋  Nope. Bye.\n"), value: false },
        ],
      },
    ])
    .then((val) => {
      open(val);
      process.exit();
    })
    .catch(function () {});
}

showResume();
