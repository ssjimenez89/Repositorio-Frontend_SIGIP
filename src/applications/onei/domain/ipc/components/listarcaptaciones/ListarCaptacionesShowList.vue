<template>

  <v-container class="ma-0 pa-0">

    <v-data-table :headers="header" :items="infos" :loading="loading" :total-items="infos.length>0 ? infos[0].total : 0"
                  :rows-per-page-text="this.$i18n.t('applications.onei_ipc.modules.listarCaptaciones.self_component.rows_per_page')"
                  :rows-per-page-items="[5, 10, 25]"
                  :pagination.sync="pagination"
                  class="mt-1">
      <template slot="items" slot-scope="props">
        <td class="text-md-left justify-left grey--text text--darken-1">{{props.item.io}}</td>
        <td class="text-md-left justify-left grey--text text--darken-1">{{props.item.varietyName}}</td>
        <td class="text-md-left justify-left grey--text text--darken-1">{{props.item.establishmentName}}</td>
        <td class="text-md-left justify-left grey--text text--darken-1">{{props.item.precio!==null ? props.item.precio :
          "-" }}
        </td>
        <td class="text-md-left justify-left grey--text text--darken-1">{{props.item.currency!==null ?
          props.item.currency.description: "-" }}
        </td>
        <td class="text-md-left justify-left grey--text text--darken-1">
          {{utils.getUmAndCant(props.item.specs).cant.desc}}
        </td>
        <td class="text-md-left justify-left grey--text text--darken-1">
          {{utils.getUmAndCant(props.item.specs).um.desc}}
        </td>
        <td class="text-md-left justify-left grey--text text--darken-1">{{props.item.fecha}}</td>
        <td class="text-md-left justify-left grey--text text--darken-1">
          <get-user-component :id="props.item.user"></get-user-component>
        </td>
        <td class="text-md-left justify-left grey--text text--darken-1">
          <actions-menu
            :items="[{
            action:{
            func: openUpdateModal,
            args: [props.item]
            },
            icon:'edit',
            text:'Editar'
            },
            {
            action:{
            func: openViewModal,
            args: [props.item]
            },
            icon:'event',
            text:'Ver'
            },
            {
            action:{
            func: openDeleteModal,
            args: [props.item.id]
            },
            icon:'delete',
            text:'Eliminar'
            }]"
          ></actions-menu>
        </td>


      </template>
      <template slot="no-data">
        <no-found-result></no-found-result>
      </template>
    </v-data-table>

    <!--  <v-layout column align-end class="mr-4">-->
    <!--  <v-layout row align-end>-->

    <!--      <v-btn  color="primary" to=".">{{$t('applications.onei_ipc.modules.listarCaptaciones.self_component.faltantes')}}</v-btn>-->


    <!--      <v-btn  color="primary" to=".">{{$t('applications.onei_ipc.modules.listarCaptaciones.self_component.expor')}}</v-btn>-->


    <!--  </v-layout>-->
    <!--  </v-layout>-->

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
  import gql from "graphql-tag";
  import ActionsMenu from "../../../../../../shared/components/actions-menu/actions-menu";
  import {QUERY_GET_CAPTACIONES} from "./graphql/graphql-listarcaptaciones";
  import {variedadEstabUtils} from "../../../../utils/variedadEstablecimiento";
  import GetUserComponent from "./get-user-component";
  import NoFoundResult from "../../../../../../shared/components/no-found-result/no-found-result";
  import {filterable} from "../../../../../../shared/mixins";

  export default {
    name: "listar-captaciones-show-list",
    components: {
      NoFoundResult,
      GetUserComponent,
      ActionsMenu,
      VContainer,
      VLayout,
      VFlex,
      VBtn,
      VDivider,
      VDataTable,
      VAlert,
      VIcon


    },
    props: {
      filterModel: {
        type: Object,
        required: false,
        default: {}
      }
    },
    mixins: [filterable],
    apollo: {
      infos: {
        //fetchPolicy:'cache-and-network',
        query: QUERY_GET_CAPTACIONES,
        variables() {
          return {
            marketId: this.filterModel.mercado || -1,
            typologyId: this.filterModel.tipologia || -1,
            dpaId: this.filterModel.dpa || -1,
            establishment: this.filterModel.findestablecimiento ? this.filterModel.findestablecimiento.name : "",
            varietyId: this.filterModel.variedad || -1,
            fechaDigitada: '1999-10-10',
            mes: this.filterModel.mes || "",
            year: this.filterModel.year || "",
            variedadName: this.filterModel.nombreVariedad || "",
            code: "",
            stateId: -1,
            page: this.pagination.page - 1,
            size: this.pagination.rowsPerPage
          }
        },
        update(data) {
          //this.infos = [...data.data.catchmentsByFilter];
          const page = this.pagination.page;
          const size = this.pagination.rowsPerPage;
          debugger;
          console.log(this.infos);
          this.loading = false;
          return [...data.catchmentsByFilter]
        }
      }
    },
    created() {
      this.get();
    },
    data() {
      return {
        utils: variedadEstabUtils,
        directiveTest: 'dfsdfsdfsdf',
        header: [
          {
            text: this.$i18n.t("applications.onei_ipc.modules.listarCaptaciones.self_component.io").toString(),
            align: 'left', sortable: false, value: 'io'
          },
          {
            text: this.$i18n.t("applications.onei_ipc.modules.listarCaptaciones.self_component.variedad").toString(),
            align: 'left', sortable: false, value: 'variedad'
          },
          {
            text: this.$i18n.t("applications.onei_ipc.modules.listarCaptaciones.self_component.establecimiento").toString(),
            align: 'left', sortable: false, value: 'establecimiento'
          },
          {
            text: this.$i18n.t("applications.onei_ipc.modules.listarCaptaciones.self_component.precio").toString(),
            align: 'left', sortable: false, value: 'precio'
          },
          {
            text: this.$i18n.t("applications.onei_ipc.modules.listarCaptaciones.self_component.moneda").toString(),
            align: 'left', sortable: false, value: 'moneda'
          },
          {
            text: this.$i18n.t("applications.onei_ipc.modules.listarCaptaciones.self_component.cantidad").toString(),
            align: 'left', sortable: false, value: 'cantidad'
          },
          {
            text: this.$i18n.t("applications.onei_ipc.modules.listarCaptaciones.self_component.um").toString(),
            align: 'left', sortable: false, value: 'UM'
          },
          {
            text: this.$i18n.t("applications.onei_ipc.modules.listarCaptaciones.self_component.date").toString(),
            align: 'left', sortable: false, value: 'fecha'
          },
          {
            text: this.$i18n.t("applications.onei_ipc.modules.listarCaptaciones.self_component.user").toString(),
            align: 'left', sortable: false, value: 'usuario'
          },
          {
            text: this.$i18n.t("applications.onei_ipc.modules.listarCaptaciones.self_component.action").toString(),
            align: 'left', sortable: false, value: 'acciones'
          }
        ],
        infos: [],
        pagination: {
          rowsPerPage: 5,
          page: 1
        },

        query: {
          query: QUERY_GET_CAPTACIONES,
          variables: {}

        },
        loading: true,

      }
    },

    watch: {
      filterModel(val) {
        this.loading = true;
      },
      pagination(val) {
        this.loading = true;
      }

    },

    methods: {
      get() {
        debugger;
        this.$apollo.queries.infos.refetch();
      },
      openDeleteModal(id) {

        this.$emit('delete-modal', id);
      },
      openViewModal(id) {
        this.$emit('view-modal', id);
      },
      openUpdateModal(id) {

        this.$emit('update-modal', id);
      }

    }
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
