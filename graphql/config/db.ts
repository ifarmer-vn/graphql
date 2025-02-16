import { IDatabaseProvider } from "../database/IDatabaseProvider";
import { PostgresProvider } from "../database/PostgresProvider";

const DB_TYPE = process.env.DB_TYPE || "postgres";

let databaseProvider: IDatabaseProvider;

if (DB_TYPE === "postgres") {
    databaseProvider = new PostgresProvider();
} else {
    throw new Error("❌ Invalid DB_TYPE");
}

databaseProvider.connect();

export default databaseProvider;
