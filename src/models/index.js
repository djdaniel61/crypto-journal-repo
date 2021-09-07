// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { BybitAPI, Trade, TagTrade, Tag } = initSchema(schema);

export {
  BybitAPI,
  Trade,
  TagTrade,
  Tag
};