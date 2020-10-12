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
                        v-model="active"
                      ></v-checkbox>
                    </v-flex>
                    <v-flex md4 xs12>
                      <v-text-field
                        :label="this.$i18n.t('applications.onei_ipc.modules.nomenclador.fields.code')"
                        color="purple darken-2"
                        required
                        v-model="code"
                      ></v-text-field>
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
  import {
    CLASSIFIERTYPE_BY_ID,
    EDIT_CLASSIFIERTYPE_MUTATION
  } from "../../../components/nomenclador/graphql/graphql-nomenclador.js";

  export default {
    name: "classifiertypeEdit",
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
        code: '',
        classifiertype: {},
        defaultSelect: this.$i18n
          .t(
            "applications.onei_ipc.modules.nomenclador.types.ClassifierType"
          ),
        nomenclators: [this.$i18n
          .t(
            "applications.onei_ipc.modules.nomenclador.types.ClassifierType"
          )]
      }
    },

    apollo: {
      classifiertype: {
        query: CLASSIFIERTYPE_BY_ID,
        variables() {
          return {
            id: this.$route.params.id,
          }
        },
        update(data) {
          this.name = data.classifierTypeById.description;
          this.active = data.classifierTypeById.active;
          this.code = data.classifierTypeById.codeClassifier;
          return data.classifierTypeById;
        }
      }
    },
    methods: {
      submit() {
        const result = this.$apollo.mutate({
          mutation: EDIT_CLASSIFIERTYPE_MUTATION,
          variables: {
            id: this.$route.params.id,
            description: this.name,
            active: this.active,
            codeClassifier: this.code

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
      this.$apollo.queries.classifiertype.refetch()
    },
    computed: {
      formIsValid(): boolean {
        return (
          this.name != "" && this.code != ""
        )
      }
    }
  }
</script>

<style scoped>

</style>
