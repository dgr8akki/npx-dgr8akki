const chalk = require("chalk"),
  inquirer = require("inquirer"),
  open = require("open"),
  resume = require("../data/resume.json");
const wordWrap = require("word-wrap");
const link = require("terminal-link");
const terminalImg = require("terminal-image");
const got = require("got");

module.exports = {
  chalk,
  inquirer,
  open,
  resume,
  wordWrap,
  link,
  terminalImg,
  got
};