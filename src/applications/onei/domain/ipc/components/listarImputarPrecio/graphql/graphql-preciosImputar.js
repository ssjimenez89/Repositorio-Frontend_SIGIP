import gql from 'graphql-tag';
export const QUERY_GET_PRECIO_A_IMPUTAR = gql `query ($page: PageResource!) {
  catchmentImputarList(page: $page) {
    totalItems,
    resources {
      id,
      dpa {
        description
      },
      establishmentName,
      varietyName,
      incidenceName,
      precioMesAnterior,
      precio,
      incidenceName,
      observacion {
        description
      }
    }
  }
}`;




export const MUTATION_PRECIOS_A_IMPUTAR = gql `mutation($captacion: [captacionImpute!]){
  imputeCatchment(captacion: $captacion)
}`;
