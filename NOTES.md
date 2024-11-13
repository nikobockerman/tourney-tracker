# Notes to keep mind during maintenance

## Indirect dependencies added to fulfill broken peer dependency declarations

Note: Peer dependencies of direct dependencies should be specified as direct
dependencies. But these are peer dependencies of direct dependencies only
because they were added as such through .yarnrc.yml to fix broken chains of
peer dependency declarations. Once the packages in the chain fix their
dependency declarations, these may become unnecessary to have as direct
dependencies.

### List of packages:

- @aws-amplify/core
- @aws-sdk/client-cloudformation
- @aws-sdk/client-s3
- @aws-sdk/client-sso-oidc
- @aws-sdk/client-sts
- @types/react
- @types/react-dom
- @typescript-eslint/types
- react
- react-dom
- zod
