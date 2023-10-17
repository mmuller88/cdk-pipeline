# cdk-pipeline

Deploy a simple AWS ApiGateway.

This project uses [Projen](https://github.com/projen/projen) to manage the project dependencies.

## Bootstrap

```bash
ACCOUNT_DEV_ID=981237193288
yarn cdk bootstrap aws://$ACCOUNT_DEV_ID/us-east-1

ACCOUNT_PROD_ID=386918889505
yarn cdk bootstrap aws://$ACCOUNT_PROD_ID/us-east-1 --trust $ACCOUNT_DEV_ID --trust-for-lookup $ACCOUNT_DEV_ID
```

For deploying the pipeline:

```bash
yarn cdk deploy "restapi-pipeline" --require-approval never
```

For deploying the stack directly. Please don't use if you know what you're doing!

```bash
STAGE=prod
yarn cdk deploy "restapi-pipeline/${STAGE:-dev}/RestApiStack" --require-approval never
```
