import React from 'react';
import Routes from "./routes";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';



const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

function App() {
 
  return (
    
    <ApolloProvider client={client}>
    <div id="main">
        
        <Routes />
       {/* <BookList />
        <AddBook /> */}
    </div>
</ApolloProvider>
  );
}

export default App;
