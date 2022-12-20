import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
    uri: 'https://api-sa-east-1.hygraph.com/v2/clbw6u2bs023e01un9gcuf1fc/master',
    cache: new InMemoryCache()
})