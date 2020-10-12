<template>
  <v-form ref="frmPlanificacion" v-model="valid">
    <v-layout row>
      <v-flex md3 sm3 xs3 class="pb-3">
        <v-combobox
          :items="propAnnos"
          :rules="[v => !!v || this.$i18n.t('applications.onei_ipc.messages.required')]"
          label="Años*"
          v-model="selectedyear"
        ></v-combobox>
      </v-flex>
      <v-flex md3 sm3 xs3>
        <v-btn
          @click="submit"
          color="success"
          :disabled="!valid"
        >
          {{$t('applications.onei_ipc.modules.planificacion.btn_generar')}}
        </v-btn>
      </v-flex>
    </v-layout>

  </v-form>

</template>

<script lang="ts">
import VBtn from "@vuetify/components/VBtn";
import VCombobox from "@vuetify/components/VCombobox";
import VDialog from "@vuetify/components/VDialog";
import VForm from "@vuetify/components/VForm";
import VFlex from "@vuetify/components/VGrid/VFlex";
import VLayout from "@vuetify/components/VGrid/VLayout";
import VIcon from "@vuetify/components/VIcon";
import {GENERAR_PLANIFICACION_MUTATION, QUERY_GENERAR_ANNOS} from "./graphql/graphql-planificacion.js";

export default {
  name: "onei-generar-planificacion",
  components: {
    VLayout,
    VFlex,
    VForm,
    VBtn,
    VIcon,
    VDialog,
    VCombobox,
  },
  props: {
    propAnnos: {
      type: Array,
      required: true
    },
  },
  methods: {
    redirectToPlanificacion() {
      this.$router.replace('/onei/sigip/ipc/planificacion')
    },
    submit() {
      if (this.$refs.frmPlanificacion.validate()) {
        const salvar = this.$apollo.mutate({
          mutation: GENERAR_PLANIFICACION_MUTATION,
          variables: {
            anno: this.selectedyear
          },
          update: (store, data) => {
            const dataquery = store.readQuery({
              query: QUERY_GENERAR_ANNOS, variables: {
                annos: 5,
              }
            });
            dataquery.generarAnnos.forEach((val, index) => {
              if (val === data.data.generarPlanificacionFecha) {
                dataquery.generarAnnos = dataquery.generarAnnos.filter(item => item !== val);
                this.$refs.frmPlanificacion.reset();
                return;
              }
            });
            store.writeQuery({
              query: QUERY_GENERAR_ANNOS, variables: {
                annos: 5,
              }, data: dataquery
            });

          },
        }).then((data) => {
          this.$store.dispatch('showMessage', {
            message: this.$i18n.t("applications.onei_ipc.modules.planificacion.messages.add_success "),
            type: 'success'
          });
          this.redirectToPlanificacion();
        }).catch((error) => {
          this.$store.dispatch('showMessage', {
            message: this.$i18n.t("applications.onei_ipc.modules.planificacion.messages.add_error "),
            type: 'error'
          });
          // console.error(error)
        })
      }
    }
  },

  data() {
    return {
      valid:false,
      selectedyear: null
    };
  },
}
</script>

<style scoped>

</style>
