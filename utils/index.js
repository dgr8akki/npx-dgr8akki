const resume = require("../data/resume.json");

const getOptions = isSecondStepOpened => {
  const choicesForMains = [...Object.keys(resume)];
  if (isSecondStepOpened) choicesForMains.push("Back");
  choicesForMains.push("See you!");
  return {
    type: "list",
    name: "resumeOptions",
    message: "What would you like to know?",
    choices: choicesForMains,
  };
};

module.exports = {
  getOptions
};
