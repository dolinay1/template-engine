const fs = require('fs');
const inquirer = require('inquirer');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');

// const OUTPUT_DIR = path.resolve(__dirname, "output");
// const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeeList = [];

// this function prompts the user with a series of questions in order to decide what the input will be
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
                message: "Select your company role.",
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
    // here we set a variable named prompting to true, in order to check if the prompt is still running using while
        let Prompting = true;
        while (Prompting) {
    // using destructing to set name, email, id and role to the answers variable
            const answers = await promptQuestions();
            const { name, email, id, role } = answers;
        // create switch statements for each "role"
            switch (role) {
                case "Manager":
                    const officeRes = await inquirer.prompt(
                        {
                            type: "input",
                            message: "Enter your office number.",
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
                            message: "Enter your github username.",
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
                            message: "Enter your school name.",
                            name: "school"
                        })

                    const { school } = schoolRes
                    const intern = new Intern(name, email, id, school);
                    employeeList.push(intern);
                    break;
            }
            // prompt user if they want to add another empolyee
            const addEmployee = await inquirer.prompt({
                type: "list",
                message: "Would you like to add more employees?",
                name: "add",
                choices: [
                    "Yes",
                    "No"
                ]
            })
            // if the user selects no, the Prompting variable is set to false and the sequence ends
            if (addEmployee.add === "No") {
                Prompting = false;
            }
        }
        // write the html file to the ouput folder by rending the employeList array
        await writeFileAsync("./output/team.html", render(employeeList), 'utf-8');
    }

    catch (err) {
        console.log(err)
    }
}
createEmployeeList();