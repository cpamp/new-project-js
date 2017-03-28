# new-project-js

Install with `npm i -g new-project-js`  

Create new Nodejs projects faster with new-project-js.  
new-project-js will create a git repository, add an origin if provided, create an NPM package.json, install typescript if prompted to do so (along with a tsconfig.json), create a README.md and .gitignore, and finally add all the files to the repository and make your initial commit.

## Usage

`jsproj`

### Arguments

`--typescript`, `-t`  
Indicate that this is a Typescript project.  

`--ts-update`, `-u`  
Indicate that this is a Typescript project and update Typescript if detected

`--repository=<My_Repo>`  
Provide a remote repository.  