import gql from "graphql-tag";

const GET_CHARACTERISTICS_DESCRIPTION_CONTAINING = gql`
query($description: String!){
 charateristicByDescriptionContaining(description:$description){
    id
    description
    active
    specifications{
      id
      description
      active
      characteristic{
        id
        description      
      }
    }
  }
}`;

export {GET_CHARACTERISTICS_DESCRIPTION_CONTAINING}
