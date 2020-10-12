import gql from "graphql-tag";

const GET_MARKETS_CURRENCIES_QUERY = gql`
query{
  marketsCurrencies{
    id
    description
   }
}`;

export {GET_MARKETS_CURRENCIES_QUERY}

