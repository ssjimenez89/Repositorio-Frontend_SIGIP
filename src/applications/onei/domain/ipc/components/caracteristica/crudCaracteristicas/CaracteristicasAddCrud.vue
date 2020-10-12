<template>
  <v-card class="add_container">
    <v-layout row>
      <v-flex xs12>
        <v-card class="card--flex-toolbar">
          <v-toolbar card color="primary" dark>
            <v-toolbar-title class="subheading">
              {{$t('applications.onei_ipc.modules.caracteristicas.page.add.form_title')}}
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
                      :label="this.$i18n.t('applications.onei_ipc.modules.caracteristicas.page.add.fields.name')+'*'"
                      :rules="rules.description"
                      color="purple darken-2"
                      required
                      v-model="save.description"
                    ></v-text-field>
                  </v-flex>

                  <v-flex md4 xs12>
                    <v-checkbox
                      :label="this.$i18n.t('applications.onei_ipc.modules.caracteristicas.page.add.fields.active')"
                      v-model="save.active"
                    ></v-checkbox>
                  </v-flex>

                  <v-flex class="pb-0" md12 xs12>
                    <p class="text-especificaciones teal--text">
                      {{$t('applications.onei_ipc.modules.caracteristicas.page.add.fields.label_especificaciones')}} *
                    </p>
                  </v-flex>

                  <v-flex class="pt-0" md12 xs12>
                    <v-layout justify-end>
                      <v-btn
                        @click="openDialog"
                        class="white--text"
                        color="teal"
                        outline
                      >
                        {{$t('applications.onei_ipc.modules.caracteristicas.page.add.fields.dialog_add.button.adicionar_especificacion')}}
                      </v-btn>
                    </v-layout>

                    <v-dialog max-width="500px" v-model="dialogNewEspecifications">
                      <v-card>
                        <v-container>
                          <v-card-title class="pb-0">
                            <span class="headline">{{ titleDialog }}</span>
                          </v-card-title>
                          <v-card-text>
                            <v-container class="pt-0" grid-list-md>
                              <v-layout wrap>
                                <v-flex md6 sm12 xs12>
                                  <v-text-field
                                    :label="this.$i18n.t('applications.onei_ipc.modules.caracteristicas.page.add.fields.dialog_add.name')+'*'"
                                    :rules="[rules.validateNotespecifications]"
                                    v-model="especification"
                                  ></v-text-field>
                                </v-flex>
                              </v-layout>
                            </v-container>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn :disabled="!formDialogIsValid" @click.native="saveDialog" color="primary">
                              {{$t('applications.onei_ipc.modules.caracteristicas.page.add.fields.dialog_add.button.save')}}
                            </v-btn>
                            <v-btn @click.native="closeDialog" color="error">
                              {{$t('applications.onei_ipc.modules.caracteristicas.page.add.fields.dialog_add.button.cancel')}}
                            </v-btn>
                          </v-card-actions>
                        </v-container>
                      </v-card>
                    </v-dialog>

                    <v-data-table
                      :headers="headers"
                      :items="save.especifications"
                      :rows-per-page-items="pageItems"
                      :rows-per-page-text="this.$i18n.t('applications.onei_ipc.components.table.dataTable.rowsPerPageText')"
                    >
                      <template slot="items" slot-scope="props">
                        <td>{{ props.item.description }}</td>
                        <td class="text-md-center justify-center">
                          <v-menu bottom
                                  origin="center center"
                                  transition="scale-transition">
                            <v-btn icon slot="activator">
                              <v-icon>more_vert</v-icon>
                            </v-btn>
                            <v-list>
                              <v-list-tile @click="editItem(props.item)">
                                <v-list-tile-action>
                                  <v-icon>edit</v-icon>
                                </v-list-tile-action>
                                <v-list-tile-title>
                                  {{$t('applications.onei_ipc.modules.caracteristicas.page.edit.action_list.edit')}}
                                </v-list-tile-title>
                              </v-list-tile>
                              <v-list-tile @click="deleteItem(props.item)">
                                <v-list-tile-action>
                                  <v-icon>delete</v-icon>
                                </v-list-tile-action>
                                <v-list-tile-title>
                                  {{$t('applications.onei_ipc.modules.caracteristicas.page.edit.action_list.delete')}}
                                </v-list-tile-title>
                              </v-list-tile>
                            </v-list>
                          </v-menu>
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
                        :disabled="!formIsValid"
                        color="primary"
                        type="submit"
                      >
                        Registrar
                      </v-btn>

                      <v-btn
                        @click="redirectToCaracteristicModule"
                        color="error"
                      >
                        Cancelar
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
import {VList, VListTile, VListTileAction, VListTileContent, VListTileTitle} from "@vuetify/components/VList";
import VMenu from "@vuetify/components/VMenu";
import VSelect from "@vuetify/components/VSelect";
import VSlider from "@vuetify/components/VSlider";
import VSnackbar from "@vuetify/components/VSnackbar";
import VSubheader from "@vuetify/components/VSubheader";
import VSystemBar from "@vuetify/components/VSystemBar";
import VTextField from "@vuetify/components/VTextField";
import {VToolbar, VToolbarTitle} from "@vuetify/components/VToolbar";
import VTooltip from "@vuetify/components/VTooltip";
import {ADD_CARACTERISTICA} from "./graphql/graphql-caracteristicas.js";

