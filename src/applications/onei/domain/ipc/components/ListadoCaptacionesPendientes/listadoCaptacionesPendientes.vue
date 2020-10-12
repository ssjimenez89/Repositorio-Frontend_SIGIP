<template>
  <div>

    <listar-pendientes-captar-precio-show-list
      :crudMode="true"
      :items="items"
      :pagin="paginModel"
      :loading="loading"
      @update-pagination="updatePagination($event)"
      @open-modal="openModal($event)"
    ></listar-pendientes-captar-precio-show-list>
  </div>
</template>

<script>
  import GenericFilter from "@shared/components/generic-filter/generic-filter";
  import ListarPendientesCaptarPrecioShowList from "../listarcaptaciones/listarPendientesCaptarPrecioShowList";
  import {QUERY_GET_PENDIENTES, QUERY_GET_PENDIENTES_ALL} from "../listarcaptaciones/graphql/graphql-listarcaptaciones";
  import {filterable} from "../../../../../../shared/mixins";
  import {PaginModel} from "../../../../../../shared/types";

  export default {
    name: "listadoCaptacionesPendientes",
    components: {
      GenericFilter,
      ListarPendientesCaptarPrecioShowList
    },
    mixins: [filterable],
    apollo: {
      items: {
        query: QUERY_GET_PENDIENTES_ALL,
        variables() {
          return {
            establishmentId: -1,
            start: "2020-02-01",
            end: "2020-02-11",
            page: this.paginModel.page - 1,
            size: this.paginModel.rowsPerPage,
            dpaId: -1,
            marketId: this.filterModel.mercado,
            tipologyId: this.filterModel.tipologia
          }
        },
        update(data) {
          debugger;
          return [...data.captacionesPendientesAll];
        }
      }
    },
    data() {
      return {
        text: 1,
        dialog: false,
        dialogPrecio: false,
        items: [],
        paginModel: new PaginModel(),
        loading: false
      }
    },
    beforeCreate() {
      this.$apolloCache.invalidateQuery('captacionesPendientesAll');
    },
    methods: {
      openModal($event) {

        console.log($event);
        //
        // this.currentVariedadModel = {...$event};
        // this.dialog = true;
      },
      updatePagination($event) {
        //this.text+=1;
        this.paginModel.page = $event.page;
        this.paginModel.rowsPerPage = $event.rowsPerPage;
        console.log($event);
        // this.fetchItems(this.paginModel.page);
      }
    }
  }
</script>

<style scoped>

</style>
