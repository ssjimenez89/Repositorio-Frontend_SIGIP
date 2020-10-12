import gql from 'graphql-tag';

export const ADD_CARACTERISTICA = gql`
  mutation($characteristic:CharacteristicInput!) {
    addCharacteristicSpecific(characteristic:$characteristic){
        id
        description
    }
}`;

export const TOTAL_CARACTERISTICA_PAGE = gql`
query($description: String!){
  totalcharateristicByDescriptionPage(description:$description)
}
`;

export const CARACTERISTICA_PAGE = gql`
query($description: String!, $page:Int!, $size:Int!){
  charateristicByDescriptionPage(description:$description,page:$page,size:$size){
      description
      id
      totalespecifications
      active
      notAllowElimination
    }
}
`;

export const OBTAIN_CARACTERISTICA = gql`
query($id: Int!){
 charateristicById(id:$id){
    id
    description
    active
    especifications {
      id
      description
      active
      notAllowElimination
    }
  }
}
`;

export const EDIT_CARACTERISTICA = gql`
  mutation($id:Int!, $characteristic:CharacteristicInput!) {
    editCharacteristicSpecific(id:$id,characteristic:$characteristic){
        id
        description
    }
}`;

export const DELETE_CARACTERISTICA = gql`
mutation($id: Int!){
  deleteCharacteristicSpecific(id:$id)
}
`;

export const DELETE_ESPECIFICACIONES = gql`
mutation($idSpecifications: [Long!]){
  deleteSpecifications(idSpecifications:$idSpecifications)
}
`;

export const CHANGE_STATE_CARACTERISTICA = gql`
mutation($id: Int!){
  changeStateCharacteristicSpecific(id:$id)
}
`;
