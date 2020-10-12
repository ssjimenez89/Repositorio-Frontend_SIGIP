<template>

  <v-container class="ma-0 pa-0">
    <v-data-table :headers="header" :items="infos.resources" :loading="infos.totalItems"
                  :rows-per-page-text="this.$i18n.t('applications.onei_ipc.modules.listarCaptaciones.self_component.rows_per_page')"
                  :rows-per-page-items="[5, 10, 25]"
                  :pagination.sync="pagination"
                  class="mt-1">
      <template slot="items" slot-scope="props">
        <td class="text-md-left justify-left grey--text text--darken-1">{{props.item.marketDescription}}</td>
        <td class="text-md-left justify-left grey--text text--darken-1">{{props.item.dpa.descripcion}}</td>
        <td class="text-md-left justify-left grey--text text--darken-1">{{props.item.varietyName}}</td>
        <td class="text-md-left justify-left grey--text text--darken-1">{{props.item.establishmentName}}</td>
        <td class="text-md-left justify-left grey--text text--darken-1">{{props.item.um}}</td>
        <td class="text-md-left justify-center grey--text text--darken-1">{{props.item.precioMesAnterior}}</td>
        <td class="text-md-left justify-left grey--text text--darken-1">{{props.item.precio}}</td>
        <td class="text-md-left justify-left grey--text text--darken-1">{{props.item.relativo}}</td>
        <td class="text-md-left justify-left grey--text text--darken-1">{{props.item.sustituido}}</td>
        <td class="text-md-left justify-left grey--text text--darken-1">
          <v-layout align-center class="mt-2 mb-0 pb-0">
            <v-switch color="primary" class="mt-2 mb-0 pb-0 " v-model="idList" :value="props.item.id"
            ></v-switch>
          </v-layout>
        </td>


      </template>
      <template slot="no-data">
        <v-alert :value="true" color="error" icon="warning">
          {{$t('applications.onei_ipc.components.table.no_data')}}
        </v-alert>
      </template>
    </v-data-table>


  </v-container>

</template>

<script>
    import VContainer from "@vuetify/components/VGrid/VContainer";
    import VLayout from "@vuetify/components/VGrid/VLayout";
    import VFlex from "@vuetify/components/VGrid/VFlex";
    import VBtn from "@vuetify/components/VBtn/VBtn";
    import VDivider from "@vuetify/components/VDivider/VDivider";
    import VDataTable from "@vuetify/components/VDataTable/VDataTable";
    import VAlert from "@vuetify/components/VAlert/VAlert";
    import VIcon from "@vuetify/components/VIcon/VIcon";
    import {QUERY_GET_PRECIOS_FUERA_RANGO} from "./graphql/graphql-listarPreciosFueraRango"

  export default {
    name: "ListarPrecioFueraRangoShowList",
    components: {
      VContainer,
      VLayout,
      VFlex,
      VBtn,
      VDivider,
      VDataTable,
      VAlert,
      VIcon,
        },


      data(){
          return {
            idList: [],
          header:[
              {
                  text: this.$i18n.t("applications.onei_ipc.modules.listarPreciosFueraRango.self_component.market").toString(),
                  align:'left', sortable:false, value:'mercado'
              },
              {
                  text: this.$i18n.t("applications.onei_ipc.modules.listarPreciosFueraRango.self_component.dpa").toString(),
                  align:'left', sortable:false, value:'dpa'
              },
              {
                  text:this.$i18n.t("applications.onei_ipc.modules.listarPreciosFueraRango.self_component.variedad").toString(),
                  align:'left', sortable:false, value:'variedad'
              },
              {
                  text:this.$i18n.t("applications.onei_ipc.modules.listarPreciosFueraRango.self_component.establecimiento").toString(),
                  align:'left', sortable:false, value:'establecimiento'
              },
              {
                  text:this.$i18n.t("applications.onei_ipc.modules.listarPreciosFueraRango.self_component.um").toString(),
                  align:'left', sortable:false, value:'um'
              },
              {
                  text:this.$i18n.t("applications.onei_ipc.modules.listarPreciosFueraRango.self_component.anterior").toString(),
                  align:'left', sortable:false, value:'anterior'
              },
              {
                  text:this.$i18n.t("applications.onei_ipc.modules.listarPreciosFueraRango.self_component.actual").toString(),
                  align:'left', sortable:false, value:'actual'
              },
              {
                  text:this.$i18n.t("applications.onei_ipc.modules.listarPreciosFueraRango.self_component.relativo").toString(),
                  align:'left', sortable:false, value:'relativo'
              },
              {
                  text:this.$i18n.t("applications.onei_ipc.modules.listarPreciosFueraRango.self_component.sustituido").toString(),
                  align:'left', sortable:false, value:'sustituido'
              },


    ],
          infos: {},
            pagination: {
              rowsPerPage: 5,
              page: 1
            },
          }
      },
    props:{
      filterModels:{
        type: Object,
        required: false,
        default:{ }
      }
    },
    created(){
      this.fetchItems();
    },
        methods:{
            initialize() {},
          fetchItems(page=0, size=5){
              const query={
                query:QUERY_GET_PRECIOS_FUERA_RANGO,
                variables:{
                  marketId:this.filterModels.mercado || -1,
                  dpsId: this.filterModels.dpa || -1,
                  variedadId: this.filterModels.variedad || -1,
                  variacionId: this.filterModels.variacion || -1,
                  establecimientoId: this.filterModels.establecimiento || -1,
                  semanaId: this.filterModels.semana || -1,
                  code: "",
                  stateId: -1,
                  page: page,
                  size: size

                }

              };
            this.$apollo.query(query).then(data=>{

              this.infos = {...data.data.catchmentOutRange};

            });
          }
    },
    watch:{
      filterModel(val){
        debugger;
        this.query.variables.marketId = val.mercado;
        this.query.variables.dpaId = val.dpa;
        this.query.variables.varietyId = val.dpa;
        this.query.variables.variacionId = val.variacion;
        this.query.variables.establecimientoId=val.establecimiento;
        this.query.variables.semanaId=val.semana;
        this.pagination.page = 0;
        this.loading=true;


        this.fetchItems(0 , this.pagination.rowsPerPage);
        this.fetchItems();
      },
      pagination(val){
        debugger;
        this.loading=true;
        this.fetchItems(val.page, val.rowsPerPage);


      }
    },

  }
</script>

<style lang="stylus" scoped>
  .borde
    border-left 1px solid
    border-top 1px solid
    border-right 1px solid
    border-bottom 1px solid

  .a
    align-content end
</style>


