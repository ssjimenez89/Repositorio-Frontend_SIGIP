import gql from "graphql-tag";

const QUERY_GET_DPA_RESOURCE = gql`query{
 findAllDPAResource{
    id
    description
 }
}`;

export {QUERY_GET_DPA_RESOURCE}
