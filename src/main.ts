import { App } from 'aws-cdk-lib';
import { PipelineStack } from './pipeline-stack';

const devEnv = {
  account: '981237193288',
  region: 'us-east-1',
};

const app = new App();

new PipelineStack(app, 'restapi-pipeline', { env: devEnv });

app.synth();
