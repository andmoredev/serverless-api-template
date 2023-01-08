# Github Workflow Setup
To have the Github Workflows run successfully we have to create the trust relationship between Github and your AWS account so Github can assume the necessary role to run commands against AWS.

## Set trust relationship

You can manually go through the the [Github documentation to set it up](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services) or we can leverage `sam pipeline` to generate all of this for us.

Run `sam pipeline bootstrap`

Fill in all the data that it requests. When asked for the Role ARNs and the artifact Bucket Name please make sure to check if these things already exist for the account you are deploying to. If so provide the data as it already exists so that it doesn't create these resources again.

Once the execution ends you will get the information of the created resources in the `.aws-sam/pipeline/pipelineconfig.toml` file.

The most important things are the roles and the bucket that you will be using in your CI/CD pipeline.

## Setup Github Workflows
SAM pipelines also provides a way to setup the GitHub workflows and you can use their prebuilt template or use a custom template.

To go through this process you will now need ot run the following command.

```bash
sam pipeline init
```

And if you would like to use my custom generated template you will need to set this as the git url when it requests it
`blah blah blah`
