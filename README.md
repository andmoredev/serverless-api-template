# SAM Serverless API Template

This is a my very opinionated template to setup a serverless REST API that uses API Gateway, Lambda, Step Functions and DynamoDB as shown in the diagram below.

## Requirements
* AWS SAM CLI

## Usage
> Root project folder will be created by the template.

Run the following command and follow the prompts:  
```
sam init --location https://github.com/andmoredev/serverless-api-template
```

### Prompt Details
* outputDir - this is will the directory where the project will be created.
* service_name - Used for each templates description
* dynamodb_table_name - Name to be defaulted for the DynamoDB Table in the SAM template.

## Folder Structure
```
project
├── functions
|   ├── function1
|   |   index.js
|   |   package.json
|   |   ├── tests
|   |   |  index.tests.js
|   |   |   
|   ├──  function2
|   |   index.js
|   |   package.json
|   |   ├── tests
|   |   |  index.tests.js
|   |   |   
├── layers
|   ├── lambda-power-tools-utils
|   |   lambda-power-tools-utils.js
|   |   package.json
|   ├── dynamodb
|   |   package.json
├── portman
├── tools
├── workflows
|   |   test-step-function1.asl.json
|   |   test-step-function2.asl.json
│   .eslintignore
│   .eslintrc.json  
|   .gitignore
|   .spectral.yaml
|   jsonconfig.json
|   openapi.yaml
|   package.json
|   README.md
|   template-api.yaml
|   template-dynamodb.yaml
```
### Structure Highlighs
#### **Functions**
Every function handler is contained within it's own folder. This contains all the code necessary to execute the function, it's unit tests and it's own package.json to import any dependencies that are only used for this function.  
The benefits of this structure are:
* Deployed package is kept small since only contains code and modules related to this function.
* Function code will be viewable from the console

The one thing that becomes more complicated with this is that if the same package is imported for multiple functions, the package version management becomes more complicated. This can be avoided by using something like dependabot.