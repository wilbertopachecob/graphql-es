import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { schema } from "./graphql/index";
import GetDbInstance from "./database";
import config from "./config";

const app = express();
const port = 5000;
app.use(cors());

async function startApolloServer() {
  const server = new ApolloServer({
    schema,
    introspection: true,
    context: await GetDbInstance(),
  });

  await server.start();

  server.applyMiddleware({ app });
}

startApolloServer();

app.listen(config.port, () => {
  console.log(`App listening at http://localhost:${config.port}`);
});
