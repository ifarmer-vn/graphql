import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import 'express-async-errors';

import typeDefs from './schema';
import resolvers from "@src/resolvers";

const server = new ApolloServer({
	typeDefs,
	resolvers: resolvers,  // Ensure you have resolvers
});

/******************************************************************************
                                Variables
 ******************************************************************************/
const app = express();
(async () => {
    await server.start();
    server.applyMiddleware({app});
})();

/******************************************************************************
                                Export default
 ******************************************************************************/

export default app;
