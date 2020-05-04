// const Manager = require("./lib/Manager");
// const Engineer = require("./lib/Engineer");
// const Intern = require("./lib/Intern");
// const inquirer = require("inquirer");
// const path = require("path");
// const fs = require("fs");

// const OUTPUT_DIR = path.resolve(__dirname, "output");
// const outputPath = path.join(OUTPUT_DIR, "team.html");

// const render = require("./lib/htmlRenderer");


// // Write code to use inquirer to gather information about the development team members,
// // and to create objects for each team member (using the correct classes as blueprints!)

// const writeFileAsync = util.promisify(fs.writeFile);

// function promptUser() {
//   return inquirer.prompt([
//     {
//       type: "input",
//       name: "github",
//       message: "Provide your Github username:"
//     },
//     {
//       type: "input",
//       name: "email",
//       message: "Provide your email:"
//     },
//     {
//       type: "input",
//       name: "title",
//       message: "What is your project title? (Use hyphens to seperate each word.)"
//     },
//     {
//       type: "input",
//       name: "description",
//       message: "Describe your project:"
//     },
//     {
//       type: "input",
//       name: "installation",
//       message: "Describe what command the user must run to install dependencies:"
//     },
//     {
//       type: "input",
//       name: "tests",
//       message: "Describe what command the user must run to run tests:"
//     },
//     {
//       type: "list",
//       name: "license",
//       message: "Choose the license you would like to use:",
//       choices: ["MIT", "APACHE", "GPL"]
//     },
//     {
//       type: "input",
//       name: "contributing",
//       message: "Describe how the user may contribute to this repo:"
//     },
//     {
//       type: "input",
//       name: "usage",
//       message: "Describe what the user needs to know about using the repo:"
//     },
//     {
//       type: "input",
//       name: "picture",
//       message: "Add your github profile picture by pasting the url here. (Check your github public profile for the url):"
//     }
//   ]);
// }

// async function init() {
//   console.log("hi")
//   try {
//     const data = await promptUser();

//     const markdown = generateMarkdown(data);

//     await writeFileAsync("README.md", markdown);

//     console.log("Successfully wrote Readme");
//   } catch(err) {
//     console.log(err);
//   }
// }

// init();

// function generateMarkdown(data) {
//   return `

// # Project Title
// ${data.title}



// ## Table of Contents

// * [Description](#description)

// * [Installation](#installation)

// * [Tests](#tests)

// * [License](#license)

// * [Contributing](#contributing)

// * [Usage](#usage information)

// * [Contact](#contact)




// # Description
// ${data.description}



// # Installation
// To install all dependencies run: ${data.installation}.



// # Tests

// To run tests for repository run: ${data.tests}.



// # License
// This repository uses a ${data.license} license.



// # Contributing
// ${data.contributing}



// # Usage
// ${data.usage}



// # Contact
// Questions about the repo or project? Contact at	https://github.com/${data.github} or directly by email at ${data.email}.

// [![GitHub followers](https://img.shields.io/github/followers/${data.github}?style=social)](https://github.com/${data.github})

// [![GitHub commit activity](https://img.shields.io/github/commit-activity/m/${data.github}/${data.title})](https://github.com/${data.github}/${data.title}/commits/master)

// ![Profile_pic](${data.picture})

// `;
// }

// module.exports = generateMarkdown;


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



const fs = require('fs');
const inquirer = require('inquirer');
const util = require('util');
const ejs = require('ejs');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');

// const OUTPUT_DIR = path.resolve(__dirname, "output");
// const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeeList = [];

function promptQuestions() {
    return inquirer
        .prompt([
            {
                type: "input",
                message: "Enter your name.",
                name: "name"
            },
            {
                type: "input",
                message: "Enter your ID.",
                name: "id"
            },
            {
                type: "input",
                message: "Enter your email address.",
                name: "email"
            },
            {
                type: "list",
                message: "Select you company role.",
                name: "role",
                choices: [
                    "Manager",
                    "Engineer",
                    "Intern"
                ]
            }
        ])
}

async function createEmployeeList() {
    try {
        let continuePrompting = true;
        while (continuePrompting) {
            const answers = await promptQuestions();
            const { name, email, id, role } = answers;
            switch (role) {
                case "Manager":
                    const officeRes = await inquirer.prompt(
                        {
                            type: "input",
                            message: "What is your office number?",
                            name: "office"
                        })
                    const { office } = officeRes;
                    const manager = new Manager(name, email, id, office);
                    employeeList.push(manager);
                    break;
                case "Engineer":
                    const githubRes = await inquirer.prompt(
                        {
                            type: "input",
                            message: "What is your github username?",
                            name: "github"
                        })
                    const { github } = githubRes;
                    const engineer = new Engineer(name, email, id, github);
                    employeeList.push(engineer);
                    break;
                case "Intern":
                    const schoolRes = await inquirer.prompt(
                        {
                            type: "input",
                            message: "What is your school name?",
                            name: "school"
                        })
                    const { school } = schoolRes
                    const intern = new Intern(name, email, id, school);
                    employeeList.push(intern);
                    break;
            }

            const addEmployee = await inquirer.prompt({
                type: "list",
                message: "Would you like to add more employees?",
                name: "add",
                choices: [
                    "yes",
                    "no"
                ]
            })
            if (addEmployee.add === "no") {
                continuePrompting = false;
            }
        }

        // const finalHTML = await ejs.renderFile("./templates/main.html", { employeeList });
        await writeFileAsync("./output/team.html", render(employeeList), 'utf-8');
    }

    catch (err) {
        console.log(err)
    }
}
createEmployeeList();