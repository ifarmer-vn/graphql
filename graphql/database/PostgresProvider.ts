import { Pool } from "pg";
import { IDatabaseProvider } from "./IDatabaseProvider";
import * as dotenv from "dotenv";

dotenv.config();

export class PostgresProvider implements IDatabaseProvider {
    private pool: Pool;

    constructor() {
        this.pool = new Pool({
            connectionString: process.env.DATABASE_URL,
        });
    }

    async connect() {
        await this.pool.connect();
        console.log("✅ Connected to PostgreSQL");
    }

    async find(collection: string, query: any) {
        const result = await this.pool.query(`SELECT * FROM ${collection} WHERE id = $1`, [query.id]);
        return result.rows;
    }

    async insert(collection: string, data: any) {
        const keys = Object.keys(data).join(",");
        const values = Object.values(data);
        const placeholders = values.map((_, i) => `$${i + 1}`).join(",");

        await this.pool.query(`INSERT INTO ${collection} (${keys}) VALUES (${placeholders})`, values);
    }

    async update(collection: string, query: any, data: any) {
        const updates = Object.keys(data).map((key, i) => `${key} = $${i + 1}`).join(", ");
        const values = [...Object.values(data), query.id];

        await this.pool.query(`UPDATE ${collection} SET ${updates} WHERE id = $${values.length}`, values);
    }

    async delete(collection: string, query: any) {
        await this.pool.query(`DELETE FROM ${collection} WHERE id = $1`, [query.id]);
    }
}
