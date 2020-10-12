import gql from "graphql-tag";

const GET_MARKET_QUERY = gql`
query{
  markets{
    id
    description
    active
   }
}`;

export {GET_MARKET_QUERY}

