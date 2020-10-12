<template>
  <v-container id="contenedor" class fluid grid-list-xl>
    <v-layout wrap>
      <v-flex md3 v-if="isFilterPresent('nombre')">
        <v-text-field
          :label="this.$i18n.t('applications.onei_ipc.modules.nomenclador.fields.name')"
          append-icon="search"
          hide-details
          single-line
          v-model="filterValuesModel.nombre"
          @change="emitFilterChanged('nombre',filterValuesModel.nombre)"
        ></v-text-field>
      </v-flex>
      <v-flex md3 v-if="isFilterPresent('tipoNomenclador')">
        <v-select
          :items="nomenclators"
          :label="this.$i18n.t('applications.onei_ipc.modules.nomenclador.fields.type_nomenclator')"
          attach
          v-model="filterValuesModel.tipoNomenclador"
          @change="emitFilterChanged('tipoNomenclador',filterValuesModel.tipoNomenclador)"
        ></v-select>
      </v-flex>

      <v-flex md3 v-if="isFilterPresent('dpaId')">
        <generic-nomenclador-select
                nomenclador="dpa"
                text="description"
                val="id"
                clearable
                label="DPA"
                v-model="filterValuesModel.dpaId"
                @change="emitFilterChanged('dpa',filterValuesModel.dpaId)"
        ></generic-nomenclador-select>
      </v-flex>

      <v-flex md3 v-if="isFilterPresent('mercado')">
        <generic-nomenclador-select
          nomenclador="mercado"
          text="description"
          val="id"
          clearable
          label="Mercado"
          v-model="filterValuesModel.mercado"
          @change="emitFilterChanged('mercado',filterValuesModel.mercado)"
        ></generic-nomenclador-select>
      </v-flex>


      <v-flex md3 v-if="isFilterPresent('tipologia')">
        <generic-nomenclador-select
          nomenclador="tipologia"
          text="description"
          val="id"
          clearable
          label="Tipologia"
          v-model="filterValuesModel.tipologia"
          @change="emitFilterChanged('tipologia',filterValuesModel.tipologia)"
        ></generic-nomenclador-select>
      </v-flex>

      <v-flex md3 v-if="isFilterPresent('mes')">
        <month-picker-menu
          label="Mes"
          clearable
          v-model="filterValuesModel.mes"
          clearButton
          @change="emitFilterChanged('mes', filterValuesModel.mes)"
        ></month-picker-menu>
      </v-flex>
      <v-flex md3 v-if="isFilterPresent('year')">
        <list-years-select
          :items="[]"
          :label="this.$i18n.t('applications.onei_ipc.modules.listarCaptaciones.self_component.year')"
          v-model="filterValuesModel.year"
          @change="emitFilterChanged('year', filterValuesModel.year)"
        ></list-years-select>
      </v-flex>

      <v-flex md3 v-if="isFilterPresent('variedadId')">
        <generic-nomenclador-select
          nomenclador="variedad"
          text="description"
          val="id"
          clearable
          label="Variedad"
          v-model="filterValuesModel.variedadId"
          @change="emitFilterChanged('variedadId',filterValuesModel.variedadId)"
        ></generic-nomenclador-select>
      </v-flex>

      <v-flex md3 v-if="isFilterPresent('variedad')">
        <v-text-field
          label="Variedad?????"
          v-model="filterValuesModel.variedad"
          @change="emitFilterChanged('variedad',filterValuesModel.variedad)"
        ></v-text-field>
      </v-flex>


      <v-flex md3 v-if="isFilterPresent('fecha')">
        <date-picker-menu
          clearButton
          :label="$t('applications.onei_ipc.modules.listarCaptaciones.self_component.select_date')"
          v-model="filterValuesModel.fecha"
          @change="emitFilterChanged('fecha', filterValuesModel.fecha)"
        ></date-picker-menu>
      </v-flex>

      <v-flex md3 v-if="isFilterPresent('usuario')">
        <v-select
          :items="[]"
          :label="this.$i18n.t('applications.onei_ipc.modules.listarCaptaciones.self_component.user')"
          v-model="filterValuesModel.usuario"
          @change="emitFilterChanged('usuario',filterValuesModel.usuario)"
        ></v-select>
      </v-flex>

      <v-flex md3 v-if="isFilterPresent('variacion')">
        <generic-nomenclador-select
          nomenclador="variacion"
          text="description"
          val="id"
          clearable
          label="Variacion"
          v-model="filterValuesModel.variacion"
          @change="emitFilterChanged('variacion',filterValuesModel.variacion)"
        ></generic-nomenclador-select>
      </v-flex>

      <v-flex md3 v-if="isFilterPresent('precio')">
        <generic-nomenclador-select
          nomenclador="precio"
          text="description"
          val="id"
          clearable
          label="Precio"
          v-model="filterValuesModel.precio"
          @change="emitFilterChanged('precio',filterValuesModel.precio)"
        ></generic-nomenclador-select>
      </v-flex>

      <v-flex md3 v-if="isFilterPresent('establecimientoId')">

        <autocomplete-establecimiento-filed

          @change="emitFilterChanged('establecimientoId',$event.id)"
        ></autocomplete-establecimiento-filed>
      </v-flex>
      <v-flex md3>

        <v-btn
          color="primary"
          @click="buscar"
        >Buscar
        </v-btn>
      </v-flex>
      <slot></slot>
    </v-layout>
  </v-container>
