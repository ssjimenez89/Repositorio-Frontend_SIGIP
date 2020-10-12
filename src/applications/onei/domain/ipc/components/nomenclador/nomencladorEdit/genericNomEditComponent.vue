<template>
  <v-card class="add_container">
    <v-layout row>
      <v-flex xs12>
        <v-card class="card--flex-toolbar">
          <v-toolbar card color="primary" dark>
            <v-toolbar-title class="subheading">
              {{editMode ? 'Editar Nomenclador': 'Visualizar Nomenclador'}}
            </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <v-form @submit.prevent="submit" v-model="formValid" ref="formAddNomenclador">
              <v-container fluid grid-list-xl>
                <v-layout wrap>

                  <v-flex md4 xs12>
                    <v-text-field
                      :label="this.$i18n.t('applications.onei_ipc.modules.nomenclador.fields.name')"
                      :rules="rules.name"
                      :disabled="!editMode"
                      required
                      v-model="model.nombre"
                    ></v-text-field>
                  </v-flex>

                  <v-flex d-flex md4 xs12>
                    <v-select
                      :items="nomenclators"
                      disabled
                      item-text="desc"
                      item-value="id"
                      return-object
                      :label="this.$i18n.t('applications.onei_ipc.modules.nomenclador.fields.type_nomenclator')"
                      :rules="[v => !!v ||  this.$i18n.t('applications.onei_ipc.messages.required')]"
                      v-model="model.tipo"
                    ></v-select>
                  </v-flex>

                  <v-flex md4 xs12>
                    <v-checkbox
                      :label="this.$i18n.t('applications.onei_ipc.modules.nomenclador.fields.active')"
                      v-model="model.activo"
                      :disabled="!editMode"
                      color="primary"
                    ></v-checkbox>
                  </v-flex>

                  <v-flex md4 v-if="showField('siglas')" xs12>
                    <v-text-field
                      :label="this.$i18n.t('applications.onei_ipc.modules.nomenclador.fields.acronym')"
                      :disabled="!editMode"
                      required
                      v-model="model.acronym"
                      :rules="rules.name"
                    ></v-text-field>
                  </v-flex>

                  <v-flex md4 v-if="showField('codigo')" xs12>
                    <v-text-field
                      :label="this.$i18n.t('applications.onei_ipc.modules.nomenclador.fields.code')"
                      :disabled="!editMode"
                      required
                      :rules="rules.name"
                      v-model="model.code"
                    ></v-text-field>
                  </v-flex>

                  <v-flex d-flex md4 v-if="showField('cat')" xs12>
                    <v-select
                      :items="categories"
                      :label="this.$i18n.t('applications.onei_ipc.modules.nomenclador.fields.categories')"
                      :rules="[v => !!v ||  this.$i18n.t('applications.onei_ipc.messages.required')]"
                      item-text="description"
                      item-value="id"
                      v-model="model.categoryId"
                      :disabled="!editMode"
                    ></v-select>
                  </v-flex>

                  <v-flex d-flex md4 v-if="showField('region')" xs12>
                    <v-select
                      :items="regiones"
                      :label="this.$i18n.t('applications.onei_ipc.modules.nomenclador.fields.regiones')"
                      :rules="[v => !!v ||  this.$i18n.t('applications.onei_ipc.messages.required')]"
                      item-text="descripcion"
                      item-value="id"
                      v-model="model.regionId"
                      :disabled="!editMode"
                    ></v-select>
                  </v-flex>

                  <v-flex md4 v-if="showField('imputado')" xs12>
                    <v-checkbox
                      :label="this.$i18n.t('applications.onei_ipc.modules.nomenclador.fields.imputed')"
                      v-model="model.imputed"
                      color="primary"
                      :disabled="!editMode"
                    ></v-checkbox>
                  </v-flex>

                  <v-flex md12 xs12>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        :disabled="!formValid"
                        v-if="editMode"
                        color="success"
                        type="submit"
                      >
                        Guardar
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
    QUERY_GET_CATEGORIES,
    QUERY_GET_REGIONES,
    QUERY_GET_MEASUREMENTUNITTYPE

  } from "../graphql/graphql-nomenclador.js";

  export default {
    name: "GenericNomEditComponent",
    props: {
      model: {
        required: true,
        type: Object,
        default: () => {
          return {
            id: -1,
            nombre: '',
            activo: false,
            tipo: -1,
            code: 0,
            acronym: '',
            imputed: false,
            categoryId: -1,
            regionId: -1,
            tipoReal: -1
          }
        }
      },
      editMode: {
        required: false,
        type: Boolean,
        default: true
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
      showField(field: string) {
        const tipo = this.model.tipoReal;

        switch (field) {
          case 'siglas': {
            return tipo === 'moneda' || tipo === 'incidencia' || tipo === 'observacion';

          }
          case 'codigo': {
            return tipo === 'dpa' || tipo === 'tipo_clasificador';
          }

          case 'imputado': {
            return tipo === 'tipologia';
          }

          case 'cat' : {
            return tipo === 'tipologia';
          }

          case 'region' : {
            return tipo === 'dpa';
          }

        }
      },
      initialize() {

        this.nomenclators = [{
          desc: this.cargo,
          id: 'Cargo'
        },
          {
            desc: this.category,
            id: 'Category'
          },
          {
            desc: this.region,
            id: 'Region'
          },
          {
            desc: this.observation,
            id: 'Observation'
          },
          {
            desc: this.incidence,
            id: 'Incidence'
          },
          {
            desc: this.market,
            id: 'Market'
          },
          {
            desc: this.typology,
            id: 'Typology'
          },
          {
            desc: this.dpa,
            id: 'DPA'
          },
          {
            desc: this.currency,
            id: 'Currency'
          },
          {
            desc: this.measurementunittype,
            id: 'MeasurementUnitType'
          },
          {
            desc: this.classifiertype,
            id: 'ClassifierType'
          },
          {
            desc: this.varietytype,
            id: 'VarietyType'
          },
          {
            desc: this.weighingtype,
            id: 'chino'
          }
        ];

      },
      redirectToNomenclatorModule() {
        this.$router.push('/onei/sigip/ipc/nomenclador')
      },
      submit() {
        this.$emit('save', this.model);
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

      }
    },
    computed: {},
    data() {
      return {
        formValid: true,
        cargo: this.$i18n
          .t(
            "applications.onei_ipc.modules.nomenclador.types.Cargo"
          ),
        category: this.$i18n
          .t(
            "applications.onei_ipc.modules.nomenclador.types.Category"
          ),
        region: this.$i18n
          .t(
            "applications.onei_ipc.modules.nomenclador.types.Region"
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

