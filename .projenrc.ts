import { awscdk } from 'projen';
import { TrailingComma } from 'projen/lib/javascript';
const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.101.0',
  defaultReleaseBranch: 'main',
  name: 'cdk-pipeline',
  projenrcTs: true,

  eslint: true,
  prettier: true,
  prettierOptions: {
    settings: {
      singleQuote: true,
      trailingComma: TrailingComma.ALL,
    },
  },

  deps: ['aws-lambda'] /* Runtime dependencies of this module. */,
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});

project.setScript('cdk', 'cdk');
project.setScript('tsc', 'tsc');

project.synth();
