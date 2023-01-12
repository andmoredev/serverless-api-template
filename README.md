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
├── portman
├── tools
├── workflows
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