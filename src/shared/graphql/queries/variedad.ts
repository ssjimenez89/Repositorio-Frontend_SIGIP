import gql from "graphql-tag";

const GET_VARIETY_TYPE_QUERY = gql`
query{
  varietyTypes{
    id
    description
    active
   }
}`;

const VARIEDADES_FILTRADAS = gql`query($descripcion: String!,$page: Int!, $size: Int!){
  variedadesFiltradas(descripcion:$descripcion,page:$page,size:$size){
    id,
    description,
  }
}`;



export {GET_VARIETY_TYPE_QUERY,VARIEDADES_FILTRADAS}
