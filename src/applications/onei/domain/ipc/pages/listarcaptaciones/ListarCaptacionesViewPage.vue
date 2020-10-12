<template xmlns="http://www.w3.org/1999/html">
  <main-content
    :title="$i18n.t('applications.onei_ipc.modules.listarCaptaciones.page_title')"

  >
    <v-card-text class="pa-0">

      <generic-filter

        :only="['mes','year','dpaId','establecimientoId','variedadId','fecha','mercado','tipologia','usuario']">

        <!--            <v-flex md3>-->
        <!--              <list-years-select-->
        <!--                v-model="yearS"-->
        <!--                :label="this.$i18n.t('applications.onei_ipc.modules.listarCaptaciones.self_component.year')"-->
        <!--              ></list-years-select>-->

        <!--              <AutocompleteEstablecimientoFiled/>-->
        <!--              <list-years-select-->
        <!--                v-model="yearS"-->
        <!--                :label="this.$i18n.t('applications.onei_ipc.modules.listarCaptaciones.self_component.year')"-->
        <!--                @change="updateFilterYears($event)"-->
        <!--              ></list-years-select>-->
        <!--            </v-flex>-->

      </generic-filter>

          <listar-captaciones-show-list
            ref="tabla"
            :filter-model="filterModel"
            @delete-modal="deleteMod($event)"
            @update-modal="updateMod($event)"
            @view-modal="viewMod($event)"
          >
          </listar-captaciones-show-list>
          <confirm-dialog
            v-model="deleteDialog"
            body-text="Desea eliminar la captación?"
            @onAcept="aceptDelete($event)"
          ></confirm-dialog>
          <captar-dialog-form
            :view-mode="mode"
            v-model="viewUpdateDialog"
            :variedad="currentVariedadModel"
            @save="aceptUpdate($event)"
          ></captar-dialog-form>
          <!--<listar-pendientes-captar-precio-show-list v-show="!show"/>-->
          <v-layout align-end class="mr-4" column>
            <v-layout align-end row>

              <v-btn color="primary" to="./listarcaptacionesall">
                {{$t('applications.onei_ipc.modules.listarCaptaciones.self_component.faltantes')}}
              </v-btn>


              <v-btn color="primary" to=".">
                {{$t('applications.onei_ipc.modules.listarCaptaciones.self_component.expor')}}
              </v-btn>


        </v-layout>
      </v-layout>
    </v-card-text>
  </main-content>
</template>

<script>
  import listYearsSelect from "../../../../../../shared/components/listYearsSelect/listYearsSelect";
  import ListarCaptacionesFilter from "../../components/listarcaptaciones/ListarCaptacionesFilter";
  import ListarCaptacionesShowList from "../../components/listarcaptaciones/ListarCaptacionesShowList";
  import ListarPendientesCaptarPrecioShowList
    from "../../components/listarcaptaciones/listarPendientesCaptarPrecioShowList"
  import {
    DELETE_CAPTACION_MUTATION,
    UPDATE_CAPTACION_MUTATION,
    QUERY_GET_CAPTACIONES
  } from "../../components/listarcaptaciones/graphql/graphql-listarcaptaciones";
  import VContainer from "@vuetify/components/VGrid/VContainer";
  import VContent from "@vuetify/components/VGrid/VContent";
  import VBtn from "@vuetify/components/VBtn/VBtn";
  import VFlex from "@vuetify/components/VGrid/VFlex";
  import {VSpacer} from "@vuetify/components/VGrid";
  import VLayout from "@vuetify/components/VGrid/VLayout";
  import VCard from "@vuetify/components/VCard/VCard";
  import {VCardActions, VCardText} from "@vuetify/components/VCard";
  import VCardTitle from "@vuetify/components/VCard/VCardTitle";
  import GenericFilter from "../../../../../../shared/components/generic-filter/generic-filter";
  import AutocompleteEstablecimientoFiled
    from "../../../../../../shared/components/autocomplete-establecimiento-field/autocomplete-establecimiento-filed";
  import ConfirmDialog from "../../../../../../shared/components/confirm-dialog/confirm-dialog";
  import CaptarDialogForm from "../../components/listar-faltantes/captar-dialog-form/captar-dialog-form"
  import MainContent from "@shared/components/main-content/main-content";


  export default {
    name: "ListarCaptacionesViewPage",
    components: {
      listYearsSelect,
      CaptarDialogForm,
      ConfirmDialog,
      AutocompleteEstablecimientoFiled,
      GenericFilter,
      ListarPendientesCaptarPrecioShowList,
      ListarCaptacionesFilter,
      ListarCaptacionesShowList,
      VCard,
      VCardActions,
      VCardText,
      VCardTitle,
      VContainer,
      VContent,
      VBtn,
      VFlex,
      VSpacer,
      MainContent,
      VLayout


    },
    data: () => ({
      show: true,
      mode: false,
      currentVariedadModel: {},
      viewUpdateDialog: false,
      deleteDialog: false,
      deleteId: -1,
      filterModel: {},
      yearS: -1
    }),
    methods: {

      updateFilter($event) {
        debugger;
        this.filterModel = {...$event};
      },
      updateFilterYears($event) {
        debugger;
        this.filterModel.year = $event;
        this.updateFilter(this.filterModel);
      },
      deleteMod($event) {
        debugger;
        this.deleteId = $event;
        this.deleteDialog = true;
      },
      viewMod($event) {
        debugger;
        this.mode = true;
        this.currentVariedadModel = $event;
        console.log(this.currentVariedadModel);
        this.viewUpdateDialog = true;

      },
      aceptUpdate($event) {
        debugger;
        const mutation = {
          mutation: UPDATE_CAPTACION_MUTATION,
          variables: {
            capt: {
              id: $event.id,
              incidence: $event.incidencia.id,
              observation: $event.observacion.id,
              price: $event.precio,
              dvarEstabId: -1,
              users: 5,
              establishment: 3
            }
          },
          update: () => {
            this.$apolloCache.deleteFromQuery('catchmentsByFilter', 1);
          }
        };
        this.$apollo.mutate(mutation).then(data => {
          debugger;
          console.log(data.data.editCatchment + "");
          this.$store.dispatch("showMessage", {
            message: "Captación editada satisfactoriamente.",
            type: "success"
          });
          // this.$router.push("/onei/sigip/ipc/listarcaptaciones");
        });
      },
      updateMod($event) {
        this.mode = false;
        this.currentVariedadModel = {...$event};
        this.viewUpdateDialog = true;

      },
      aceptDelete($event) {
        const mutation = {
          mutation: DELETE_CAPTACION_MUTATION,
          variables: {
            id: this.deleteId
          },
          update: (cache, data) => {
            console.log(cache);
            this.$apolloCache.invalidateQuery('catchmentsByFilter');

          }
        };
        this.$apollo.mutate(mutation).then(data => {
          console.log(this.$apollo);
          this.$refs.tabla.get();
          console.log(data.data.deleteCatchment + "");
          this.$store.dispatch("showMessage", {
            message: "Captación eliminada satisfactoriamente.",
            type: "success"
          });

        });
      }

    },


  }
</script>

<style lang="stylus" scoped>
  /*.content-padding*/
  /*  padding 200px 60px 200px 60px !important*/

</style>
