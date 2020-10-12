<template>

  <v-container class="ma-0 pa-0">
    <v-data-table :headers="headers" :items="items" :loading="loading"
                  :rows-per-page-text="this.$i18n.t('applications.onei_ipc.modules.listarCaptaciones.self_component.rows_per_page')"
                  :rows-per-page-items="[5, 10, 25]"
                  :pagination.sync="pagin"
                  :total-items="items.length>0 ? items[0].total : 0"
                  class="mt-1">
      <template slot="items" slot-scope="props">
        <td class="text-md-left justify-left grey--text text--darken-1"
            v-for="element in headers"
        >{{props.item[element.value]}}
        </td>
        <!--<td class="text-md-left justify-left grey&#45;&#45;text text&#45;&#45;darken-1">{{props.item.variedadDescription}}</td>-->
        <!--<td class="text-md-left justify-left grey&#45;&#45;text text&#45;&#45;darken-1">{{props.item.establecimiento}}</td>-->
        <!--<td class="text-md-left justify-left grey&#45;&#45;text text&#45;&#45;darken-1">{{props.item.dia}}</td>-->
        <!--<td class="text-md-left justify-left grey&#45;&#45;text text&#45;&#45;darken-1">{{props.item.cantidad}}</td>-->
        <!--<td class="text-md-left justify-left grey&#45;&#45;text text&#45;&#45;darken-1">{{props.item.UM}}</td>-->
        <!--<td class="text-md-left justify-left grey&#45;&#45;text text&#45;&#45;darken-1">{{props.item.moneda}}</td>-->
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
        <td class="grey--text text--darken-1 ">
          <!--<actions-menu-->
          <!--:items="[{-->
          <!--action:{-->
          <!--func:openCaptarModal,-->
          <!--args:[props.item]-->
          <!--},-->
          <!--icon:'edit',-->
          <!--text:'Captar precio'-->
          <!--}]"-->
          <!--&gt;</actions-menu>-->
          pp
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
        no data
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
  import ActionsMenu from "@shared/components/actions-menu/actions-menu";

  export default {
    name: "generic-table",
    components: {
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
      headers: {
        type: Array,
        required: true,
        default: []
      },
      loading:{
        type: Boolean,
        required: true,
        default: false
      },
      items: {
        default:[],
        required: true,
        type: Array

      },
      dataName: {
        required: true,
        type: String,
      }
    },
    created() {

    },
    data: () => ({
      items: [],
      loading: true,
      pagin: {
        page: 1,
        rowsPerPage: 5,
        total: 0
      },
      pagination: {
        rowsPerPage: -1,
        page: -1
      },

    }),
    watch: {
      pagin($event) {
      debugger;
        this.$emit('update-pagination', $event);
        // if ($event.rowsPerPage !== this.pagination.rowsPerPage || $event.page !== this.pagination.page) {
        //   this.pagination.rowsPerPage = $event.rowsPerPage;
        //   this.pagination.page = $event.page;
        //   console.log($event);
        //   this.fetchData();
        //
        // }
      }
    },
    methods: {
      initialize() {

      },

      fetchData() {
        // const query = {
        //
        //   query: FILTER_ESTABLISHMENT_NO_REALTIONS,
        //   variables: {
        //     marketId: -1,
        //     typologyId: -1,
        //     dpaId: -1,
        //     establishment: this.currentText !== '' ? this.currentText : "null",
        //     code: "",
        //     stateId: -1,
        //     page: 0,
        //     size: 5
        //   }
        //
        // };
        const tempQuery = {...this.query};
        // tempQuery.variables[this.filterBy] = this.currentText !== '' ? this.currentText : '';
        this.$apollo.query(tempQuery).then((data) => {
          this.items = [...data.data[this.dataName]];
          this.loading = false;

        })
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
