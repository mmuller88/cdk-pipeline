import * as core from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambdajs from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

export interface RestApiStackProps extends core.StackProps {
  stage: 'dev' | 'prod';
}

export class RestApiStack extends core.Stack {
  constructor(scope: Construct, id: string, props: RestApiStackProps) {
    super(scope, id, props);

    const restApi = new apigateway.RestApi(this, 'RestApi', {
      restApiName: `RestApi-${props.stage}`,
    });

    const helloLambda = new lambdajs.NodejsFunction(this, 'lambda');

    restApi.root
      .addResource('hello')
      .addMethod('GET', new apigateway.LambdaIntegration(helloLambda));
  }
}
