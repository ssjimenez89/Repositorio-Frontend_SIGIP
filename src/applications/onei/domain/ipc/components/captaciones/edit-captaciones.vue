<template>
  <div>
  <confirm-dialog
  body-text="hola"
  v-model="dialog"
  @onCancel="onClose('cerrado')"
  @onAcept="onClose('ok')"
  >
    <b>hola pepe</b>
  </confirm-dialog>
    <v-btn
      color="green darken-1"
      flat="flat"
      @click="dialog = true"
    >
      {{ $t('applications.onei_ipc.messages.acept') }}
    </v-btn>
    <generic-table
    :headers="header"
    :items="items"
    :loading="loading"
    data-name="captacionesPendientes"
    @update-pagination="updatePagin($event)"
    ></generic-table>
  </div>
</template>

<script>
  import VBtn from "@vuetify/components/VBtn";
  import ConfirmDialog from "../../../../../../shared/components/confirm-dialog/confirm-dialog";
  import {QUERY_GET_PENDIENTES} from "../listarcaptaciones/graphql/graphql-listarcaptaciones";
  import GenericTable from "../../../../../../shared/components/generic-table/generic-table";

  export default {
    name: "edit-captaciones",
    components: {
      GenericTable,
      ConfirmDialog,
      VBtn
    },
    data() {
      return {
        dialog: false,
        items:[],
        loading: false,
        query: {
          query: QUERY_GET_PENDIENTES,
          variables: {
            establishmentId: 2987,
            start: "2019-04-01",
            end: "2019-04-04",
            page: 0,
            size: 5

          }
        },
        header: [
          {text: 'Variedad', align: 'left', sortable: false, value: 'variedadDescription'},
          {text: 'Establecimiento', align: 'left', sortable: false, value: 'establecimiento'},
          {text: 'Dia a Captar', align: 'left', sortable: false, value: 'dia'},
          {text: 'Cantidad', align: 'left', sortable: false, value: 'cantidad'},
          {text: 'UM', align: 'left', sortable: false, value: 'UM'},
          {text: 'Moneda', align: 'left', sortable: false, value: 'moneda'},
          // {text: 'Incidencia', align: 'left', sortable: false, value: 'incidencia'},
          // {text: 'Precio', align: 'left', sortable: false, value: 'precio'},
          // {text: 'Observación', align: 'left', sortable: false, value: 'observacion'},
          // {text: 'Acciones', align: 'left', sortable: false, value: 'acciones'}
        ]
      }
    },
    methods: {
      onClose(text) {
        debugger;
        alert(text);
      },
      updatePagin($event){
          this.loading = true;
          this.fetchData();
          console.log('ready')
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
          this.items = [...data.data.captacionesPendientes];
          this.loading = false;

        })
      }
    }
  }
</script>

<style scoped>

</style>
