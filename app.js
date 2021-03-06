const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employeeList = [];
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const managerQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is the team manager's name?"
  },
  {
    type: "input",
    name: "id",
    message: "What is the team manager's employee ID?"
  },
  {
    type: "input",
    name: "email",
    message: "What is the team manager's email address?"
  },
  {
    type: "input",
    name: "office",
    message: "What is the team manager's office number?"
  }
];

const employeeTypeQuestion = {
    type: "list",
    name: "employeeType",
    message: "What type of employee do you want to add? (select Done when finished adding)",
    choices: ["Engineer", "Intern", "Done"]
};

const engineerQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is the engineer's name?"
  },
  {
    type: "input",
    name: "id",
    message: "What is the engineer's employee ID?"
  },
  {
    type: "input",
    name: "email",
    message: "What is the engineer's email address?"
  },
  {
    type: "input",
    name: "github",
    message: "What is the engineer's GitHub username?"
  }
];

const internQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is the intern's name?"
  },
  {
    type: "input",
    name: "id",
    message: "What is the intern's employee ID?"
  },
  {
    type: "input",
    name: "email",
    message: "What is the intern's email address?"
  },
  {
    type: "input",
    name: "school",
    message: "What is the intern's school?"
  }
];

function startQuestions(){
  inquirer.prompt(managerQuestions).then((answers) => {
    employeeList.push(new Manager(answers.name, answers.id, answers.email, answers.office));
    addEmployee();
  })
  
}

function addEmployee(){
  inquirer.prompt(employeeTypeQuestion).then((answers) => {
    switch(answers.employeeType){
      case "Engineer":
        engineerPrompts();
        break;
      case "Intern":
        internPrompts();
        break;
      default:
        createPage();
        break;
    }
  })
}

function engineerPrompts(){
  inquirer.prompt(engineerQuestions).then((answers) => {
    employeeList.push( new Engineer(answers.name, answers.id, answers.email, answers.github) );
    addEmployee();
  });
  
}

function internPrompts(){
  inquirer.prompt(internQuestions).then((answers) => {
    employeeList.push( new Intern(answers.name, answers.id, answers.email, answers.school) );
    addEmployee();
  });
  
}

function createPage(){
  
  const renderedHtml = render(employeeList);

  if(!fs.existsSync(OUTPUT_DIR)){
    fs.mkdirSync(OUTPUT_DIR);
  }

  fs.writeFile(outputPath, renderedHtml, err => {
    if(err){
      console.error(err)
    }
  });
}

startQuestions();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
