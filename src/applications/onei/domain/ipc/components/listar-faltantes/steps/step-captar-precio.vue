<template>
  <div>

    <!--<generic-filter-->
    <!--:only="['fecha']"-->
    <!--@filter-change="updateFilter($event)"-->
    <!--&gt;</generic-filter>-->

    <generic-nomenclador-select
      nomenclador="incidencia"
      text="description"
      val="id"
      label="Incidencia"
      return-object
      v-model="incidencia"
      @change="changeIncidence($event)"
    ></generic-nomenclador-select>


    <listar-pendientes-captar-precio-show-list
      :items="items"
      :pagin="paginModel"
      :loading="loading"
      @update-pagination="updatePagination($event)"
      @open-modal="openModal($event)"
    ></listar-pendientes-captar-precio-show-list>
    <captar-dialog-form
      :view-mode="mode"
      v-model="dialog"
      :variedad="currentVariedadModel"
      @save="save($event)"
    ></captar-dialog-form>

  </div>
</template>

<script>
  import GenericFilter from "@shared/components/generic-filter/generic-filter";
  import ListarPendientesCaptarPrecioShowList from "../../listarcaptaciones/listarPendientesCaptarPrecioShowList";
  import {QUERY_GET_PENDIENTES} from "../../listarcaptaciones/graphql/graphql-listarcaptaciones";
  import CaptarDialogForm from "../captar-dialog-form/captar-dialog-form";
  import ConfirmPreciesDialog from "../confirm-precies-dialog";
  import MinMaxDatePicker from "../../../../../../../shared/components/min-max-date-picker/min-max-date-picker";
  import GenericNomencladorSelect
    from "../../../../../../../shared/components/generic_nomenclador_select/generic-nomenclador-select";

  export default {
    name: "step-captar-precio",
    components: {
      MinMaxDatePicker,
      ConfirmPreciesDialog,
      CaptarDialogForm,
      ListarPendientesCaptarPrecioShowList,
      GenericFilter,
      GenericNomencladorSelect
    },
    props: {
      establesimientoId: {
        type: Number,
        default: -1,
        required: true
      }
    },
    data() {
      return {
        incidencia: {
          id: 1,
          description: 'E0:Establecimiento visitado'
        },
        text: 1,
        mode: false,
        dialog: false,
        dialogPrecio: false,
        currentVariedadModel: {
          specs: [],
          variedadDescription: '-',
          precio: 0,
          incidencia: -1,
          observacion: -1

        },
        query: {
          query: QUERY_GET_PENDIENTES,
          variables: {
            establishmentId: this.establesimientoId,
            start: "2019-04-01",
            end: "2019-04-04",
            page: 0,
            size: 5

          }
        },

        modelMoneda: {id: -1, description: 'Seleccione'},
        preciosCaptados: {},
        items: [],
        total: 0,
        filterModel: {},
        paginModel: {
          page: 1,
          rowsPerPage: 5,
          total: 0
        },
        loading: false
      }
    }, watch: {
      // paginModel(val){
      //   console.log(val);
      // }
    },
    methods: {
      openModal($event) {
        debugger;
        console.log($event);

        this.currentVariedadModel = {...$event};
        this.currentVariedadModel.incidencia = this.incidencia;
        this.dialog = true;
        // this.mode = true;
      },
      changeIncidence($event) {
        debugger;
        const obj = {
          incidencia: {
            id: -1
          },
          observacion: {
            id: -1
          },
          precio: 0
        };
        switch ($event.id) {
          case 1: {
            this.emitValues(this.status(), this.preciosCaptados);
            break;
          }
          case 2: {
            obj.incidencia.id = 2;
            this.emitValues(true, {"1": obj});
            break;
          }
          case 3: {
            obj.incidencia.id = 3;
            this.emitValues(true, {"1": obj});
            break;
          }
        }
      },
      emitValues(status, values) {
        this.$emit('captacion-status', status);
        this.$emit('captacion-values', values);
      },
      save($event) {
        debugger;
        this.preciosCaptados[$event.variedadId] = {...$event};
        const current = this.items.filter(e => e.variedadId === $event.variedadId)[0];
        current.incidencia = $event.incidencia;
        current.precio = $event.precio;
        current.observacion = $event.observacion;
        this.$emit('captacion-status', this.status());

        this.$emit('captacion-values', this.preciosCaptados);
      },
      status() {
        debugger
        if (this.incidencia.id === 1) {
          const a =(Object.keys(this.preciosCaptados).length === this.total);
          return a;
        }
        return this.incidencia.id !== -1;

      },
      updateFilter($event) {

        //this.text+=1;
        this.paginModel = {
          page: 1,
          rowsPerPage: this.paginModel.rowsPerPage
        };
        console.log($event);
        // this.fetchItems();
      },
      updatePagination($event) {
        //this.text+=1;
        debugger;
        this.paginModel.page = $event.page;
        this.paginModel.rowsPerPage = $event.rowsPerPage;
        console.log($event);
        this.fetchItems();
      },
      prueba(a, b) {
        this.text += 1;
        console.log(a, b, 'ooooo', this.text);
      },

      changeIncidencia($event) {
        if ($event.id === 1) {
          this.emitValue();
        } else if ($event.id === 3) {
          const fakeCap = {
            specs: [],
            variedadDescription: '-',
            precio: 0,
            incidencia: 3,
            observacion: -1

          };
          this.emitValue({1: fakeCap});
        }
      },
      emitValue(val = this.preciosCaptados) {
        this.$emit('captacion-status', this.status);
        this.$emit('captacion-values', val);
      },
      fetchItems() {

        this.loading = true;
        const a = this.query;
        this.query.variables.page = this.paginModel.page - 1;
        this.query.variables.size = this.paginModel.rowsPerPage;
        debugger;
        this.$apollo.query(this.query).then((data) => {
          debugger;
          // const formOriginal = {
          //   precio:0,
          //   incidencia: -1,
          //   observacion: -1
          // };
          this.items = data.data.captacionesPendientes.map(e => {

            const temp = this.preciosCaptados[e.variedadId];
            // const form = {...formOriginal};
            return temp ? temp : {
              ...e,
              precio: 0,
              incidencia: -1,
              observacion: -1,
              precioObservado: 0,
              correlacionado: false,
              cantObservada: 0,
              tipoUMObservada: -1,
              tipoUmActual: -1
            }
          });
          this.loading = false;
          this.total = this.items.length > 0 ? this.items[0].total : 0
        });

      }
    }
  }
</script>

<style scoped>

</style>