export default {
  name: "onei-caracteristicas-add",
  components: {
    VCard,
    VCardTitle,
    VCardText,
    VTextField,
    VContainer,
    VContent,
    VDataTable,
    VLayout,
    VList,
    VListTile,
    VListTileAction,
    VListTileContent,
    VListTileTitle,
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
    VMenu,
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
      editedIndex: -1
    }
  },
  apollo: {},
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
              "applications.onei_ipc.modules.caracteristicas.page.add.fields.header_especificaciones.nombre"
            )
            .toString(),
          value: "nombre"
        },
        {
          sortable: false,
          align: "center",
          text: this.$i18n
            .t(
              "applications.onei_ipc.modules.caracteristicas.page.add.fields.header_especificaciones.acciones"
            )
            .toString(),
          value: "acciones"
        },
      ];
    },
    closeDialog() {
      this.dialogNewEspecifications = false;
      this.especification = "";
      this.editedIndex = -1;
    },
    saveDialog() {
      if (this.especification != "") {
        const objectSave = {id: null, description: this.especification, active: true};
        if (this.editedIndex > -1) {
          // Object.assign(this.save.especifications[this.editedIndex], this.especification)
          this.save.especifications.splice(this.editedIndex, 1, objectSave)
        } else {
          this.save.especifications.push(objectSave);
        }
        this.closeDialog();
      }
    },
    openDialog() {
      this.dialogNewEspecifications = true;
    },
    editItem(item) {
      this.editedIndex = this.save.especifications.indexOf(item);
      this.especification = item.description;
      this.dialogNewEspecifications = true
    },
    deleteItem(item) {
      const index = this.save.especifications.indexOf(item);
      this.save.especifications.splice(index, 1)
    },
    redirectToCaracteristicModule() {
      this.$router.push('/onei/sigip/ipc/caracteristicas')
    },
    validarEspecificacionEnUso(v) {
      let dime = true;
      if (v != "") {
        this.save.especifications.forEach((value, index) => {
          if (value.description === v && (this.editedIndex === -1 || this.editedIndex !== index)) {
            dime = "Ya existe una especificación con ese nombre";
          }

        })
      }
      return dime;
    },
    submit() {
      this.$apollo.mutate({
        mutation: ADD_CARACTERISTICA,
        variables: {
          characteristic: this.save,
        },
      }).then((data) => {
        this.$store.dispatch('showMessage', {
          message: 'Se ha guardado correctamente la característica y sus especificaciones.',
          type: 'success'
        });
        this.redirectToCaracteristicModule();
      }).catch((error) => {
        this.$store.dispatch('showMessage', {
          message: 'Error al intentar registrar la característica y sus especificaciones.',
          type: 'error'
        });
        console.error(error)
      })
    }
  },
  computed: {
    formIsValid(): boolean {
      return (
        this.save.name != "" &&
        this.save.especifications.length != 0
      )
    },
    formDialogIsValid(): boolean {
      return (
        this.especification != "" &&
        this.validarEspecificacionEnUso(this.especification) === true
      )
    },
    titleDialog(): string {
      return this.editedIndex === -1
        ? this.$i18n.t("applications.onei_ipc.modules.caracteristicas.page.add.fields.dialog_add.dialog_tittle").toString()
        : this.$i18n.t("applications.onei_ipc.modules.caracteristicas.page.add.fields.dialog_edit.dialog_tittle").toString()
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

