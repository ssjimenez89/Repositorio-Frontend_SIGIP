<template>
  <v-container>
    <v-card class="add_container">
      <v-layout align-center justify-center row>
        <v-flex xs12>
          <v-card class="card--flex-toolbar">
            <v-toolbar card color="primary" dark>
              <v-toolbar-title class="subheading">
                {{$t('applications.onei_ipc.modules.nomenclador.pages.edit_nomenclador.form_title')}}
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
                        required
                        v-model="descripcion"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md4 xs12>
                      <v-select
                        :items="nomenclators"
                        :label="this.$i18n.t('applications.onei_ipc.modules.nomenclador.fields.type_nomenclator')"
                        disabled=""
                        v-model="defaultSelect"
                      >
                      </v-select>
                    </v-flex>
                    <v-flex md4 xs12>
                      <v-checkbox
                        :label="this.$i18n.t('applications.onei_ipc.modules.nomenclador.fields.active')"
                        v-model="activo"
                      ></v-checkbox>
                    </v-flex>
                    <v-flex md12 xs12>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          :disabled="!formIsValid"
                          color="primary"
                          type="submit"
                        >
                          Guardar
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
  import {REGION_BY_ID, EDIT_REGION_MUTATION} from "../../../components/nomenclador/graphql/graphql-nomenclador.js";

  export default {
    name: "regionEdit",
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
        descripcion: '',
        activo: '',
        region: {},
        defaultSelect: this.$i18n
          .t(
            "applications.onei_ipc.modules.nomenclador.types.Region"
          ),
        nomenclators: [this.$i18n
          .t(
            "applications.onei_ipc.modules.nomenclador.types.Region"
          )]
      }
    },
    apollo: {
      region: {
        query: REGION_BY_ID,
        variables() {
          return {
            id: this.$route.params.id,
          }
        },
        update(data) {
          // console.log(data.categoryById)
          debugger;
          this.descripcion = data.regionById.descripcion;
          this.activo = data.regionById.activo;
          return data.regionById;
        }
      }
    },
    methods: {
      submit() {
        const result = this.$apollo.mutate({
          mutation: EDIT_REGION_MUTATION,
          variables: {
            id: this.$route.params.id,
            descripcion: this.descripcion,
            activo: this.activo
          },
        }).then((data) => {
          this.$store.dispatch('showMessage', {
            message: this.$i18n.t("applications.onei_ipc.modules.nomenclador.messages.edit_success "),
            type: 'success'
          });
          this.$router.push('/onei/sigip/ipc/nomenclador')
        }).catch((error) => {
          this.$store.dispatch('showMessage', {
            message: this.$i18n.t("applications.onei_ipc.modules.nomenclador.messages.edit_error "),
            type: 'error'
          });
          console.error(error)
        })
      }
    },
    created() {
      this.$apollo.queries.cargo.refetch();
    },
    computed: {
      formIsValid(): boolean {
        return (
          this.descripcion != ""
        )
      }
    }
  }
</script>

<style scoped>

</style>
