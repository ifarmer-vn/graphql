import db from '../config/db'; // Assuming the correct relative path

const resolvers = {
  Query: {
    users: async () => {
      const users = await db.find('users', {});
      return users;
    },
    user: async (_: never, {id}: { id: string }) => db.find('users', {id}),
  },
  Mutation: {
    createUser: async (_: never, {name, email}: {
			name: string,
			email: string,
		}) => {
      const user = {id: Date.now().toString(), name, email};
      await db.insert('users', user);
      return user;
    },
  },
};

export default resolvers;
