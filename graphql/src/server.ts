import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import 'express-async-errors';

import typeDefs from './schema';

const server = new ApolloServer({
	typeDefs,
	resolvers: {},  // Ensure you have resolvers
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
