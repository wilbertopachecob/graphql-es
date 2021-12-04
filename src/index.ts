import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { schema } from './graphql/index';

const app = express();
const port = 5000;
app.use(cors());

async function startApolloServer() {
    const server = new ApolloServer({
        schema,
        // playground: true,
        introspection: true
    });

    await server.start();

    server.applyMiddleware({app})        ;
}

startApolloServer();

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

