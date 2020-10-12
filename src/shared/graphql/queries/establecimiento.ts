import gql from "graphql-tag";
const FILTER_ESTABLISHMENT = gql`query($marketId:Long!,$typologyId:Long!,$dpaId: Long!,$establishment: String!,$code:String!,$stateId:Long!,$page: Int!, $size: Int!){
  filterEstablishments(establishment:$establishment,marketId:$marketId,dpaId:$dpaId,typologyId:$typologyId,code:$code,stateId:$stateId,page:$page,size:$size){
    id,
    active,
    code,
    name,
    typology{
      id,
      description
    },
    market{
      description
    },
    state{
      id
      descripcion
    }
    address
  }
}`;

const FILTER_ESTABLISHMENT_NO_REALTIONS = gql`query($marketId:Long!,$typologyId:Long!,$dpaId: Long!,$establishment: String!,$code:String!,$stateId:Long!,$page: Int!, $size: Int!){
  filterEstablishments(establishment:$establishment,marketId:$marketId,dpaId:$dpaId,typologyId:$typologyId,code:$code,stateId:$stateId,page:$page,size:$size){
    id,
    active,
    code,
    name,
    address
  }
}`;

const FILTER_ESTABLISHMENT_PENDING = gql`query($marketId:Long!,$typologyId:Long!,$dpaId: Long!,$establishment: String!,$code:String!,$stateId:Long!,$page: Int!, $size: Int!){
  pendingEstablishments(establishment:$establishment,marketId:$marketId,dpaId:$dpaId,typologyId:$typologyId,code:$code,stateId:$stateId,page:$page,size:$size){
    id,
    active,
    code,
    name,
    address
  }
}`;
const IS_ESTABLISHMENT_CATCHED = gql`query($idEstablishment: Long!){
  isEstablishmentCatched(idEstablishment:$idEstablishment)
}`;
export {FILTER_ESTABLISHMENT, FILTER_ESTABLISHMENT_NO_REALTIONS,FILTER_ESTABLISHMENT_PENDING, IS_ESTABLISHMENT_CATCHED};
