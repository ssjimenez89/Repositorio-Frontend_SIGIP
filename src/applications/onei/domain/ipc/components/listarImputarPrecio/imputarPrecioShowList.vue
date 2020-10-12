<template>
<v-container>
  <v-data-table :headers="header" :items="infos.resources" :loading="loading" :total-items="infos.totalItems"
                :rows-per-page-text="this.$i18n.t('applications.onei_ipc.modules.listarCaptaciones.self_component.rows_per_page')"
                :rows-per-page-items="[5, 10, 25]"
                :pagination.sync="pagination"
                class="mt-1">
    <template slot="items" slot-scope="props">
      <td class="text-md-left justify-left grey--text text--darken-1">{{props.item.dpa.description}}</td>
      <td class="text-md-left justify-left grey--text text--darken-1">{{props.item.establishmentName}}</td>
      <td class="text-md-left justify-left grey--text text--darken-1">{{props.item.varietyName}}</td>
      <td class="text-md-left justify-left grey--text text--darken-1">{{props.item.tipologia!==null ? props.item.tipologia : "-" }}</td>
      <td class="text-md-left justify-left grey--text text--darken-1">{{props.item.precioMesAnterior!==null ? props.item.precioMesAnterior : "-"}}</td>
      <td class="text-md-left justify-left grey--text text--darken-1">{{props.item.precio}}</td>
      <td class="text-md-left justify-left grey--text text--darken-1">{{props.item.incidenceName}}</td>
      <td class="text-md-left justify-left grey--text text--darken-1">{{props.item.observacion.description}}</td>
      <td class="text-md-left justify-left grey--text text--darken-1">
        <v-layout align-center class="mt-2 mb-0 pb-0">
        <v-switch color="primary" class="mt-2 mb-0 pb-0" v-model="idList" :value="props.item.id" :disabled="mescerrado"
        ></v-switch>
        </v-layout>
      </td>
    </template>
    <template slot="no-data">
      <no-found-result></no-found-result>
    </template>
  </v-data-table>
  <v-layout align-end class="mr-4" column>
    <v-layout align-end row>

      <v-btn color="primary" @click.stop="dialog = true">
        {{$t('applications.onei_ipc.modules.imputarprecio.self_component.imputar')}}
      </v-btn>

      <v-btn color="primary" to=".">
        {{$t('applications.onei_ipc.modules.imputarprecio.self_component.export')}}
      </v-btn>
      <confirm-dialog
        v-model="dialog"
        body-text="Esta seguro que desea imputar los precios seleccionados?."
        @onCancel="dialog=false"
        @onAcept="imputarPrecios()"
      ></confirm-dialog>

    </v-layout>
  </v-layout>
</v-container>
</template>

