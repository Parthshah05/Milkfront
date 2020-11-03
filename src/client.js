import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloLink,
  concat,
} from "apollo-boost";
import { isAuthenticated } from "./components/auth/authentication";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "http://localhost:4000/graphql",
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const { token } = isAuthenticated();

  operation.setContext({
    headers: {
      authorization: `Bearer ${token || ""}`,
    },
  });

  return forward(operation);
});

// const client = new ApolloClient({
//   uri: 'http://localhost:4000/graphql'
// });

const client = new ApolloClient({
  link: concat(authMiddleware, link),
  cache,
  //uri: `${process.env.uri}/graphql`,
  // uri: 'http://localhost:4000/graphql',
  // onError: (e) => {
  //   console.log(e);
  // },
  // request: (operation) => {
  //   const { token } = isAuthenticated();

  //   operation.setContext({
  //     headers: {
  //       authorization: token ? `Bearer ${token}` : "",
  //     },
  //   });
  // },
});

export default client;
