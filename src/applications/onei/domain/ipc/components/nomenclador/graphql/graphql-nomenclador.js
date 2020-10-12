import gql from 'graphql-tag';

export const CARGO_MUTATION = gql`mutation($descripcion: String!,$activo: Boolean!){
 registrarCargo(carg:{descripcion:$descripcion, activo:$activo}){
    descripcion
    activo
  }
}`;

export const REGION_MUTATION = gql`mutation($descripcion: String!,$activo: Boolean!){
 registrarRegion(reg:{descripcion:$descripcion, activo:$activo}){
    descripcion
    activo
  }
}`;

export const CATEGORY_MUTATION = gql`mutation($description: String!,$active: Boolean!){
  addCategory(description: $description,active: $active){
        description
        active
    }
}`;

export const MARKET_MUTATION = gql`mutation($description: String!,$active: Boolean!){
  addMarket(description:$description,active:$active){
    id
  }
}`;

export const OBSERVATION_MUTATION = gql`mutation($description: String!,$acronym: String!,$active: Boolean!){
  addObservation(description:$description,acronym:$acronym,active:$active){
    id
  }
}`;

export const INCIDENCE_MUTATION = gql`mutation($description: String!,$acronym: String!,$active: Boolean!){
  addIncidence(description:$description,acronym:$acronym,active:$active){
    id
  }
}`;

export const TYPOLOGY_MUTATION = gql`mutation ($description: String!, $imputed: Boolean!, $active: Boolean!,$categoryId:Long!) {
  addTypology(description:$description,imputed:$imputed,active:$active,categoryId:$categoryId) {
    id
  }
}`;

export const CURRENCY_MUTATION = gql`mutation ($description: String!,$acronym: String!,$active: Boolean!) {
  addCurrency(currency:{
    description:$description,
    acronym:$acronym,
    active:$active
  }) {
    id
  }
}`;

export const DPA_MUTATION = gql`mutation ($description: String!, $active: Boolean!, $code: String!, $regionId: Long) {
  addDPA(description:$description, active:$active, code:$code, regionId:$regionId) {
    id
  }
}`;

export const WEIGHINGTYPE_MUTATION = gql`mutation ($description: String!, $active: Boolean!) {
  addWeighingType(active:$active, description:$description){
    id
  }
}`;

export const VARIETYTYPE_MUTATION = gql`mutation ($description: String!, $active: Boolean!) {
  addVarietyType(active:$active, description:$description){
    id
  }
}`;

export const MEASUREMENTUNIT_MUTATION = gql`mutation ($description: String!, $active: Boolean!, $idTipoUnidadM: Long) {
  addMeasurementUnit(active:$active, description:$description, idTipoUnidadM:$idTipoUnidadM){
    id
  }
}`;

export const MEASUREMENTUNITTYPE_MUTATION = gql`mutation ($description: String!, $active: Boolean!) {
  addMeasurementUnitType(active:$active, description:$description){
    id
  }
}`;

export const CLASSIFIERTYPE_MUTATION = gql`mutation ($description: String!, $active: Boolean!, $codeClassifier: String!) {
  addClassifierTypes(active:$active, description:$description, codeClassifier:$codeClassifier){
    id
  }
}`;

export const QUERY_GET_CATEGORIES = gql`query{
  categories{
    id
    description
  }
}`;

export const QUERY_GET_REGIONES = gql`query{
 regiones{
    id
    descripcion
    activo
  }
}`;

export const QUERY_GET_MEASUREMENTUNITTYPE = gql`query{
  allMeasurementUnitTypes{
    id
    description
  }
}`;

export const QUERY_GET_CARGO_PAGING = gql`query($page: Int!,$size: Int!){
  cargosPaging(size:$size, page:$page){
    id
    descripcion
    activo
  }
}`;

export const QUERY_GET_REGION_PAGING = gql`query($page: Int!,$size: Int!){
  regionesPaging(size:$size, page:$page){
    id
    descripcion
    activo
  }
}`;

