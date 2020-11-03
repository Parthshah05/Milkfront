import React from "react";
import Routes from "./routes";
import { ApolloProvider } from "react-apollo";
import client from "./client";
import store from "./store/store";
import { Provider } from "react-redux";

function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <div id="main">
          <Routes />
        </div>
        </Provider>
    </ApolloProvider>
  );
}

export default App;