<script>
  import VContainer from "@vuetify/components/VGrid/VContainer";
  import VDataTable from "@vuetify/components/VDataTable/VDataTable";
  import VAlert from "@vuetify/components/VAlert/VAlert";
  import {QUERY_GET_PRECIO_A_IMPUTAR, MUTATION_PRECIOS_A_IMPUTAR} from "./graphql/graphql-preciosImputar";
  import VSwitch from "@vuetify/components/VSwitch/VSwitch";
  import VLayout from "@vuetify/components/VGrid/VLayout";
  import VBtn from "@vuetify/components/VBtn/VBtn";
  import VDialog from "@vuetify/components/VDialog/VDialog";
  import VCard from "@vuetify/components/VCard/VCard";
  import VCardTitle from "@vuetify/components/VCard/VCardTitle";
  import {VCardActions, VCardText} from "@vuetify/components/VCard";
  import {VSpacer} from "vuetify/src/components/VGrid";
  import ConfirmDialog from "../../../../../../shared/components/confirm-dialog/confirm-dialog";
  import NoFoundResult from "../../../../../../shared/components/no-found-result/no-found-result";


    export default {
      name: "imputarPrecioShowList",
      components:{
        NoFoundResult,
        ConfirmDialog,
        VContainer,
        VDataTable,
        VAlert,
        VSwitch,
        VLayout,
        VBtn,
        VDialog,
        VCard,
        VCardTitle,
        VCardText,
        VCardActions,
        VSpacer

      },

      data(){
        return {
          idList:[],
          dialog: false,

          header:[
            {
              text: this.$i18n.t("applications.onei_ipc.modules.imputarprecio.self_component.dpa").toString(),
              align:'left', sortable:false, value:'dpa'
            },
            {
              text: this.$i18n.t("applications.onei_ipc.modules.imputarprecio.self_component.establecimiento").toString(),
              align:'left', sortable:false, value:'establecimiento'
            },
            {
              text:this.$i18n.t("applications.onei_ipc.modules.imputarprecio.self_component.variedad").toString(),
              align:'left', sortable:false, value:'variedad'
            },
            {
              text:this.$i18n.t("applications.onei_ipc.modules.imputarprecio.self_component.tipologia").toString(),
              align:'left', sortable:false, value:'tipologia'
            },
            {
              text:this.$i18n.t("applications.onei_ipc.modules.imputarprecio.self_component.anterior").toString(),
              align:'left', sortable:false, value:'anterior'
            },
            {
              text:this.$i18n.t("applications.onei_ipc.modules.imputarprecio.self_component.actual").toString(),
              align:'left', sortable:false, value:'actual'
            },
            {
              text:this.$i18n.t("applications.onei_ipc.modules.imputarprecio.self_component.incidencias").toString(),
              align:'left', sortable:false, value:'incidencias'
            },
            {
              text:this.$i18n.t("applications.onei_ipc.modules.imputarprecio.self_component.observacion").toString(),
              align:'left', sortable:false, value:'observacion'
            },
            {
              text:this.$i18n.t("applications.onei_ipc.modules.imputarprecio.self_component.acciones").toString(),
              align:'left', sortable:false, value:'sustituido'
            },


          ],
          infos: {},
          mescerrado:false,
          pagination: {
            rowsPerPage: 5,
            page: 1
          },
filtros:{},

          query: {
            query: QUERY_GET_PRECIO_A_IMPUTAR,
            variables:{}

          }
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
        // this.fetchItems();
      },


      methods:{
        getElement(){
          let array =[];
          this.infos.resources.forEach(e=>{
            this.idList.forEach(el=>{
              if(el===e.id){
                array.push({id: e.id, lastPrice: e.precioMesAnterior})

              }
            });
          });

          return array;
        },

        imputarPrecios(){
          const mutation = {
            mutation: MUTATION_PRECIOS_A_IMPUTAR,
            variables:{
              captacion:this.getElement()

              }
          };
          console.log(this.getElement());
          this.$apollo.mutate(mutation).then(data=>{
            console.log(data.data.imputeCatchment+"");
            this.$store.dispatch("showMessage", {
              message: "Precio imputado satisfactoriamente.",
              type: "success"
            });
          });
          this.dialog = false;
        },

        initialize() {},

        fetchItems(page=1, size=5, filtros={tipologia: -1, establecimiento: "", dpa: -1, nombreVariedad: -1}){
          this.filtros = filtros;
          const query=this.query;

            query.variables=
              {
                page: {
                  page: page-1,
                  pageSize: size,
                  typologyId:  filtros.tipologia || -1,
                  establishment: filtros.establecimiento || "",

                  dpaId:  filtros.dpa || -1,
                  varietyId: filtros.nombreVariedad || -1
                }


          };
          debugger;
              this.$apollo.query(query).then(data=>{
              // this.totalItem = data.catchmentImputarList.totalItems;
              //   console.log(this.totalItems);
              this.infos = {...data.data.catchmentImputarList};
              console.log(this.infos);

              this.loading=false;
          });
        }

      },


      watch:{
        filterModels(val){
          debugger;
          this.pagination.page = 1;

          this.loading=true;


          this.fetchItems(this.pagination.page , this.pagination.rowsPerPage, val);

        },

        pagination(val){
          debugger;
          this.loading=true;
          this.fetchItems(val.page, val.rowsPerPage, this.filtros);


        }
      },
    }
</script>

<style scoped>

</style>
