<template>
  <div>
    <main-content title="Pendientes a captar"
                  :cancelOpts="{to:'/'}"
    >
      <generic-filter
       :only="['mercado','tipologia','mes','dpaId','variedadId','fecha','establecimientoId']"
      ></generic-filter>
      <listado-captaciones-pendientes></listado-captaciones-pendientes>
      <template slot="botones">
        <v-btn color="primary" to="./listarfaltantes">
          Captar precio
        </v-btn>
        <v-btn color="primary" @click="validar"
               :loading="loading"
               v-permisos:only="[]"
        >

          Cerrar mes
        </v-btn>
      </template>
    </main-content>
    <confirm-dialog
      body-text="Está seguro que desea cerrar la planificación del mes actual?"
      v-model="dialog"
      @onCancel="onClose('cerrado')"
      @onAcept="onClose('ok')"
    >

    </confirm-dialog>
    <confirm-dialog
      onlyAceptButton
      body-text="Debe completar el proceso de captación para poder cerrar el mes."
      v-model="dialog2"

    >

    </confirm-dialog>

  </div>

</template>

<script>
  import MainContent from "@shared/components/main-content/main-content";
  import VBtn from "@vuetify/components/VBtn";
  import ListadoCaptacionesPendientes from "../../components/ListadoCaptacionesPendientes/listadoCaptacionesPendientes";
  import ConfirmDialog from "../../../../../../shared/components/confirm-dialog/confirm-dialog";
  import {QUERY_VALIDAR_CIERRE_MES} from "../../components/listarcaptaciones/graphql/graphql-listarcaptaciones"
  import GenericFilter from "../../../../../../shared/components/generic-filter/generic-filter";

  export default {
    name: "ListarPendientesCaptar",
    components: {
      GenericFilter,
      ConfirmDialog,
      ListadoCaptacionesPendientes,
      MainContent,
      VBtn
    },
    data() {
      return {
        loading: false,
        dialog: false,
        dialog2: false
      }
    },
    methods: {
      validar() {
          this.loading = true;
        const query = {
          query: QUERY_VALIDAR_CIERRE_MES,
          fetchPolicy: 'no-cache'
        };
        this.$apollo.query(query).then((data) => {
            debugger;
          this.loading= false;
          this.dialog = data.data.isAllCathedValidation;
          this.dialog2 = !this.dialog;
          t
        });

      }
    }
  }
</script>

<style scoped>

</style>
