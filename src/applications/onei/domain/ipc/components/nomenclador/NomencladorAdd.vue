<template>
  <v-card class="add_container">
    <v-layout row>
      <v-flex xs12>
        <v-card class="card--flex-toolbar">
          <v-toolbar card color="primary" dark>
            <v-toolbar-title class="subheading">
              {{$t('applications.onei_ipc.modules.nomenclador.pages.add_nomenclador.form_title')}}
            </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <v-form @submit.prevent="submit" ref="formAddNomenclador">
              <v-container fluid grid-list-xl>
                <v-layout wrap>

                  <v-flex md4 xs12>
                    <v-text-field
                      :label="this.$i18n.t('applications.onei_ipc.modules.nomenclador.fields.name')"
                      :rules="rules.name"

                      required
                      v-model="name"
                    ></v-text-field>
                  </v-flex>

                  <v-flex d-flex md4 xs12>
                    <v-select
                      :items="nomenclators"
                      :label="this.$i18n.t('applications.onei_ipc.modules.nomenclador.fields.type_nomenclator')"
                      :rules="[v => !!v ||  this.$i18n.t('applications.onei_ipc.messages.required')]"
                      v-model="nomenclatorSelected"
                    ></v-select>
                  </v-flex>

                  <v-flex md4 xs12>
                    <v-checkbox
                      :label="this.$i18n.t('applications.onei_ipc.modules.nomenclador.fields.active')"
                      v-model="activo"
                      color="primary"
                    ></v-checkbox>
                  </v-flex>

                  <v-flex md4 v-show="labelSiglas" xs12>
                    <v-text-field
                      :label="this.$i18n.t('applications.onei_ipc.modules.nomenclador.fields.acronym')"

                      required
                      v-model="acronym"
                    ></v-text-field>
                  </v-flex>

                  <v-flex md4 v-show="labelCodigo" xs12>
                    <v-text-field
                      :label="this.$i18n.t('applications.onei_ipc.modules.nomenclador.fields.code')"
                      color="purple darken-2"
                      required
                      v-model="code"
                    ></v-text-field>
                  </v-flex>

                  <v-flex md4 v-show="labelCodigoDpa" xs12>
                    <v-text-field
                      :label="this.$i18n.t('applications.onei_ipc.modules.nomenclador.fields.code')"

                      required
                      v-model="codedpa"
                    ></v-text-field>
                  </v-flex>

                  <v-flex d-flex md4 v-if="labelCategorias" xs12>
                    <v-select
                      :items="categories"
                      :label="this.$i18n.t('applications.onei_ipc.modules.nomenclador.fields.categories')"
                      :rules="[v => !!v ||  this.$i18n.t('applications.onei_ipc.messages.required')]"
                      item-text="description"
                      item-value="id"
                      v-model="categorySelected"
                    ></v-select>
                  </v-flex>

                  <v-flex d-flex md4 v-if="labelRegiones" xs12>
                    <v-select
                      :items="regiones"
                      :label="this.$i18n.t('applications.onei_ipc.modules.nomenclador.fields.regiones')"
                      :rules="[v => !!v ||  this.$i18n.t('applications.onei_ipc.messages.required')]"
                      item-text="descripcion"
                      item-value="id"
                      v-model="regionSelected"
                    ></v-select>
                  </v-flex>

                  <v-flex md4 v-if="labelImputado" xs12>
                    <v-checkbox
                      :label="this.$i18n.t('applications.onei_ipc.modules.nomenclador.fields.imputed')"
                      v-model="imputado"
                      color="primary"
                    ></v-checkbox>
                  </v-flex>

                  <v-flex md12 xs12>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        :disabled="!formIsValid"
                        color="success"
                        type="submit"
                      >
                        Registrar
                      </v-btn>
                      <v-btn
                        :to="`/onei/sigip/ipc/nomenclador/`"
                        color="error"
                        type="button"
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
    CARGO_MUTATION,
    REGION_MUTATION,
    CATEGORY_MUTATION,
    CLASSIFIERTYPE_MUTATION,
    CURRENCY_MUTATION,
    DPA_MUTATION,
    INCIDENCE_MUTATION,
    MARKET_MUTATION,
    MEASUREMENTUNIT_MUTATION,
    MEASUREMENTUNITTYPE_MUTATION,
    OBSERVATION_MUTATION,
    QUERY_GET_REGIONES,
    QUERY_GET_CATEGORIES,
    QUERY_GET_MEASUREMENTUNITTYPE,
    TYPOLOGY_MUTATION,
    VARIETYTYPE_MUTATION,
    WEIGHINGTYPE_MUTATION
  } from "./graphql/graphql-nomenclador.js";

  export default {
    name: "onei-nomenclador-add",
    props: {
      model: {
        required: false,
        type: Object,
        default: () => {
          return {
            nombre: '',
            tipo: -1
          }
        }
      },
      editMode: {
        required: false,
        type: Boolean,
        default: false
      }
    },
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
    created() {
      this.initialize();
    },
    methods: {
      initialize() {
        this.nomenclators = [this.cargo, this.category, this.observation, this.incidence, this.market, this.typology, this.dpa, this.currency, this.weighingtype, this.varietytype, this.classifiertype, this.measurementunittype, this.region]
      },
      redirectToNomenclatorModule() {
        this.$router.push('/onei/sigip/ipc/nomenclador')
      },
      submit() {
        switch (this.nomenclatorSelected) {
          case "Cargo": {
            const result = this.$apollo.mutate({
              mutation: CARGO_MUTATION,
              variables: {
                descripcion: this.name,
                activo: this.activo
              },
            }).then((data) => {
              this.$store.dispatch('showMessage', {
                message: this.$i18n.t("applications.onei_ipc.modules.nomenclador.messages.add_success "),
                type: 'success'
              });
              this.redirectToNomenclatorModule();
            }).catch((error) => {
              this.$store.dispatch('showMessage', {
                message: this.$i18n.t("applications.onei_ipc.modules.nomenclador.messages.add_error "),
                type: 'error'
              });
              console.error(error)
            });
            break;
          }
          case "Región": {
            const result = this.$apollo.mutate({
              mutation: REGION_MUTATION,
              variables: {
                descripcion: this.name,
                activo: this.activo
              },
            }).then((data) => {
              this.$store.dispatch('showMessage', {
                message: this.$i18n.t("applications.onei_ipc.modules.nomenclador.messages.add_success "),
                type: 'success'
              });
              this.redirectToNomenclatorModule();
            }).catch((error) => {
              this.$store.dispatch('showMessage', {
                message: this.$i18n.t("applications.onei_ipc.modules.nomenclador.messages.add_error "),
                type: 'error'
              });
              console.error(error)
            });
            break;
          }
          case "Categoría": {
            const result = this.$apollo.mutate({
              mutation: CATEGORY_MUTATION,
              variables: {
                description: this.name,
                active: this.activo
              },
            }).then((data) => {
              this.$store.dispatch('showMessage', {
                message: this.$i18n.t("applications.onei_ipc.modules.nomenclador.messages.add_success "),
                type: 'success'
              });
              this.redirectToNomenclatorModule();
            }).catch((error) => {
              this.$store.dispatch('showMessage', {
                message: this.$i18n.t("applications.onei_ipc.modules.nomenclador.messages.add_error "),
                type: 'error'
              });
              console.error(error)
            });
            break;
          }
          case "Mercado": {
            const result = this.$apollo.mutate({
              mutation: MARKET_MUTATION,
              variables: {
                description: this.name,
                active: this.activo
              },
            }).then((data) => {
              this.$store.dispatch('showMessage', {
                message: this.$i18n.t("applications.onei_ipc.modules.nomenclador.messages.add_success "),
                type: 'success'
              });
              this.redirectToNomenclatorModule();
            }).catch((error) => {
              this.$store.dispatch('showMessage', {
                message: this.$i18n.t("applications.onei_ipc.modules.nomenclador.messages.add_error "),
                type: 'error'
              });
              console.error(error)
            });
            break;
          }
          case "Observación": {
            const result = this.$apollo.mutate({
              mutation: OBSERVATION_MUTATION,
              variables: {
                description: this.name,
                acronym: this.acronym,
                active: this.activo
              },
            }).then((data) => {
              this.$store.dispatch('showMessage', {
                message: this.$i18n.t("applications.onei_ipc.modules.nomenclador.messages.add_success "),
                type: 'success'
              });
              this.redirectToNomenclatorModule();
            }).catch((error) => {
              this.$store.dispatch('showMessage', {
                message: this.$i18n.t("applications.onei_ipc.modules.nomenclador.messages.add_error "),
                type: 'error'
              });
              console.error(error)
            });
            break;
          }
          case "Incidencia": {
            const result = this.$apollo.mutate({
              mutation: INCIDENCE_MUTATION,
              variables: {
                description: this.name,
                acronym: this.acronym,
                active: this.activo
              },
            }).then((data) => {
              this.$store.dispatch('showMessage', {
                message: this.$i18n.t("applications.onei_ipc.modules.nomenclador.messages.add_success "),
                type: 'success'
              });
              this.redirectToNomenclatorModule();
            }).catch((error) => {
              this.$store.dispatch('showMessage', {
                message: this.$i18n.t("applications.onei_ipc.modules.nomenclador.messages.add_error "),
                type: 'error'
              });
              console.error(error)
            });
            break;
          }
          case "Tipología": {
            const result = this.$apollo.mutate({
              mutation: TYPOLOGY_MUTATION,
              variables: {
                description: this.name,
                imputed: this.imputado,
                active: this.activo,
                categoryId: this.categorySelected
              },
            }).then((data) => {
              this.$store.dispatch('showMessage', {
                message: this.$i18n.t("applications.onei_ipc.modules.nomenclador.messages.add_success "),
                type: 'success'
              });
              this.redirectToNomenclatorModule();
            }).catch((error) => {
              this.$store.dispatch('showMessage', {
                message: this.$i18n.t("applications.onei_ipc.modules.nomenclador.messages.add_error "),
                type: 'error'
              });
              console.error(error)
            });
            break;
          }
          case "DPA": {
            const result = this.$apollo.mutate({
              mutation: DPA_MUTATION,
              variables: {
                description: this.name,
                active: this.activo,
                code: this.codedpa,
                regionId: this.regionSelected
              },
            }).then((data) => {
              this.$store.dispatch('showMessage', {
                message: this.$i18n.t("applications.onei_ipc.modules.nomenclador.messages.add_success "),
                type: 'success'
              });
              this.redirectToNomenclatorModule();
            }).catch((error) => {
              this.$store.dispatch('showMessage', {
                message: this.$i18n.t("applications.onei_ipc.modules.nomenclador.messages.add_error "),
                type: 'error'
              });
              console.error(error)
            });
            break;
          }
          case "Moneda": {
            const result = this.$apollo.mutate({
              mutation: CURRENCY_MUTATION,
              variables: {
                description: this.name,
                acronym: this.acronym,
                active: this.activo
              },
            }).then((data) => {
              this.$store.dispatch('showMessage', {
                message: this.$i18n.t("applications.onei_ipc.modules.nomenclador.messages.add_success "),
                type: 'success'
              });
              this.redirectToNomenclatorModule();
            }).catch((error) => {
              this.$store.dispatch('showMessage', {
                message: this.$i18n.t("applications.onei_ipc.modules.nomenclador.messages.add_error "),
                type: 'error'
              });
              console.error(error)
            });
            break;
          }
          case "Tipo de ponderación": {
            const result = this.$apollo.mutate({
              mutation: WEIGHINGTYPE_MUTATION,
              variables: {
                description: this.name,
                active: this.activo
              },
            }).then((data) => {
              this.$store.dispatch('showMessage', {
                message: this.$i18n.t("applications.onei_ipc.modules.nomenclador.messages.add_success "),
                type: 'success'
              });
              this.redirectToNomenclatorModule();
            }).catch((error) => {
              this.$store.dispatch('showMessage', {
                message: this.$i18n.t("applications.onei_ipc.modules.nomenclador.messages.add_error "),
                type: 'error'
              });
              console.error(error)
            });
            break;
          }
          case "Tipo de variedad": {
            const result = this.$apollo.mutate({
              mutation: VARIETYTYPE_MUTATION,
              variables: {
                description: this.name,
                active: this.activo
              },
            }).then((data) => {
              this.$store.dispatch('showMessage', {
                message: this.$i18n.t("applications.onei_ipc.modules.nomenclador.messages.add_success "),
                type: 'success'
              });
              this.redirectToNomenclatorModule();
            }).catch((error) => {
              this.$store.dispatch('showMessage', {
                message: this.$i18n.t("applications.onei_ipc.modules.nomenclador.messages.add_error "),
                type: 'error'
              });
              console.error(error)
            });
            break;
          }
          case "Tipo de Unidad de Medida": {
            const result = this.$apollo.mutate({
              mutation: MEASUREMENTUNITTYPE_MUTATION,
              variables: {
                description: this.name,
                active: this.activo
              },
            }).then((data) => {
              this.$store.dispatch('showMessage', {
                message: this.$i18n.t("applications.onei_ipc.modules.nomenclador.messages.add_success "),
                type: 'success'
              });
              this.redirectToNomenclatorModule();
            }).catch((error) => {
              this.$store.dispatch('showMessage', {
                message: this.$i18n.t("applications.onei_ipc.modules.nomenclador.messages.add_error "),
                type: 'error'
              });
              console.error(error)
            });
            break;
          }
          case "Tipo de clasificador": {
            const result = this.$apollo.mutate({
              mutation: CLASSIFIERTYPE_MUTATION,
              variables: {
                description: this.name,
                active: this.activo,
                codeClassifier: this.code
              },
            }).then((data) => {
              this.$store.dispatch('showMessage', {
                message: this.$i18n.t("applications.onei_ipc.modules.nomenclador.messages.add_success "),
                type: 'success'
              });
              this.redirectToNomenclatorModule();
            }).catch((error) => {
              this.$store.dispatch('showMessage', {
                message: this.$i18n.t("applications.onei_ipc.modules.nomenclador.messages.add_error "),
                type: 'error'
              });
              console.error(error)
            });
            break;
          }
        }
      }
    },
    apollo: {
      categories: {
        query: QUERY_GET_CATEGORIES,
        update(data) {
          return data.categories;
        }
      },
      regiones: {
        query: QUERY_GET_REGIONES,
        update(data) {
          return data.regiones;
        }
      },
      tipo_unidad_medidas: {
        query: QUERY_GET_MEASUREMENTUNITTYPE,
        update(data) {
          return data.allMeasurementUnitTypes;
        }
      }

    },

    watch: {
      nomenclatorSelected() {
        switch (this.nomenclatorSelected) {
          case this.observation: {
            this.labelImputado = false;
            this.labelSiglas = true;
            this.labelCategorias = false;
            this.labelRegiones = false;
            this.labelCodigo = false;
            this.labelCodigoDpa = false;
            this.activo = true;
            break;
          }
          case this.incidence: {
            this.labelImputado = false;
            this.labelSiglas = true;
            this.labelCategorias = false;
            this.labelRegiones = false;
            this.labelCodigo = false;
            this.labelCodigoDpa = false;
            this.activo = true;
            break;
          }
          case this.typology: {
            this.labelImputado = true;
            this.labelCategorias = true;
            this.labelRegiones = false;
            this.labelSiglas = false;
            this.labelCodigo = false;
            this.labelCodigoDpa = false;
            this.activo = true;
            this.$apollo.queries.categories.refetch();
            break;
          }
          case this.dpa: {
            this.labelImputado = false;
            this.labelSiglas = false;
            this.labelCategorias = false;
            this.labelRegiones = true;
            this.labelCodigo = false;
            this.labelCodigoDpa = true;
            this.activo = true;
            break;
          }
          case this.currency: {
            this.labelImputado = false;
            this.labelSiglas = true;
            this.labelCategorias = false;
            this.labelRegiones = false;
            this.labelCodigo = false;
            this.labelCodigoDpa = false;
            this.activo = true;
            break;
          }
          case this.weighingtype: {
            this.labelImputado = false;
            this.labelSiglas = false;
            this.labelCategorias = false;
            this.labelRegiones = false;
            this.labelCodigo = false;
            this.labelCodigoDpa = false;
            this.activo = true;
            break;
          }
          case this.varietytype: {
            this.labelImputado = false;
            this.labelSiglas = false;
            this.labelCategorias = false;
            this.labelRegiones = false;
            this.labelCodigo = false;
            this.labelCodigoDpa = false;
            this.activo = true;
            break;
          }
          case this.measurementunittype: {
            this.labelImputado = false;
            this.labelSiglas = false;
            this.labelCategorias = false;
            this.labelRegiones = false;
            this.labelCodigo = false;
            this.labelCodigoDpa = false;
            this.activo = true;
            break;
          }
          case this.classifiertype: {
            this.labelImputado = false;
            this.labelSiglas = false;
            this.labelCategorias = false;
            this.labelRegiones = false;
            this.labelCodigo = true;
            this.labelCodigoDpa = false;
            this.activo = true;

            break;
          }
          default: {
            this.labelImputado = false;
            this.labelSiglas = false;
            this.labelCategorias = false;
            this.labelRegiones = false;
            this.labelUnidadMedidaType = false;
            this.labelCodigo = false;
            this.labelCodigoDpa = false;
            this.activo = true;
            break;
          }
        }
      }
    },
    computed: {
      formIsValid(): boolean {
        let value = true;
        if (this.nomenclatorSelected == this.typology) {
          if (this.categorySelected == null) {
            value = false
          }
        }
        if (this.nomenclatorSelected == this.observation || this.nomenclatorSelected == this.incidence || this.nomenclatorSelected == this.currency) {
          return (
            value &&
            this.name != "" && this.acronym != "" &&
            this.nomenclatorSelected != null

          )
        }
        if (this.nomenclatorSelected == this.classifiertype) {
          return (
            value &&
            this.name != "" && this.code != "" &&
            this.nomenclatorSelected != null

          )
        }
        if (this.nomenclatorSelected == this.dpa) {
          return (
            value &&
            this.name != "" && this.codedpa != "" &&
            this.nomenclatorSelected != null

          )
        }
        return (
          value &&
          this.name != "" &&
          this.nomenclatorSelected != null

        )
      }
    },
    data() {
      return {
        cargo: this.$i18n
          .t(
            "applications.onei_ipc.modules.nomenclador.types.Cargo"
          ),
        category: this.$i18n
          .t(
            "applications.onei_ipc.modules.nomenclador.types.Category"
          ),
        observation: this.$i18n
          .t(
            "applications.onei_ipc.modules.nomenclador.types.Observation"
          ),
        incidence: this.$i18n
          .t(
            "applications.onei_ipc.modules.nomenclador.types.Incidence"
          ),
        market: this.$i18n
          .t(
            "applications.onei_ipc.modules.nomenclador.types.Market"
          ),
        typology: this.$i18n
          .t(
            "applications.onei_ipc.modules.nomenclador.types.Typology"
          ),
        dpa: this.$i18n
          .t(
            "applications.onei_ipc.modules.nomenclador.types.DPA"
          ),
        currency: this.$i18n
          .t(
            "applications.onei_ipc.modules.nomenclador.types.Currency"
          ),
        weighingtype: this.$i18n
          .t(
            "applications.onei_ipc.modules.nomenclador.types.WeighingType"
          ),
        varietytype: this.$i18n
          .t(
            "applications.onei_ipc.modules.nomenclador.types.VarietyType"
          ),
        measurementunittype: this.$i18n
          .t(
            "applications.onei_ipc.modules.nomenclador.types.MeasurementUnitType"
          ),
        classifiertype: this.$i18n
          .t(
            "applications.onei_ipc.modules.nomenclador.types.ClassifierType"
          ),
        region: this.$i18n
          .t(
            "applications.onei_ipc.modules.nomenclador.types.Region"
          ),
        nomenclatorSelected: null,
        categorySelected: null,
        tipoUnidadMSelected: null,
        nomenclators: [],
        categories: [],
        regiones: [],
        tipo_unidad_medidas: [],
        imputado: false,
        activo: false,
        labelSiglas: false,
        labelCodigo: false,
        labelCodigoDpa: false,
        labelCategorias: false,
        labelRegiones: false,
        labelUnidadMedidaType: false,
        labelImputado: false,
        name: '',
        acronym: '',
        code: '',
        codedpa: '',
        rules: {
          name: [val => (val || "").length > 0 || this.$i18n
            .t(
              "applications.onei_ipc.messages.required"
            )],
        }
      }
    }
  }
</script>

