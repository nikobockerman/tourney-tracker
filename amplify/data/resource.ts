import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Match: a
    .model({
      teamHome: a.string().required(),
      teamAway: a.string().required(),
      startTime: a.datetime()
    })
    .authorization((allow) => [allow.owner().to(['create', 'read', 'update', 'delete'])]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
