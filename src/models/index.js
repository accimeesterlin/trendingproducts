// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { NRT, Everi, User } = initSchema(schema);

export {
  NRT,
  Everi,
  User
};