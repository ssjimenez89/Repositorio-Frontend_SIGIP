<template>
  <v-card class="add_container">
    <v-layout row>
      <v-flex xs12>
        <v-card class="card--flex-toolbar">
          <v-toolbar card color="primary" dark>
            <v-toolbar-title class="subheading">
              {{$t('applications.onei_ipc.modules.caracteristicas.page.view.form_title')}}
            </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <v-form @submit.prevent="submit">
              <v-container fluid grid-list-xl>
                <v-layout wrap>
                  <v-flex md6 xs12>
                    <v-text-field
                      :label="this.$i18n.t('applications.onei_ipc.modules.caracteristicas.page.edit.fields.name')+'*'"
                      :rules="rules.description"
                      color="purple darken-2"
                      disabled
                      required
                      v-model="save.description"
                    ></v-text-field>
                  </v-flex>

                  <v-flex md4 xs12>
                    <v-checkbox
                      :label="this.$i18n.t('applications.onei_ipc.modules.caracteristicas.page.edit.fields.active')"
                      disabled
                      v-model="save.active"
                    ></v-checkbox>
                  </v-flex>

                  <v-flex class="pb-0" md12 xs12>
                    <p class="text-especificaciones teal--text">
                      {{$t('applications.onei_ipc.modules.caracteristicas.page.view.fields.label_especificaciones')}} *
                    </p>
                  </v-flex>

                  <v-flex class="pt-0" md12 xs12>
                    <v-data-table
                      :headers="headers"
                      :items="save.especifications"
                      :rows-per-page-items="pageItems"
                      :rows-per-page-text="this.$i18n.t('applications.onei_ipc.components.table.dataTable.rowsPerPageText')"
                    >
                      <template slot="items" slot-scope="props">
                        <td>{{ props.item.description }}</td>
                        <td class="text-xs-center">
                          <v-tooltip top>
                            <v-icon slot="activator">
                              {{ props.item.active ? "done": "clear" }}
                            </v-icon>
                            <span>
                             {{ props.item.active
                                ? $t('applications.onei_ipc.modules.caracteristicas.page.list.action_list.estado.enable')
                                :$t('applications.onei_ipc.modules.caracteristicas.page.list.action_list.estado.disable')}}
                            </span>
                          </v-tooltip>
                        </td>
                      </template>

                      <template slot="no-data">
                        <div :value="true" color="error" icon="warning">
                          {{$t('applications.onei_ipc.components.table.no_data')}}
                        </div>
                      </template>

                      <template slot="pageText" slot-scope="props">
                        {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}
                      </template>
                    </v-data-table>
                  </v-flex>

                  <v-flex md12 xs12>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        @click="redirectToCaracteristicModule"
                        color="error"
                      >
                        Regresar
                      </v-btn>
                    </v-card-actions>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script lang="ts">
import VBtn from "@vuetify/components/VBtn";
import {VCard, VCardActions, VCardText, VCardTitle} from "@vuetify/components/VCard";
import VCheckbox from "@vuetify/components/VCheckbox";
import VChip from "@vuetify/components/VChip";
import {VDataTable} from "@vuetify/components/VDataTable";
import VDialog from "@vuetify/components/VDialog";
import VDivider from "@vuetify/components/VDivider";
import VForm from "@vuetify/components/VForm";
import {VSpacer} from "@vuetify/components/VGrid";
import VContainer from "@vuetify/components/VGrid/VContainer";
import VContent from "@vuetify/components/VGrid/VContent";
import VFlex from "@vuetify/components/VGrid/VFlex";
import VLayout from "@vuetify/components/VGrid/VLayout";
import VIcon from "@vuetify/components/VIcon";
import VSelect from "@vuetify/components/VSelect";
import VSlider from "@vuetify/components/VSlider";
import VSnackbar from "@vuetify/components/VSnackbar";
import VSubheader from "@vuetify/components/VSubheader";
import VSystemBar from "@vuetify/components/VSystemBar";
import VTextField from "@vuetify/components/VTextField";
import {VToolbar, VToolbarTitle} from "@vuetify/components/VToolbar";
import VTooltip from "@vuetify/components/VTooltip";
import {OBTAIN_CARACTERISTICA} from "./graphql/graphql-caracteristicas.js";

export default {
  name: "onei-caracteristicas-edit",
  components: {
    VCard,
    VCardTitle,
    VCardText,
    VTextField,
    VContainer,
    VContent,
    VDataTable,
    VLayout,
    VFlex,
    VForm,
    VCardActions,
    VBtn,
    VToolbar,
    VToolbarTitle,
    VTooltip,
    VIcon,
    VSpacer,
    VDivider,
    VSnackbar,
    VSelect,
    VSlider,
    VCheckbox,
    VDialog,
    VSubheader,
    VSystemBar,
    VChip,
  },
  data() {
    return {
      save: {
        description: "",
        active: true,
        especifications: []
      },
      rules: {
        description: [val => (val || "").length > 0 || this.$i18n
          .t(
            "applications.onei_ipc.messages.required"
          )],
        validateNotespecifications: (v) => {
          return this.validarEspecificacionEnUso(v);
        }
      },
      dialogNewEspecifications: false,
      headers: [],
      pageItems: [5, 10, 25, {"text": "Todos", "value": -1}],
      especification: "",
      editedIndex: -1,
      idEdit: null
    }
  },
  apollo: {
    save: {
      query: OBTAIN_CARACTERISTICA,
      variables() {
        return {
          id: this.$store.getters["@onei.ipc/getViewCharacteristicsId"].id
        }
      },
      fetchPolicy: 'network-only',
      update(data) {
        return data.charateristicById
      }
    },
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.headers = [
        {
          align: "left",
          sortable: false,
          text: this.$i18n
            .t(
              "applications.onei_ipc.modules.caracteristicas.page.view.fields.header_especificaciones.nombre"
            )
            .toString(),
          value: "nombre"
        },
        {
          sortable: false,
          align: "center",
          text: this.$i18n
            .t(
              "applications.onei_ipc.modules.caracteristicas.page.view.fields.header_especificaciones.estado"
            )
            .toString(),
          value: "estado"
        },
      ];
    },

    redirectToCaracteristicModule() {
      this.$router.push('/onei/sigip/ipc/caracteristicas')
    },
  },
  computed: {
    formDialogIsValid(): boolean {
      return (
        this.especification != "" &&
        this.validarEspecificacionEnUso(this.especification) === true
      )
    },
    titleDialog(): string {
      return this.editedIndex === -1
        ? this.$i18n.t("applications.onei_ipc.modules.caracteristicas.page.edit.fields.dialog_add.dialog_tittle").toString()
        : this.$i18n.t("applications.onei_ipc.modules.caracteristicas.page.edit.fields.dialog_edit.dialog_tittle").toString()
    }
  },
  watch: {}
}
</script>


<style lang="stylus" scoped>
  .text-especificaciones
    text-decoration underline
    font-weight 600
</style>

