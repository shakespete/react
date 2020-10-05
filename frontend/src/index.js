import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { message } from 'antd';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

import AppRouter from './routes';
import * as serviceWorker from './serviceWorker';

// Apollo Client
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        viewer: {
          merge: (existing, incoming, { mergeObjects }) =>
            mergeObjects(existing, incoming),
        },
      },
    },
  },
});
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ m, l, p }) =>
      message.error(
        `[GraphQL error]: Message: ${m}, Location: ${l}, Path: ${p}`,
      ),
    );
  if (networkError) message.error(`[Network error]: ${networkError}`);
});
const link = createHttpLink({
  uri: `${process.env.REACT_APP_BACKEND_API_HOST}:${process.env.REACT_APP_BACKEND_API_PORT}/graphql`,
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});
const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(link)),
  cache,
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <AppRouter />
    </ApolloProvider>
  );
};
ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
