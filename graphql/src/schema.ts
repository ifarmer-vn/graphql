import { readFileSync } from 'fs';
import { gql } from 'graphql-tag';

// Read schema from file
const typeDefs = gql(readFileSync('src/schema/schema.graphql', 'utf8'));

export default typeDefs;