export const QUERY_GET_CATEGORIES_PAGING = gql`query($page: Int!,$size: Int!){
  categoriesPaging(page:$page,size:$size){
    id,
    description,
    active
  }
}`;

export const QUERY_GET_INCIDENCE_PAGING = gql`query($page: Int!,$size: Int!){
  incidencePaging(page:$page,size:$size){
    id,
    description,
    active
  }
}`;

export const QUERY_GET_MARKET_PAGING = gql`query($page: Int!,$size: Int!){
  marketsPaging(page:$page,size:$size){
    id,
    description,
    active
  }
}`;

export const QUERY_GET_OBSERVATION_PAGING = gql`query($page: Int!,$size: Int!){
  observationsPaging(page:$page,size:$size){
    id,
    description,
    active
  }
}`;

export const QUERY_GET_TYPOLOGY_PAGING = gql`query($page: Int!,$size: Int!){
  typologiesPaging(page:$page,size:$size){
    id,
    description,
    active
  }
}`;

export const QUERY_GET_DPA_PAGING = gql`query($page: Int!,$size: Int!){
  dpasPaging(page:$page,size:$size){
    id,
    description,
    active
  }
}`;

export const QUERY_GET_CURRENCY_PAGING = gql`query($page: Int!,$size: Int!){
  currencyPaging(page:$page,size:$size){
    id,
    description,
    active
  }
}`;

export const QUERY_GET_WEIGHINGTYPE_PAGING = gql`query($page: Int!,$size: Int!){
  weighingTypesPaging(page:$page,size:$size){
    id,
    description,
    active
  }
}`;

export const QUERY_GET_VARIETYTYPE_PAGING = gql`query($page: Int!,$size: Int!){
  varietyTypesPaging(page:$page,size:$size){
    id,
    description,
    active
  }
}`;

export const QUERY_GET_CLASSIFIERTYPE_PAGING = gql`query($page: Int!,$size: Int!){
  classifierTypesPaging(page:$page,size:$size){
    id,
    description,
    active
  }
}`;

export const QUERY_GET_MEASUREMENTUNITTYPE_PAGING = gql`query($page: Int!,$size: Int!){
  measurementUnitTypesPaging(page:$page,size:$size){
    id,
    description,
    active
  }
}`;

export const QUERY_GET_MEASUREMENTUNIT_PAGING = gql`query($page: Int!,$size: Int!){
  allMeasurementUnitsPaging(page:$page,size:$size){
    id,
    description,
    active
  }
}`;


export const QUERY_GET_NOMENCLATORS_PAGING = gql`query($page: Int!,$size: Int!){
  nomenclatorsPaging(page:$page,size:$size){
    identificador,
    description,
    type,
    active
  }
}`;

export const QUERY_GET_NOMENCLATOR = gql`query{
  nomenclators{
    id,
    description,
    active,
    type
  }
}`;

export const EDIT_CARGO_MUTATION = gql`mutation($activo: Boolean!,$descripcion: String!,$id: Long!){
  actualizarCargo(carg:{id:$id, descripcion:$descripcion, activo:$activo}){
    id
    descripcion
    activo
  }
}`;

export const EDIT_REGION_MUTATION = gql`mutation($activo: Boolean!,$descripcion: String!,$id: Long!){
  actualizarRegion(reg:{id:$id, descripcion:$descripcion, activo:$activo}){
    id
    descripcion
    activo
  }
}`;

export const EDIT_CATEGORY_MUTATION = gql`mutation($active: Boolean!,$description: String!,$id: Long!){
  editCategory(active:$active,description:$description,id:$id){
    id,
    description,
    active,
  }
}`;

export const EDIT_INCIDENCE_MUTATION = gql`mutation($acronym:String!,$active: Boolean!,$description: String!,$id: Long!){
  editIncidence(acronym:$acronym,active:$active,description:$description,id:$id){
    id,
    description,
    active,
    acronym
  }
}`;

