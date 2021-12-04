import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { schema } from './graphql/index';

const app = express();
app.use(cors);

const server = new ApolloServer({
    schema,
    // playground: true,
    introspection: true
});

server.applyMiddleware({app})

app.listen(5000, () => {
    console.log('Server running in port 5000');
});

