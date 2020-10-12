import gql from "graphql-tag";

const QUERY_GET_DPA = gql`query{
  dpas{
    id
    description
    code
  }
}`;

export {QUERY_GET_DPA}
