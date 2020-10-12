import gql from 'graphql-tag';

export const QUERY_GET_TYPOLOGIES = gql`query{
  typologies{
    id
    description
  }
}`;

export const QUERY_GET_VARIETY_TYPE = gql`query{
  varietyTypes{
    id
    description
  }
}`;

export const QUERY_GET_PLANNINGSXWEEK = gql`query($week1:Int,$week2:Int,$week3:Int,$week4:Int){
  planningsDayXWeek(week1:$week1,week2:$week2,week3:$week3,week4:$week4){
    id
    day
    week
  }
}`;

export const QUERY_GET_PLANNINGS = gql`query{
  plannings{
    id
    day
    week
  }
}`;

export const QUERY_GET_MARKETS = gql`query{
  marketsCurrencies{
    id
    description
  }
}`;

export const QUERY_GET_MARKETS_CURRENCIES = gql`query{
 marketsCurrencies{
    id
    description
  }
}`;

export const QUERY_GET_DPA = gql`query{
  dpas{
    id
    description
    code
  }
}`;

export const QUERY_GET_DPA_RESOURCE = gql`query{
 findAllDPAResource{
    id
    description
 }
}`;

export const QUERY_GET_STATE = gql`query{
  allStates{
    id
    descripcion
  }
}`;

export const MARKET_BY_DESCRIPTION = gql`query($description: String!){
  marketsByDescriptionContains(description: $description){
    id
    description
  }
}`;

export const QUERY_GET_ESTABLISHMENT = gql`query{
  establishments{
    id
    name
  }
}`;

export const QUERY_GET_ESTABLISHMENT_PAGING = gql`query($page: Int!,$size: Int!){
   establishmentsPaging(page:$page,size:$size){
    id,
    active,
    code,
    name,

    typology{
      id,
      description
    },
    market{
      id,
      market{
        id
        description
      }
      currency{
        id
        description
      }
    },
    state{
      id,
      descripcion
    }
    address
  }
}`;

/*9export const ESTABLISHMENT_MUTATION = gql`mutation($organization: String!,$name: String!,$address: String!,$contact: String!,$phone: String!,$marketId:Long!,$typologyId:Long!,$oneiIndexId: Int!,$dpaId: Long!){
  addEstablishment(organization:$organization,name: $name,address: $address,contact: $contact,phone: $phone,marketId: $marketId,typologyId: $typologyId,oneiIndexId: $oneiIndexId,dpaId: $dpaId){
    id
  }
}`;*/

export const ESTABLISHMENT_MUTATION = gql`mutation($address: String!, $dpaId: Long!, $phone: Int!, $stateId: Long!, $contact: String!, $organization: String!, $name: String!, $typologyId:Long!, $marketId:Long!){
  addEstablishment(address: $address, dpaId: $dpaId, phone: $phone, stateId: $stateId, contact: $contact, organization: $organization, name: $name, typologyId: $typologyId, marketId: $marketId){
    id
  }
}`;

export const ESTABLISHMENT_BY_ID = gql`query($id: Long!){
  establishmentById(id:$id){
    id,
    dpa{
      description
      code
    },
    market{
      id
      market{
        id
        description
      }
      currency{
        id
        description
      }
    },
    typology{
      id,
      description
    },
    state{
      id,
      descripcion
    },
    code,
    name,
    address,
    contact,
    phone,
    active
  }
}`;

export const ESTABLISHMENT_BY_ID_GET_NAME = gql`query($id: Long!){
  establishmentById(id:$id){
    name
    }
}`;

export const EDIT_ESTABLISHMENT_MUTATION = gql`mutation($id: Long!,$name: String!,$address: String!,$contact: String!,$phone: Int!){
  editEstablishment(id:$id,name:$name,address:$address,contact:$contact, phone:$phone){
    id,
    name
  }
}`;

export const DELETE_ESTABLISHMENT_MUTATION = gql`mutation($id:Long!){
    deleteEstablishment(id:$id)
}`;

export const FILTER_ESTABLISHMENT = gql`query($marketId:Long!,$typologyId:Long!,$dpaId: Long!,$establishment: String!,$code:String!,$stateId:Long!,$page: Int!, $size: Int!){
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
      id
      market{
        id
        description
      }
      currency{
        id
        description
      }
    },
    state{
      id
      descripcion
    }
    address
  }
}`;

export const TOTAL_FILTER_ESTABLISHMENT = gql`query($marketId:Long!,$typologyId:Long!,$dpaId: Long!,$establishment: String!,$code:String!,$stateId:Long!){
  totalEstablishmentsByFilter(establishment:$establishment,marketId:$marketId,dpaId:$dpaId,typologyId:$typologyId,code:$code,stateId:$stateId)
}`;


export const VARIETY_ESTABLISHMENT_MUTATION = gql`mutation($establishmentId:Long!, $stateId:Long!, $varietyCharactSpecificsId:[CharactSpecificVariety!], $planningListId:[Long!], $unidadMedidaId:Long!, $cantidadId:Long!){
  addVarietyEstablishment(establishmentId:$establishmentId, stateId:$stateId, varietyCharactSpecificsId:$varietyCharactSpecificsId, planningListId:$planningListId, unidadMedidaId:$unidadMedidaId, cantidadId:$cantidadId ){
    id
  }
}`;

export const QUERY_GET_SPECIFICATION_ACTIVE_DE_CANTIDAD = gql`query{
  specificationListActiveDeCantidad{
  id
  description
  active
  }
}`;

export const QUERY_GET_SPECIFICATION_ACTIVE_DE_UNIDAD_MEDIDA = gql`query{
  specificationListActiveDeUM{
  id
  description
  active
  }
}`;










