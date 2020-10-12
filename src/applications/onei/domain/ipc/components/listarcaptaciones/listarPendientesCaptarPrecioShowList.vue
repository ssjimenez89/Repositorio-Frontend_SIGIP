<template>

  <v-container class="ma-0 pa-0">
    <v-data-table :headers="header" :items="items" :loading="loading"
                  :rows-per-page-text="this.$i18n.t('applications.onei_ipc.modules.listarCaptaciones.self_component.rows_per_page')"
                  :rows-per-page-items="[5, 10, 25]"
                  :pagination.sync="pagin"
                  :total-items="items.length>0 ? items[0].total : 0"
                  class="mt-1">
      <template slot="items" slot-scope="props">
        <td class="text-md-left justify-left grey--text text--darken-1">{{props.item.variedadDescription}}</td>
        <td class="text-md-left justify-left grey--text text--darken-1">{{props.item.establecimiento}}</td>
        <td class="text-md-left justify-left grey--text text--darken-1">{{props.item.dia}}</td>
        <td class="text-md-left justify-left grey--text text--darken-1">
          {{utils.getUmAndCant(props.item.specs).cant.desc}}
        </td>
        <td class="text-md-left justify-left grey--text text--darken-1">
          {{utils.getUmAndCant(props.item.specs).um.desc}}
        </td>
        <td class="text-md-left justify-left grey--text text--darken-1">{{props.item.moneda}}</td>
        <!--<td class="justify-center layout grey&#45;&#45;text text&#45;&#45;darken-1">-->
        <!--<v-layout align-start class="ma-0" justify-left row style="width: 70px">-->
        <!--<v-flex lg12 md12 xs12>-->
        <!--<v-select-->
        <!--:items="dpa"-->
        <!--v-model="dpaSelected"-->
        <!--&gt;</v-select>-->
        <!--</v-flex>-->
        <!--</v-layout>-->
        <!--</td>-->


        <!--<td class="grey&#45;&#45;text text&#45;&#45;darken-1 ">-->

        <!--<v-layout align-center justify-center row>-->
        <!--<v-flex lg12 md12 style="width: 70px" xs12>-->
        <!--<v-text-field-->


        <!--&gt;</v-text-field>-->
        <!--</v-flex>-->
        <!--</v-layout>-->

        <!--</td>-->
        <!--<td class="grey&#45;&#45;text text&#45;&#45;darken-1 ">-->

        <!--<v-layout align-end justify-right row>-->
        <!--<v-flex lg12 md12 style="width: 70px" xs12>-->
        <!--<v-select-->
        <!--:items="dpa"-->
        <!--v-model="dpaSelected"-->


        <!--&gt;</v-select>-->
        <!--</v-flex>-->
        <!--</v-layout>-->

        <!--</td>-->
        <td class="grey--text text--darken-1 " v-if="!crudMode">
          <actions-menu
            :items="[{
            action:{
            func:openCaptarModal,
            args:[props.item]
            },
            icon:'edit',
            text:'Captar precio'
            }]"
          ></actions-menu>
        </td>
        <!--<td class="grey&#45;&#45;text text&#45;&#45;darken-1 " v-if="crudMode">-->
        <!--<actions-menu-->
        <!--:items="[{-->
        <!--to:'/',-->
        <!--icon:'edit',-->
        <!--text:'Captar precio'-->
        <!--}]"-->
        <!--&gt;</actions-menu>-->
        <!--</td>-->

      </template>
      <template slot="no-data">
        <no-found-result></no-found-result>
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
  import VTextField from "@vuetify/components/VTextField/VTextField";
  import VSelect from "@vuetify/components/VSelect/VSelect";
  import ActionsMenu from "../../../../../../shared/components/actions-menu/actions-menu";
  import NoFoundResult from "../../../../../../shared/components/no-found-result/no-found-result";
  import {variedadEstabUtils} from "../../../../utils/variedadEstablecimiento";

  export default {
    name: "listarPendientesCaptarPrecioShowList",
    components: {
      NoFoundResult,
      ActionsMenu,
      VContainer,
      VLayout,
      VFlex,
      VBtn,
      VDivider,
      VDataTable,
      VAlert,
      VIcon,
      VTextField,
      VSelect


    },
    props: {
      items: {
        type: Array,
        required: true,
        default: () => []
      },
      loading: {
        type: Boolean,
        default: false
      },
      pagin: {
        type: Object,
        required: true,
        default: {}
      },
      crudMode: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    created() {
      if (!this.crudMode) {
        this.header.push({text: 'Acciones', align: 'left', sortable: false, value: 'acciones'});
      }
    },
    data: () => ({
      dpaSelected: '',
      dpa: [],
      utils: variedadEstabUtils,
      header: [
        {text: 'Variedad', align: 'left', sortable: false, value: 'variedad'},
        {text: 'Establecimiento', align: 'left', sortable: false, value: 'establecimiento'},
        {text: 'Dia a Captar', align: 'left', sortable: false, value: 'fecha'},
        {text: 'Cantidad', align: 'left', sortable: false, value: 'cantidad'},
        {text: 'UM', align: 'left', sortable: false, value: 'UM'},
        {text: 'Moneda', align: 'left', sortable: false, value: 'moneda'},
        // {text: 'Incidencia', align: 'left', sortable: false, value: 'incidencia'},
        // {text: 'Precio', align: 'left', sortable: false, value: 'precio'},
        // {text: 'Observación', align: 'left', sortable: false, value: 'observacion'},
        //{text: 'Acciones', align: 'left', sortable: false, value: 'acciones'}
      ],
      pagination: {
        rowsPerPage: -1,
        page: -1
      },

    }),
    watch: {
      pagin($event) {

        if ($event.rowsPerPage !== this.pagination.rowsPerPage || $event.page !== this.pagination.page) {
          this.pagination.rowsPerPage = $event.rowsPerPage;
          this.pagination.page = $event.page;

          console.log($event);
          this.$emit('update-pagination', $event);
        }
      }
    },
    methods: {
      initialize() {

      },
      updatePagin($event) {
        debugger;
        if ($event.rowsPerPage !== this.pagination.rowsPerPage || $event.page !== this.pagination.page) {
          this.pagination.rowsPerPage = $event.rowsPerPage;
          this.pagination.page = $event.page;
          console.log($event);
          this.$emit('update-pagination', $event);
        }

      },
      openCaptarModal($variedad) {
        this.$emit('open-modal', $variedad);
      }
    }
  }
</script>

<style scoped>

</style>
