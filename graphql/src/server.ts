import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import 'express-async-errors';
import fs from "fs";
import path from "path";
import morgan from "morgan";
import logger from "./utils/logger";
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

// Ensure the logs directory exists
const logDirectory = path.join(__dirname, "../logs");
if (!fs.existsSync(logDirectory)) {
	fs.mkdirSync(logDirectory);
}
// Setup HTTP request logging with Morgan
const accessLogStream = fs.createWriteStream(path.join(logDirectory, "access.log"), { flags: "a" });
app.use(morgan("combined", { stream: accessLogStream }));
app.use(morgan("combined", {
	stream: { write: (message) => logger.info(message.trim()) }
}));

(async () => {
    await server.start();
    server.applyMiddleware({app});
})();

/******************************************************************************
                                Export default
 ******************************************************************************/

export default app;
