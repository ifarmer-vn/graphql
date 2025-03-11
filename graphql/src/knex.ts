import knex from 'knex';

export const db = knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'your_user',
    password: 'your_password',
    database: 'your_database',
  },
});
