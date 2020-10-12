import gql from 'graphql-tag';

export const QUERY_GET_CAPTACIONES = gql`query($marketId:Long!,$typologyId:Long!,$dpaId: Long!,$establishment: String!,$varietyId: Long!, $fechaDigitada: Date!,$year: String!,$mes: String!,$variedadName: String!, $page: Int!, $size: Int!){
  catchmentsByFilter(establishment:$establishment,marketId:$marketId,dpaId:$dpaId,typologyId:$typologyId,varietyId:$varietyId,fechaDigitada: $fechaDigitada,year: $year,mes: $mes,variedadName: $variedadName,paging:$page,size:$size ){
    id,
    varietyName,
    precio,
    user,
    varEstabId,
    establishmentName,
    marketDescription,
    total,
    fecha,
    specs {
      spec{
        desc
        id
        tipoUM
      },
      carac{
        desc
        id
      }
    },
    dpa{
      description,
      code,
      id
    },
    incidencia{
      id,
      description
    },
    observacion{
      id,
      description
    },
    currency{
      id,
      description
    }
  }
}`;

export const QUERY_GET_PENDIENTES = gql`query ($establishmentId: Long!, $start: Date!, $end: Date!, $page: Int!, $size: Int!) {
  captacionesPendientes(establishmentId: $establishmentId, start: $start, end: $end, page: $page, size: $size) {
    variedadDescription
    establecimiento,
    variedadId,
    mercado,
    total,
    varEstabId,
    moneda,
    dia,
    specs {
      spec{
        desc
        id
        tipoUM
      },
      carac{
        desc
        id
      }
    }
  }
}`;

export const QUERY_GET_PENDIENTES_ALL = gql`query ($establishmentId: Long!,$dpaId: Long!,$marketId: Long!,$tipologyId: Long, $start: Date, $end: Date, $page: Int!, $size: Int!) {
  captacionesPendientesAll(establishmentId: $establishmentId,dpaId:$dpaId,marketId: $marketId,tipologyId: $tipologyId, start: $start, end: $end, page: $page, size: $size) {
    variedadDescription
    establecimiento,
    variedadId,
    mercado,
    total,
    varEstabId,
    moneda,
    dia
    specs {
      spec{
        desc
        id
        tipoUM
      },
      carac{
        desc
        id
      }
    }
  }
}`;

export const ADD_CAPTACION_MUTATION = gql`mutation($catchmentInputs: [CatchmentInput!]){
  addCatchment(catchmentInputs:$catchmentInputs)
}`;

export const DELETE_CAPTACION_MUTATION = gql`mutation($id: Long!){
  deleteCatchment(id:$id)
}`;

export const UPDATE_CAPTACION_MUTATION = gql`mutation($capt: CatchmentInput!){
  editCatchment(capt:$capt){
    id,
    varietyName,
    precio,
    user,
    varEstabId,
    establishmentName,
    marketDescription
    fecha,
    specs {
      spec{
        desc
        id
        tipoUM
      },
      carac{
        desc
        id
      }
    },
    dpa{
      description,
      code,
      id
    },
    incidencia{
      id,
      description
    },
    observacion{
      id,
      description
    },
    currency{
      id,
      description
    }
  }
}`;
export const QUERY_VALIDAR_CIERRE_MES = gql`query {
  isAllCathedValidation
}`;
export const QUERY_CAMBIO_UM = gql`query($precioObservado: Float!, $cantidadObservada: Float!, $specificationIdUMObservada: Long!, $cantidadActual: Float!, $specificationIdUMActual: Long!, $varEstabId: Long!){
  cambioUM(precioObservado: $precioObservado, cantidadObservada: $cantidadObservada, specificationIdUMObservada: $specificationIdUMObservada, cantidadActual: $cantidadActual, specificationIdUMActual: $specificationIdUMActual, varEstabId: $varEstabId)
}`;

