import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Match: a
    .model({
      startTime: a.datetime(),
      teamAway: a.string().required(),
      teamHome: a.string().required(),
    })
    .authorization((allow) => [allow.owner().to(['create', 'read', 'update', 'delete'])]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
  schema,
});
