const { chalk, inquirer } = require("./modules"),
  { yellow, bold } = chalk;

function renderEducation(educations) {
  educations.forEach(({ info, school, duration}) => {
    console.log(yellow(new inquirer.Separator()));
    console.log(yellow(`Studied ${bold(info)} from ${bold(school)} during ${bold(duration)}`));
    console.log(yellow(new inquirer.Separator()));
  });
}

function renderSkills(skills) {
  console.log(yellow(new inquirer.Separator()));
  Object.keys(skills).forEach((key) => {
    console.log(yellow(`${key} : ${bold(skills[key])}`));
  });
  console.log(yellow(new inquirer.Separator()));
}

function renderExperience(experience) {
  console.log(experience);
  experience.forEach(({ position, company, duration, data }) => {
    console.log(yellow(new inquirer.Separator()));
    console.log(yellow(`Position : ${bold(position)}`));
    console.log(yellow(`Company : ${bold(company)}`));
    console.log(yellow(`Duration : ${duration}`));
    console.log(yellow(`More Info: \n`));
    data.forEach(({ responsibilities }) => {
      responsibilities.forEach(res => {
        console.log(yellow(`> ${res}`));
      });
    });
    console.log(yellow(new inquirer.Separator()));
  });
}

module.exports = {
  renderEducation,
  renderSkills,
  renderExperience
};
