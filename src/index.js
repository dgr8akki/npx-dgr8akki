#!/usr/bin/env node
"use strict";
let isSecondStepOpened = false;
const { chalk, inquirer, open, resume } = require("./modules"),
  { getOptions } = require("../utils"),
  { showImage, showBack } = require("./core"),
  { yellow, blue, bold, red, gray, cyan } = chalk;
const {renderEducation, renderExperience, renderSkills} = require("./renderer");
async function showResume() {
  console.log(
    "Hi there!!! 👋 This is Aakash Pahuja and I welcome you all to have a look at my resume !!! \n"
  );
  await showImage(() => handleResume());
}

function handleResume() {
  inquirer
    .prompt(getOptions(isSecondStepOpened))
    .then(ans => ans.resumeOptions)
    .then(answer => {
      switch (answer) {
        case "Back":
          isSecondStepOpened = false;
          handleResume();
          break;
        case "See you!":
          console.log(yellow("Thank you for your time!"));
          return;
        case "Links 🤙":
          handleLinks();
          break;
        case "Education 📚":
          isSecondStepOpened = true;
          renderEducation(resume[answer]);
          showBack(() => handleResume());
          break;
        case "Tech Stack 💻":
          isSecondStepOpened = true;
          renderSkills(resume[answer]);
          showBack(() => handleResume());
          break;
        case "Past Experience 🧪":
          isSecondStepOpened = true;
          renderExperience(resume[answer]);
          showBack(() => handleResume());
          break;
        default:
          isSecondStepOpened = true;
          const option = resume[answer];
          if (option) {
            console.log(yellow(new inquirer.Separator()));
            option.forEach(info => {
              console.log(yellow("|   => " + info));
            });
            console.log(yellow(new inquirer.Separator()));
          }
          showBack(() => handleResume());
          break;
      }
    })
    .catch(err => console.log("Ooops,", err));
}

function handleLinks() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Here are some important links for you",
        name: "open",
        choices: [
          {
            name: gray(
              `💻  What am I doing about Open Source? (${bold("GitHub")})`
            ),
            value: "https://github.com/dgr8akki",
          },
          {
            name: cyan(`🐦  What do I think? (${bold("Twitter")})`),
            value: "https://twitter.com/ImAakashPahuja",
          },
          {
            name: blue(
              `🏹  Curriculum vitae, the path of my life (${bold("LinkedIn")})`
            ),
            value: "https://linkedin.com/in/dgr8akki",
          },
          { name: red("👋  Nope. Take me Back !!!.\n"), value: "Back" },
        ],
      },
    ])
    .then(val => val.open)
    .then(url => {
      if (url !== "Back")
        open(url);
      isSecondStepOpened = false;
      handleResume();
    })
    .catch(function () { });
}

showResume();
