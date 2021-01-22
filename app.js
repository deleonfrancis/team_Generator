const Manager = require("./lib/Manager");
const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { Z_FILTERED } = require("zlib");

// Variable that writes the team.html file
const writeTeamHTML = util.promisify(fs.writeFile);

// arrays that holds team members.
const membersOfYourTeam = [];

function start() {
  // function to create the manager and ask questions
  function createTheManager() {
    console.log("Build your team!");
    inquirer
      .prompt([
        {
          type: "input",
          name: "nameManager",
          message: "What is the name for your Manager?",
          //   Check for an input
          validate: function (name) {
            if (!name) {
              console.log("     ...Please enter a name");
              return false;
            } else {
              return true;
            }
          },
        },
        {
          type: "input",
          name: "idManager",
          message: "What is your Manager's I.D.?",
        },
        {
          type: "input",
          name: "emailManager",
          message: "What is your Manager's email address?",

          //   Email Validate
          validate: function (email) {
            valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

            if (valid) {
              console.log("      valid email");
              return true;
            } else {
              console.log(".  Please enter a valid email address.");
              return false;
            }
          },
        },
        {
          type: "input",
          name: "officeManager",
          message: "What your Manager's office number?",
        },
        {
          type: "list",
          name: "moreEmployees",
          message: "Which type of team member would you like to add?",
          choices: [
            "Manager",
            "Engineer",
            "Intern",
            "I don't want to add another employee.",
          ],
          default: "I don't want to add another employee.",
        },
      ])
      .then((answers) => {
        // check for more employees answer and prompt to build that employee.
        switch (answers.moreEmployees) {
          case "Manager":
            createTheManager();
            break;

          case "Engineer":
            createTheEngineer();
            break;

          case "Intern":
            createTheIntern();
            break;

          default:
            writeTeamHTML(outputPath, render(membersOfYourTeam));
            break;
        }
        const manager = new Manager(
          answers.nameManager,
          answers.idManager,
          answers.emailManager,
          answers.officeManager
        );
        console.log(manager);
        membersOfYourTeam.push(manager); // puts the object into the array
        // console.log(membersOfYourTeam);
        writeTeamHTML(outputPath, render(membersOfYourTeam)); // creates team.html in output folder and prints code to the page.
      })
      .catch((error) => console.log(error));
  }
  createTheManager();
}

start();

function createTheEngineer() {
  console.log("Let's add your Engineer!");
  inquirer
    .prompt([
      {
        type: "input",
        name: "nameEngineer",
        message: "What is the name for your Engineer?",
      },
      {
        type: "input",
        name: "idEngineer",
        message: "What is your Engineer's I.D.?",
      },
      {
        type: "input",
        name: "emailEngineer",
        message: "What is your Engineer's email address?",
      },
      {
        type: "input",
        name: "gitHubEngineer",
        message: "What your Engineer's gitHub username?",
      },
      {
        type: "list",
        name: "moreEmployees",
        message: "Would you like to add another team member",
        choices: [
          "Manager",
          "Engineer",
          "Intern",
          "I don't want to add another employee.",
        ],
        default: "I don't want to add another employee.",
      },
    ])
    .then((answers) => {
      // check for more employees answer and prompt to build that employee.
      switch (answers.moreEmployees) {
        case "Manager":
          createTheManager();
          break;

        case "Engineer":
          createTheEngineer();
          break;

        case "Intern":
          createTheIntern();
          break;

        default:
          writeTeamHTML(outputPath, render(membersOfYourTeam));
          break;
      }
      const engineer = new Engineer(
        answers.nameEngineer,
        answers.idEngineer,
        answers.emailEngineer,
        answers.gitHubEngineer
      );
      console.log(engineer);
      membersOfYourTeam.push(engineer); // puts the object into the array
      // console.log(membersOfYourTeam);
      writeTeamHTML(outputPath, render(membersOfYourTeam)); // creates team.html in output folder and prints code to the page.
    });
}

function createTheIntern() {
  console.log("Let's add your Intern!");
  inquirer
    .prompt([
      {
        type: "input",
        name: "nameIntern",
        message: "What is the name for your Intern?",
      },
      {
        type: "input",
        name: "idIntern",
        message: "What is your Intern's I.D.?",
      },
      {
        type: "input",
        name: "emailIntern",
        message: "What is your Intern's email address?",
      },
      {
        type: "input",
        name: "schoolIntern",
        message: "What School for your Intern's?",
      },
      {
        type: "list",
        name: "moreEmployees",
        message: "Would you like to add another team member",
        choices: [
          "Manager",
          "Engineer",
          "Intern",
          "I don't want to add another employee.",
        ],
        default: "I don't want to add another employee.",
      },
    ])
    .then((answers) => {
      // check for more employees answer and prompt to build that employee.
      switch (answers.moreEmployees) {
        case "Manager":
          createTheManager();
          break;

        case "Engineer":
          createTheEngineer();
          break;

        case "Intern":
          createTheIntern();
          break;

        default:
          writeTeamHTML(outputPath, render(membersOfYourTeam));
          break;
      }
      const intern = new Engineer(
        answers.nameIntern,
        answers.idIntern,
        answers.emailIntern,
        answers.schoolIntern
      );
      console.log(intern);
      membersOfYourTeam.push(intern); // puts the object into the array
      // console.log(membersOfYourTeam);
      writeTeamHTML(outputPath, render(membersOfYourTeam)); // creates team.html in output folder and prints code to the page.
    });
}
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

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
