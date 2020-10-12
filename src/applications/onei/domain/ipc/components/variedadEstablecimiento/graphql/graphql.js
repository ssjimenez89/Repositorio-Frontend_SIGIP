import gql from 'graphql-tag';

export const VARIETY_ESTABLISHMENT_PAGING = gql`query($size: Int!, $page: Int!){
   varietyEstablishmentPaging(size:$size, page:$page){
    id,
    active,
    planning{
        id
        day
        week
    },
    classifier{
        id
        description
        code
    },
    unidadMedida{
        id
        description
    }
    establishment{
      name,
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
      dpa{
        code,
        description
      },
    },
    state{
      id
      descripcion
    }
  }
}`;

export const FILTER_VARIETY_ESTABLISHMENT = gql`query($marketId:Long!,$typologyId:Long!,$dpaId: Long!,$establishment: String!,$variety:String!,$stateId:Long!,$page: Int!, $size: Int!){
  filterVarietyEstablishment(establishment:$establishment,marketId:$marketId,dpaId:$dpaId,typologyId:$typologyId,variety:$variety,stateId:$stateId,page:$page,size:$size){
    id,
    active,
    planning{
      id,
      day,
      week
    },
    classifier{
        id
        description
        code
    },
     unidadMedida{
        id
        description
    }
    establishment{
      name,
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
      dpa{
        code,
        description
      },
    },
    state{
      id,
      descripcion
    }
  }
}`;

export const FILTER_VARIETY_ESTABLISHMENT_RESOURCE = gql`query($marketId:Long!,$typologyId:Long!,$dpaId: Long!,$establishment: String!,$variety:String!,$stateId:Long!,$page:Int!,$size:Int!){
  filterVarietyEstablishmentResource(establishment:$establishment,marketId:$marketId,dpaId:$dpaId,typologyId:$typologyId,variety:$variety,stateId:$stateId,page:$page,size:$size){
     varietyEstablishment{
      state{
        id,
        descripcion
       }
     }
     listIdVarEstab
     establecimientoDescripcion
     stateDescripcion
     mercadoDescripcion
     monedaDescripcion
     dpaDescripcion
     active
     variedadDescripcion
     unidadMedidaDescripcion
     cantidadDescripcion
     dayPlanning1
     dayPlanning2
     dayPlanning3
     dayPlanning4
  }
}`;

export const TOTAL_FILTER_VARIETY_ESTABLISHMENT = gql`query($marketId:Long!,$typologyId:Long!,$dpaId: Long!,$establishment: String!,$variety:String!,$stateId:Long!,$page:Int!,$size:Int!){
  totalVarietyEstablishmentByFilter(establishment:$establishment,marketId:$marketId,dpaId:$dpaId,typologyId:$typologyId,variety:$variety,stateId:$stateId,page:$page,size:$size)
}`;

export const DELETE_VARIETY_ESTABLISHMENT = gql`mutation($id:Long!){
  deleteVarietyEstablishment(id:$id)
}`;

export const EDIT_VARIETY_ESTABLISHMENT = gql`mutation($id:Long!,$charactSpecificVariety:[CharactSpecificVariety], $planningListId: [Long!], $unidadMedidaId: Long!, $cantidadId: Long! ){
  editVarietyEstablishment(id:$id,charactSpecificVariety:$charactSpecificVariety, planningListId:$planningListId, unidadMedidaId:$unidadMedidaId, cantidadId:$cantidadId){
    id
  }
}`;

export const VARIETY_ESTABLISHMENT_BY_ID = gql`query($id:Long!){
  varietyEstablishmentByid(id:$id){
    establishment{
      name,
      dpa{
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
      typology{
        description
      }
    },
    varietyCharactSpecifics{
      classifier{
        id,
        description
      },
      specification{
        id,
        description
        characteristic{
        id,
        description
       }
      }
    }
  planning{
    id
    day
  }
  unidadMedida{
    id
    description
  }
  cantidad{
    id
    description
  }
  }
}`;

export const VARIETY_ESTABLISHMENT_RESOURCE_BY_ID = gql`query($id:Long!){
  varietyEstablishmentResourceByid(id: $id){
   listIdVarEstab
  varietyEstablishment{

    establishment{
      name,
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
        description
      }
    },

    varietyCharactSpecifics{
      classifier{
        id,
        description
      },
      specification{
        id,
        description
        characteristic{
        id,
        description
       }
      }
    }
  classifier{
      id
      description
    }
    planning{
      id
      day
    }
  unidadMedida{
    id
    description
  }
  cantidad{
    id
    description
  }
  }
  active
  establecimientoDescripcion
  stateDescripcion
  mercadoDescripcion
  monedaDescripcion
  dpaDescripcion
  variedadDescripcion
  unidadMedidaDescripcion
  cantidadDescripcion
  dayPlanning1Id1
  dayPlanning1
  dayPlanning1Id2
  dayPlanning2
  dayPlanning1Id3
  dayPlanning3
  dayPlanning1Id4
  dayPlanning4
 }
}`;

export const SET_ACTIVE = gql`mutation($id:Long!){
  setActiveVarietyEstablishment(id:$id){
    id,
    active
  }
}`;

export const SET_STATE = gql`mutation($idVarietyStab:Long!, $idstate:Long!){
  setEstadoVarietyEstablishment(idVarietyStab:$idVarietyStab, idstate:$idstate){
    id
  }
}`;

