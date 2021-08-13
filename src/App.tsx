import React from 'react';
import { Provider } from 'react-redux';
import {
  ApolloClient, InMemoryCache, ApolloProvider, split, createHttpLink,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { ToastContainer } from 'react-toastify';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import Wrapper from './components/Wrapper';
import store from './store';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
});

const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_GRAPHQL_SUBSCRIBE_ENDPOINT!,
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(39,49,66)',
    },
    secondary: {
      main: 'rgb(197,208,222)',
    },
    background: {
      default: 'rgb(226,231,238)',
    },
  },
});

const App = () => (
  <Provider store={store}>
    <ApolloProvider client={client}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Wrapper>
          <Header />
          <Dashboard />
          <ToastContainer />
        </Wrapper>
      </MuiThemeProvider>
    </ApolloProvider>
  </Provider>
);

export default App;
