import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { TABETALT_API_URI } from '../config';

console.log(TABETALT_API_URI);
const link = createHttpLink({
  uri: TABETALT_API_URI,
});

const cache = new InMemoryCache();

const gqlClient = new ApolloClient({ link, cache });

export default gqlClient;
