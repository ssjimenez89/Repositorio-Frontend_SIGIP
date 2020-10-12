<template>
  <v-container class="pb-0 px-0">
    <div class="div-content-filter mb-0">
      <v-flex class="pa-0" d-flex md6 xs12>
        <v-container fluid grid-list-xl>
          <v-layout justify-space-around wrap>
            <v-flex d-flex lg6 md12 xs12 v-if="isFilterPresent('mercado')">
              <generic-nomenclador-select
                nomenclador="mercado"
                text="description"
                val="id"
                label="Mercado"
                v-model="marketSelected"
                @change="emitFilterChanged('mercado',marketSelected)"
              ></generic-nomenclador-select>
            </v-flex>

            <v-flex d-flex lg6 md12 xs12 v-if="isFilterPresent('tipologia')">
              <generic-nomenclador-select
                nomenclador="tipologia"
                text="description"
                val="id"
                label="Tipologia"
                v-model="tipologiaSelected"
                @change="emitFilterChanged('tipologia',tipologiaSelected)"
              ></generic-nomenclador-select>
            </v-flex>
          </v-layout>


          <v-layout justify-space-around wrap>
            <v-flex d-flex lg6 md12 xs12 v-if="isFilterPresent('establecimiento')">
              <wait-for-user-text-filed
                label="Establecimiento"
                v-model="establecimientoSelected"
                @change="emitFilterChanged('establecimiento', establecimientoSelected)"
              ></wait-for-user-text-filed>

            </v-flex>

            <v-flex d-flex lg4 md8 xs7 v-if="isFilterPresent('mes')">
              <month-picker-menu
                label="Mes"
                v-model="mes"
                @change="emitFilterChanged('mes', mes)"
              ></month-picker-menu>
            </v-flex>

            <v-flex d-flex lg2 md4 xs5 v-if="isFilterPresent('year')">
              <v-select
                :items="years"
                :label="this.$i18n.t('applications.onei_ipc.modules.listarCaptaciones.self_component.year')"

                v-model="yearSelected"

              ></v-select>
            </v-flex>
          </v-layout>

        </v-container>
      </v-flex>


      <v-flex d-flex md6 xs12>
        <v-container fluid grid-list-xl>
          <v-layout wrap>
            <v-flex d-flex lg6 md12 xs12 v-if="isFilterPresent('dpa')">
              <generic-nomenclador-select
                nomenclador="dpa"
                text="description"
                val="id"
                label="DPA"
                v-model="dpaSelected"
                @change="emitFilterChanged('dpa',dpaSelected)"
              ></generic-nomenclador-select>
            </v-flex>

            <v-flex d-flex lg6 md12 xs12 v-if="isFilterPresent('variedad')">
              <generic-nomenclador-select
                nomenclador="variedad"
                text="description"
                val="id"
                label="Variedad"
                v-model="variedadSelected"
                @change="emitFilterChanged('variedad',variedadSelected)"
              ></generic-nomenclador-select>
            </v-flex>

          </v-layout>
          <v-layout justify-end wrap>
            <v-flex lg6 md12 xs12 v-if="isFilterPresent('fecha')">
              <date-picker-menu
                :label="$t('applications.onei_ipc.modules.listarCaptaciones.self_component.select_date')"
                v-model="date"
                @change="emitFilterChanged('fecha', date)"
              ></date-picker-menu>
            </v-flex>

            <v-flex d-flex lg6 md12 xs12 v-if="isFilterPresent('usuario')">
              <v-select
                :items="users"
                :label="this.$i18n.t('applications.onei_ipc.modules.listarCaptaciones.self_component.user')"


                v-model="userSelected"

              ></v-select>
            </v-flex>
          </v-layout>

        </v-container>

      </v-flex>
    </div>

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
  import GenericNomencladorSelect
    from "../../../../../../shared/components/generic_nomenclador_select/generic-nomenclador-select";
  import AutocompleteEstablecimientoFiled
    from "../../../../../../shared/components/autocomplete-establecimiento-field/autocomplete-establecimiento-filed";
  import WaitForUserTextFiled
    from "../../../../../../shared/components/wait-for-user-text-filed/wait-for-user-text-filed";
  import MonthPickerMenu from "../../../../../../shared/components/month-picker-menu/month-picker-menu";
  import DatePickerMenu from "../../../../../../shared/components/date-picker-menu/date-picker-menu";

  export default {
    name: "ListarCaptacionesFilter",
    components: {
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
      VDatePickerMonthTable

    },
    props: {
      only: {
        type: Array
      },
      allExept: {
        type: Array
      }
    },
    created() {
      let filterType = 'ALL';
      if (this.only && this.only.length > 0) {
        filterType = 'ONLY';
      } else if (this.allExept && this.allExept.length > 0) {
        filterType = 'EXEPT';
      }

      this.setFiltersByMethod(filterType);

    },
    data() {
      return {
        date: '',
        mes: '',
        marketSelected: {id: -1, description: 'Seleccione'},
        tipologiaSelected: {id: -1, description: 'Seleccione'},
        establecimientoSelected: '',
        yearSelected: '',
        years: [2019],
        dpaSelected: {id: -1, description: 'Seleccione'},
        variedadSelected: {id: -1, description: 'Seleccione'},
        userSelected: '',
        users: [],
        filterValuesModel: {
          getValue:(val, defecto)=>{
            const filterValue = this.filterValuesModel[val];
            return (filterValue !== -1 && filterValue !== '' && filterValue) ? filterValue : defecto;
          }
        },
        allFilters: ['mercado', 'tipologia', 'dpa', 'variedad', 'establecimiento', 'mes', 'year', 'fecha', 'usuario'],
        filters: []

      }
    },
    computed: {},

    watch: {},
    methods: {

      emitFilterChanged(filterName, filterValue) {
        this.filterValuesModel[filterName] = filterValue;
        console.log(filterValue);
        this.$emit('filter-change', this.filterValuesModel);
      },
      setFiltersByMethod(filterType) {

        switch (filterType) {
          case 'ONLY': {
            this.filters = this.only;
            break;
          }
          case 'EXEPT': {
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
    },

  }
</script>

<style lang="stylus" scoped>
  .div-content-filter
    display flex
    margin 0px 0px 0px 0px

  .div-content
    padding 0px 0px 0px 0px


</style>
