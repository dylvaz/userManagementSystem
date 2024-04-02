import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/userResolver';
import { getUserFromToken } from './utils/auth';

export const startServer = async (port: number) => {
  const app = express();

  const schema = await buildSchema({
    resolvers: [UserResolver],
    emitSchemaFile: true,
    validate: false,
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => {
      const token = req.headers.authorization || '';
      const user = getUserFromToken(token.replace('Bearer ', ''));
      return { user };
    },
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}/graphql`);
  });
};