export const EDIT_OBSERVATION_MUTATION = gql`mutation($acronym:String!,$active: Boolean!,$description: String!,$id: Long!){
  editObservation(acronym:$acronym,active:$active,description:$description,id:$id){
    id,
    description,
    active,
    acronym
  }
}`;

export const EDIT_MARKET_MUTATION = gql`mutation($active: Boolean!,$description: String!,$id: Long!){
  editMarket(active:$active,description:$description,id:$id){
    id
    description,
    active
  }
}`;

export const EDIT_TYPOLOGY_MUTATION = gql`mutation($categoryId:Long!, $imputed:Boolean!,$active: Boolean!,$description: String!,$id: Long!){
  editTypology(imputed:$imputed,active:$active,description:$description,id:$id,categoryId:$categoryId){
    id,
    description,
    active,
    imputed,
    category{
      id
      description
    }
  }
}`;

export const EDIT_DPA_MUTATION = gql`mutation($active: Boolean!, $description: String!, $id: Long!, $code: String!, $regionId: Long){
  editDPA(active:$active, description:$description, id:$id, code:$code, regionId: $regionId){
    id,
    description,
    active,
    code,
     region{
      id
      descripcion
      activo
    }
  }
}`;

export const EDIT_CURRENCY_MUTATION = gql`mutation($acronym:String!,$active: Boolean!,$description: String!,$id: Long!){
  editCurrency(currency:{
    acronym:$acronym,
    active:$active,
    description:$description,
    id:$id
  }){
    id,
    description,
    active,
    acronym
  }
}`;

export const EDIT_WEIGHINGTYPE_MUTATION = gql`mutation($active: Boolean!,$description: String!,$id: Long!){
  editWeighingType(
    active:$active,
    description:$description,
    id:$id
  ){
    id
  }
}`;

export const EDIT_VARIETYTYPE_MUTATION = gql`mutation($active: Boolean!,$description: String!,$id: Long!){
  editVarietyType(
    active:$active,
    description:$description,
    id:$id
  ){
    id,
    description,
    active,
  }
}`;

export const EDIT_CLASSIFIERTYPE_MUTATION = gql`mutation($active: Boolean!,$description: String!,$id: Long!, $codeClassifier: String!){
  editClassifierTypes(
    active:$active,
    description:$description,
    id:$id,
    codeClassifier:$codeClassifier
  ){
    id
    description,
    active,
    codeClassifier,
  }
}`;

export const EDIT_MEASUREMENTUNIT_MUTATION = gql`mutation($active: Boolean!,$description: String!,$id: Long!, $idTipoUnidadM: Long){
  editMeasurementUnit(
    active:$active,
    description:$description,
    id:$id
    idTipoUnidadM:$idTipoUnidadM
  ){
    id
  }
}`;

export const EDIT_MEASUREMENTUNITTYPE_MUTATION = gql`mutation($active: Boolean!,$description: String!,$id: Long!){
  editMeasurementUnitType(
    active:$active,
    description:$description,
    id:$id
  ){
    id,
    description,
    active,
  }
}`;

export const CARGO_BY_ID = gql`query($id:Long!){
  cargoById(id:$id){
    id
    descripcion
    activo
  }
}`;

export const REGION_BY_ID = gql`query($id:Long!){
  regionById(id:$id){
    id
    descripcion
    activo
  }
}`;

export const CATEGORY_BY_ID = gql`query($id:Long!){
  categoryById(id:$id){
    id,
    description,
    active
  }
}`;

export const INCIDENCE_BY_ID = gql`query($id:Long!){
  incidenceById(id:$id){
    id,
    description,
    active,
    acronym
  }
}`;

export const MARKET_BY_ID = gql`query($id:Long!){
  marketById(id:$id){
    id
    description,
    active
  }
}`;

export const OBSERVATION_BY_ID = gql`query($id:Long!){
  observationById(id:$id){
    id,
    description,
    active,
    acronym
  }
}`;

export const TYPOLOGY_BY_ID = gql`query($id:Long!){
  typologyById(id:$id){
    id,
    description,
    active,
    imputed,
    category{
      id
      description
    }
  }
}`;

