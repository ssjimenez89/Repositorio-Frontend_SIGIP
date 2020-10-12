import gql from 'graphql-tag';

export const QUERY_GET_PRECIOS_FUERA_RANGO = gql`query ($page: PageResource!) {
  catchmentOutRange(page: $page) {
    totalItems
    resources {
      marketDescription,
      dpa {
        description
      },
      varietyName,
      establishmentName,
      precioMesAnterior,
      precio,
      relativo,
      id
    }
  }
}`;
// export const QUERY_GET_PRECIOS_FUERA_RANGO = gql`query ($page: PageResource!) {
//   catchmentOutRange(page: $page) {
//     totalItems
//     resources {
//       marketDescription,
//       dpa {
//         description
//       },
//       varietyName,
//       establishmentName,
//       precioMesAnterior,
//       precio,
//       relativo,
//       id
//     }
//   }
// }`;
