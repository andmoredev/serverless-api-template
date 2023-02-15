# SAM Serverless API Template

This is my very opinionated template to setup a serverless REST API that uses API Gateway, Lambda and DynamoDB.

## Requirements
* AWS SAM CLI

## Usage
> Root project folder will be created by the template.

Run the following command and follow the prompts:  
```
sam init --location https://github.com/andmoredev/serverless-api-template
```

### Prompt Details
* outputDir - this is the directory where the project will be created.
* service_name - Used for each templates description
* dynamodb_table_name - Name to be defaulted for the DynamoDB Table in the SAM template.