export const DPA_BY_ID = gql`query($id:Long!){
  dpaById(id:$id){
     id,
    description,
    active,
    code,
    region{
      id
      descripcion
      activo
    }
  }
}`;

export const CURRENCY_BY_ID = gql`query($id:Long!){
  currencyById(id:$id){
    id,
    description,
    active,
    acronym
  }
}`;

export const WEIGHINGTYPE_BY_ID = gql`query($id:Long!){
  weighingTypeById(id:$id){
    description,
    active,
  }
}`;

export const VARIETYTYPE_BY_ID = gql`query($id:Long!){
  varietyTypeById(id:$id){
    id,
    description,
    active,
  }
}`;

export const CLASSIFIERTYPE_BY_ID = gql`query($id:Long!){
  classifierTypeById(id:$id){
    id
    description,
    active,
    codeClassifier,
  }
}`;

export const MEASUREMENTUNIT_BY_ID = gql`query($id:Long!){
  measurementUnitById(id:$id){
    description,
    active,
    measurementUnitType {
      id
      description
    }
  }
}`;

export const MEASUREMENTUNITTYPE_BY_ID = gql`query($id:Long!){
  measurementUnitTypeById(id:$id){
    id,
    description,
    active,
  }
}`;

export const SEARCH_NOMENCLATORS_BY_DESCRIPTION = gql`query($description:String!,$size:Int!,$page:Int!){
  nomenclatorsByDescriptionContains(description:$description,size:$size,page:$page){
    identificador,
    description,
    type,
    active
  }
}`;

export const TOTAL_SEARCH_NOMENCLATORS_BY_DESCRIPTION = gql`query($description:String!){
  totalAllNomenclatorsByDescriptionContains(description:$description)
}`;

export const SEARCH_OBSERVATION_BY_DESCRIPTION = gql`query($description:String!,$size:Int!,$page:Int!){
  observationByDescriptionContains(description:$description,size:$size,page:$page){
    id,
    description,
    active
  }
}`;

export const TOTAL_SEARCH_OBSERVATION_BY_DESCRIPTION = gql`query($description:String!){
  totalObservationByDescriptionContains(description:$description)
}`;

export const SEARCH_CARGO_BY_DESCRIPTION = gql`query($descripcion:String!,$size:Int!,$page:Int!){
   cargoByDescription(descripcion:$descripcion, size:$size, page:$page){
    id
    descripcion
    activo
  }
}`;

export const SEARCH_REGION_BY_DESCRIPTION = gql`query($descripcion:String!,$size:Int!,$page:Int!){
   regionByDescripcion(descripcion:$descripcion, size:$size, page:$page){
    id
    descripcion
    activo
  }
}`;

export const SEARCH_CATEGORY_BY_DESCRIPTION = gql`query($description:String!,$size:Int!,$page:Int!){
  categoryByDescriptionContains(description:$description,size:$size,page:$page){
    id,
    description,
    active
  }
}`;

export const TOTAL_SEARCH_CARGO_BY_DESCRIPTION = gql`query($descripcion:String!){
  totalCargoByDescription(descripcion:$descripcion)
}`;

export const TOTAL_SEARCH_REGION_BY_DESCRIPTION = gql`query($descripcion:String!){
  totalRegionByDescripciones(descripcion:$descripcion)
}`;

export const TOTAL_SEARCH_CATEGORY_BY_DESCRIPTION = gql`query($description:String!){
  totalCategoryByDescriptionContains(description:$description)
}`;

export const SEARCH_INCIDENCE_BY_DESCRIPTION = gql`query($description:String!,$size:Int!,$page:Int!){
  incidenceByDescriptionContains(description:$description,size:$size,page:$page){
    id,
    description,
    active
  }
}`;

export const TOTAL_SEARCH_INCIDENCE_BY_DESCRIPTION = gql`query($description:String!){
  totalIncidenceByDescriptionContains(description:$description)
}`;

