import * as cdk from 'aws-cdk-lib';
import * as pipelines from 'aws-cdk-lib/pipelines';
import { ManualApprovalStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { RestApiStack } from './rest-api-stack';

const stages = [
  { stage: 'dev', account: '981237193288', manualApproval: false } as const,
  // { stage: 'prod', account: '...', manualApproval: true } as const,
];

export class PipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new pipelines.CodePipeline(this, 'Pipeline', {
      // crossAccountKeys: true,
      synth: new pipelines.ShellStep('Synth', {
        input: pipelines.CodePipelineSource.gitHub(
          'mmuller88/cdk-pipeline',
          'main',
        ),
        commands: ['yarn install', 'yarn synth'],
      }),
    });

    // Add stages
    stages.forEach((stageInfo) => {
      const stage = new BackendStage(this, stageInfo.stage, {
        env: {
          account: stageInfo.account,
          region: 'us-east-1',
        },
        stage: stageInfo.stage,
      });
      if (stageInfo.manualApproval) {
        pipeline.addStage(stage, {
          stackSteps: [
            {
              stack: stage.backendStack,
              changeSet: [new ManualApprovalStep('approve')],
            },
          ],
        });
      } else {
        pipeline.addStage(stage);
      }
    });
  }
}

interface BackendStageProps extends cdk.StageProps {
  stage: 'prod' | 'dev';
}

class BackendStage extends cdk.Stage {
  readonly backendStack;

  constructor(scope: Construct, id: string, props: BackendStageProps) {
    super(scope, id, props);

    this.backendStack = new RestApiStack(this, 'RestApiStack', {
      stage: props.stage,
    });
  }
}
