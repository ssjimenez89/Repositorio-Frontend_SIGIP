import gql from "graphql-tag";

const GET_WEIGHING_TYPE_QUERY = gql`
query{
  weighingTypes{
    id
    description
    active
   }
}`;

export {GET_WEIGHING_TYPE_QUERY}
