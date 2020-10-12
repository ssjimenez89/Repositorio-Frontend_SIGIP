import gql from 'graphql-tag';

//Vieja
/*export const QUERY_GET_VARIETY_PAGING = gql`query($establishmentId:Long!, $typologyId:Long!,$page: Int!,$size: Int!){
  varietiesPaging(establishmentId:$establishmentId,typologyId:$typologyId,page:$page,size:$size){
    id,
    description,
      code
  }
}`; */

export const QUERY_GET_VARIETY_X_MARKET = gql`query($idmarket:Long!, $idestablishment:Long!, $size: Int!,  $page: Int!){
  classifierByMarket(idmarket:$idmarket, idestablishment:$idestablishment, size:$size, page:$page,){  
    id,
    description,
    code
  }
}`;

export const QUERY_GET_VARIETIES_FILTRADAS_BY_MARKET = gql`query($idmarket:Long!, $idestablishment:Long!, $size: Int!, $page: Int!, $description:String!){
  variedadesFiltradasByMarket(idmarket:$idmarket, idestablishment:$idestablishment, size:$size, page:$page, descripcion: $description){
    id
    description
    code
  }
}`;

/*export const VARIETY_BY_ID = gql`query($id: Long!){
  varietyById(id:$id){
    id,
    code,
    description,
    varietyCharactSpecifics{
      id,
      characteristic{
        id,
        description
      },
      specification{
        id,
        description
      }
    }
  }
}`;*/

export const VARIETY_BY_ID = gql`query($id: Long!){
  classifierById(id:$id){
    id,
    description    
     varietyCharactSpecifics{
      id,
      specification{
        id
        description
      characteristic{
        id
        description
      }   
    }      
   }         
  }
}`;

export const VARIETY_CHARACT_SPECIFIC_ACTIVE_BY_ID_CLASSIFIER = gql`query($id: Long!){
 findByVarietyCharactSpecificActive(classifierId: $id){
   id,
      specification{
        id
        description
      characteristic{
        id
        description
      }   
    }      
  }
}`;

export const VARIETY_CHARACT_SPECIFIC_LIST_X_CLASSIFIER = gql`query($id: Long!){
  varietyCharactSpecificList(classifierId: $id){
    id
    specification{
      id
      description
      characteristic{
        id
        description
      }
    }
  }
}`;



export const TOTAL_VARIETY_X_MARKET = gql`query( $idmarket:Long!, $idestablishment:Long!){
  totalClassifierByMarket( idmarket:$idmarket, idestablishment: $idestablishment)
}`;

export const TOTAL_VARIETIES_FILTRADAS_BY_MARKET = gql`query( $idmarket:Long!, $idestablishment:Long!, $description:String!){
 totalvariedadesFiltradasByMarket(idmarket:$idmarket, idestablishment: $idestablishment, descripcion:$description)
}`;
