# Basic Lambda

```yaml
BasicLambda:
  Type: AWS::Serverless::Function
  Properties:
    CodeUri: functions/test-function
```

This produces the *AWSLambdaBasicExecutionRole* that allows a Lambda to CreateLogGroup, CreteLogStream and PutLogEvents to any resource

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            "Resource": "*"
        }
    ]
}
```

# Basic Lambda with Tracing
* What Basic Lambda has plus below

This creates a AWSWrayWriteOnlyAccess again with Resource set to *

```yaml
BasicLambdaWithTracing:
    Type: AWS::Serverless::Function
    Properties:
      Tracing: Active
      CodeUri: functions/test-function
```

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "xray:PutTraceSegments",
                "xray:PutTelemetryRecords",
                "xray:GetSamplingRules",
                "xray:GetSamplingTargets",
                "xray:GetSamplingStatisticSummaries"
            ],
            "Resource": [
                "*"
            ]
        }
    ]
}
```

# Basic Lambda with API Gateway Event
* What Basic Lambda with Tracing has plus below

This creates a Lambda Resource Permission instead of a role

```yaml
BasicLambdaWithAPI:
    Type: AWS::Serverless::Function
    Properties:
      Tracing: Active
      CodeUri: functions/test-function
      Events:
        TestEvent:
          Type: Api
          Properties:
            Path: /tests
            Method: POST
```

Creates a Resource-based policy statement for API Gateway to be able to invoke that lambda function for this specific
![APIPermission](is-it-polp-simple-lambda-api-permissions.jpg)

Which I'm assuming looks something like this
```json
{
    "Effect": "Allow",
    "Principal": {
      "Service": "apigateway.amazonaws.com",
    },
    "Action": [
        "lambda:InvokeFunction"
    ],
    "Condition" : {
      "ArnLike": {
        "AWS:SourceArn": "arn:aws:execute-api:us-east-1:354828244626:ar4xtq6zy5/*/POST/tests"
      }
    }
}
```

# Basic Lambda with SQS Event
* What Basic Lambda with Tracing has plus below

This creates a AWSLambdaSQSQueueExecutionRole again with Resource set to *

```yaml
BasicLambdaWithQueueEvent:
  Type: AWS::Serverless::Function
  Properties:
    Tracing: Active
    CodeUri: functions/test-function
    Events:
      TestEvent:
        Type: SQS
        Properties:
          Queue: !GetAtt TestQueue.Arn
```

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "sqs:ReceiveMessage",
                "sqs:DeleteMessage",
                "sqs:GetQueueAttributes",
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            "Resource": "*"
        }
    ]
}
```