</template>

<script>


  import VDatePicker from "@vuetify/components/VDatePicker/VDatePicker";
  import VDatePickerYears from "@vuetify/components/VDatePicker/VDatePickerYears";
  import VDatePickerMonthTable from "@vuetify/components/VDatePicker/VDatePickerMonthTable";
  import VMenu from "@vuetify/components/VMenu/VMenu";
  import VTextField from "@vuetify/components/VTextField/VTextField";
  import VContent from "@vuetify/components/VGrid/VContent";
  import VContainer from "@vuetify/components/VGrid/VContainer";
  import VLayout from "@vuetify/components/VGrid/VLayout";
  import VFlex from "@vuetify/components/VGrid/VFlex";
  import VSelect from "@vuetify/components/VSelect/VSelect";
  import VBtn from "@vuetify/components/VBtn/VBtn";
  import VCard from "@vuetify/components/VCard/VCard";
  import GenericNomencladorSelect from "../generic_nomenclador_select/generic-nomenclador-select";
  import AutocompleteEstablecimientoFiled
    from "../autocomplete-establecimiento-field/autocomplete-establecimiento-filed";
  import WaitForUserTextFiled from "../wait-for-user-text-filed/wait-for-user-text-filed";
  import MonthPickerMenu from "../month-picker-menu/month-picker-menu";
  import DatePickerMenu from "../date-picker-menu/date-picker-menu";
  import ListYearsSelect from "../listYearsSelect/listYearsSelect";
  import {getFilterModel} from "../../types/filter-types";

  export default {
    name: "generic-filter",
    components: {
      ListYearsSelect,
      DatePickerMenu,
      MonthPickerMenu,
      WaitForUserTextFiled,
      AutocompleteEstablecimientoFiled,
      GenericNomencladorSelect,
      VDatePicker,
      VMenu,
      VTextField,
      VContent,
      VContainer,
      VLayout,
      VFlex,
      VSelect,
      VBtn,
      VCard,
      VDatePickerYears,
      VDatePickerMonthTable,

    },
    props: {
      only: {
        type: Array
      },
      allExept: {
        type: Array
      },
      searchButton: {
        type: Boolean,
        default: true
      }
    },
    created() {
      this.allFilters = Object.keys(this.filterValuesModel);
      let filterType = "ALL";
      if (this.only && this.only.length > 0) {
        filterType = "ONLY";
      } else if (this.allExept && this.allExept.length > 0) {
        filterType = "EXEPT";
      }

      this.setFiltersByMethod(filterType);
      this.initializeModel();
    },
    data() {
      return {
        allFilters: [],
        filterValuesModel: getFilterModel(),
        filters: [],
        nomenclators: ['Todos', 'Cargo', 'Categoría', 'Observación', 'Incidencia', 'Mercado', 'Tipología', 'DPA', 'Moneda', 'Tipo de ponderación', 'Tipo de variedad', 'Tipo de clasificador', 'Tipo de Unidad de Medida', 'Región'],
      };
    },
    computed: {},

    watch: {},
    methods: {
      setAndEmit(filterName, filterValue) {
        this.filterValuesModel[filterName] = filterValue;
        console.log(filterValue);
        if (!this.searchButton) {
          this.$root.$emit("filter-change", this.filterValuesModel);
        }

      },
      initializeModel() {
        this.allFilters.forEach(f => {
          if (this.filters.indexOf(f) < 0) {
            delete this.filterValuesModel[f];
          }
        });

      },
      emitFilterChanged(filterName, filterValue) {
        this.filterValuesModel[filterName] = filterValue;
        console.log(filterValue);
        //this.$root.$emit("filter-change", this.filterValuesModel);
      },
      buscar() {
        this.$root.$emit("filter-change", {...this.filterValuesModel});
      },
      setFiltersByMethod(filterType) {
        switch (filterType) {
          case "ONLY": {
            this.filters = this.only;
            break;
          }
          case "EXEPT": {
            this.filters = this.allFilters.filter(e => {
              return !(this.allExept.indexOf(e) >= 0);
            });

            break;
          }
          default:
            this.filters = this.allFilters;
        }
      },
      isFilterPresent(filterName) {
        return this.filters.indexOf(filterName) >= 0;
      }
    }
  };
</script>

<style lang="stylus" scoped>
  #contenedor {
    padding-left: 20px;
  }

  .div-content-filter {
    display: flex;
    margin: 0px 0px 0px 0px;
  }

  .div-content {
    padding: 0px 0px 0px 0px;
  }
</style>
