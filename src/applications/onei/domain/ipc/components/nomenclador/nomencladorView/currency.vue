<template>
  <v-container>
    <v-card class="add_container">
      <v-layout align-center justify-center row>
        <v-flex xs12>
          <v-card class="card--flex-toolbar">
            <v-toolbar card color="primary" dark>
              <v-toolbar-title class="subheading">
                {{$t('applications.onei_ipc.modules.nomenclador.pages.view_nomenclador.form_title')}}
              </v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
              <v-form @submit.prevent="submit" ref="formEditNomenclador">
                <v-container fluid grid-list-xl>
                  <v-layout wrap>
                    <v-flex md4 xs12>
                      <v-text-field
                        :label="this.$i18n.t('applications.onei_ipc.modules.nomenclador.fields.name')"
                        color="purple darken-2"
                        disabled=""
                        v-model="name"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md4 xs12>
                      <v-select
                        :items="nomenclators"
                        :label="this.$i18n.t('applications.onei_ipc.modules.nomenclador.fields.type_nomenclator')"
                        disabled=""
                        v-model="defaultSelect"
                      ></v-select>
                    </v-flex>
                    <v-flex md4 xs12>
                      <v-checkbox
                        :label="this.$i18n.t('applications.onei_ipc.modules.nomenclador.fields.active')"
                        disabled=""
                        v-model="active"
                      ></v-checkbox>
                    </v-flex>
                    <v-flex md4 xs12>
                      <v-text-field
                        :label="this.$i18n.t('applications.onei_ipc.modules.nomenclador.fields.acronym')"
                        color="purple darken-2"
                        disabled=""
                        v-model="acronym"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md12 xs12>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="primary"
                          to="/onei/sigip/ipc/nomenclador"
                        >
                          Cerrar
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
  </v-container>

</template>


<script lang="ts">
  import VBtn from "@vuetify/components/VBtn";
  import {VCard, VCardActions, VCardText, VCardTitle} from "@vuetify/components/VCard";
  import VCheckbox from "@vuetify/components/VCheckbox";
  import VChip from "@vuetify/components/VChip";
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
  import {CURRENCY_BY_ID} from "../../../components/nomenclador/graphql/graphql-nomenclador.js";

  export default {
    name: "currencyEdit",
    components: {
      VCard,
      VCardTitle,
      VCardText,
      VTextField,
      VContainer,
      VContent,
      VLayout,
      VFlex,
      VForm,
      VCardActions,
      VBtn,
      VToolbar,
      VToolbarTitle,
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
        name: '',
        active: '',
        acronym: '',
        currency: {},
        defaultSelect: this.$i18n
          .t(
            "applications.onei_ipc.modules.nomenclador.types.Currency"
          ),
        nomenclators: [this.$i18n
          .t(
            "applications.onei_ipc.modules.nomenclador.types.Currency"
          )]
      }
    },

    apollo: {
      currency: {
        query: CURRENCY_BY_ID,
        variables() {
          return {
            id: this.$route.params.id,
          }
        },
        update(data) {
          this.name = data.currencyById.description;
          this.active = data.currencyById.active;
          this.acronym = data.currencyById.acronym;
          return data.currencyById;
        }
      }
    },
    created() {
      this.$apollo.queries.currency.refetch()
    },
  }
</script>

<style scoped>

</style>