export const SEARCH_MARKET_BY_DESCRIPTION = gql`query($description:String!,$size:Int!,$page:Int!){
  marketByDescriptionContains(description:$description,size:$size,page:$page){
    id,
    description,
    active
  }
}`;

export const TOTAL_SEARCH_MARKET_BY_DESCRIPTION = gql`query($description:String!){
  totalMarketByDescriptionContains(description:$description)
}`;

export const SEARCH_TYPOLOGY_BY_DESCRIPTION = gql`query($description:String!,$size:Int!,$page:Int!){
  typologyByDescriptionContains(description:$description,size:$size,page:$page){
    id,
    description,
    active
  }
}`;

export const TOTAL_SEARCH_TYPOLOGY_BY_DESCRIPTION = gql`query($description:String!){
  totalTypologyByDescriptionContains(description:$description)
}`;

export const SEARCH_DPA_BY_DESCRIPTION = gql`query($description:String!,$size:Int!,$page:Int!){
  dpaByDescriptionContains(description:$description,size:$size,page:$page){
    id,
    description,
    active
  }
}`;

export const TOTAL_SEARCH_DPA_BY_DESCRIPTION = gql`query($description:String!){
  totalDpaByDescriptionContains(description:$description)
}`;

export const SEARCH_CURRENCY_BY_DESCRIPTION = gql`query($description:String!,$size:Int!,$page:Int!){
  currencyByDescriptionContains(description:$description,size:$size,page:$page){
    id,
    description,
    active
  }
}`;

export const TOTAL_SEARCH_CURRENCY_BY_DESCRIPTION = gql`query($description:String!){
  totalCurrencyByDescriptionContains(description:$description)
}`;

export const SEARCH_WEIGHINGTYPE_BY_DESCRIPTION = gql`query($description:String!,$size:Int!,$page:Int!){
  weighingTypeByDescriptionContains(description:$description,size:$size,page:$page){
    id,
    description,
    active
  }
}`;

export const TOTAL_SEARCH_WEIGHINGTYPE_BY_DESCRIPTION = gql`query($description:String!){
  totalWeighingTypesByDescriptionContains(description:$description)
}`;

export const SEARCH_VARIETYTYPE_BY_DESCRIPTION = gql`query($description:String!,$size:Int!,$page:Int!){
  varietyTypeByDescriptionContains(description:$description,size:$size,page:$page){
    id,
    description,
    active
  }
}`;

export const TOTAL_SEARCH_VARIETYTYPE_BY_DESCRIPTION = gql`query($description:String!){
  totalVarietyTypesByDescriptionContains(description:$description)
}`;

export const SEARCH_CLASSIFIERTYPE_BY_DESCRIPTION = gql`query($description:String!,$size:Int!,$page:Int!){
  classifierTypeByDescriptionContains(description:$description,size:$size,page:$page){
    id,
    description,
    active
  }
}`;

export const TOTAL_SEARCH_CLASSIFIERTYPE_BY_DESCRIPTION = gql`query($description:String!){
  totalClassifierTypesByDescriptionContains(description:$description)
}`;

export const SEARCH_MEASUREMENTUNIT_BY_DESCRIPTION = gql`query($description:String!,$size:Int!,$page:Int!){
  measurementUnitByDescriptionContains(description:$description,size:$size,page:$page){
    id,
    description,
    active
  }
}`;

export const TOTAL_SEARCH_MEASUREMENTUNIT_BY_DESCRIPTION = gql`query($description:String!){
  totalMeasurementUnitByDescriptionContains(description:$description)
}`;

export const SEARCH_MEASUREMENTUNITTYPE_BY_DESCRIPTION = gql`query($description:String!,$size:Int!,$page:Int!){
  measurementUnitTypeByDescriptionContains(description:$description,size:$size,page:$page){
    id,
    description,
    active
  }
}`;

export const TOTAL_SEARCH_MEASUREMENTUNITTYPE_BY_DESCRIPTION = gql`query($description:String!){
  totalMeasurementUnitTypeByDescriptionContains(description:$description)
}`;
