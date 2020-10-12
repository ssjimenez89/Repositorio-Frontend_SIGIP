<template>

<!--  <v-select-->
<!--    :rules="rules"-->
<!--    :clearable="clearable"-->
<!--    :items="items"-->
<!--    :label="label"-->
<!--    :loading="loading"-->
<!--    :item-value="val"-->
<!--    :item-text="text"-->
<!--    v-model="value"-->
<!--    :attach="attach"-->
<!--    @change="$emit('change', getVal(value))"-->
<!--    @input="$emit('input', getVal(value))"-->
<!--  ></v-select>-->
  <v-autocomplete
    :rules="rules"
    :clearable="clearable"
    :items="items"
    :label="label"
    :loading="loading"
    :item-value="val"
    :item-text="text"
    v-model="value"
    :attach="attach"
    @change="$emit('change', getVal(value))"
    @input="$emit('input', getVal(value))"
  ></v-autocomplete>
</template>

<script>
  import VSelect from "@vuetify/components/VSelect/VSelect";
  import VAutocomplete from "@vuetify/components/VAutocomplete"
  import {
    QUERY_GET_DPA,
    QUERY_GET_DPA_RESOURCE,
    GET_MARKET_QUERY,
    GET_MARKETS_CURRENCIES_QUERY,
    GET_VARIETY_TYPE_QUERY,
    QUERY_GET_TYPOLOGIES,
    GET_CURRENCIES_QUERY,
    QUERY_GET_INCEDENCES,
    QUERY_GET_OBSERVACIONES,
    QUERY_GET_OBSERVACIONES_BY_VARIEDAD
  } from "../../graphql/queries/index";

  export default {
    name: "generic-nomenclador-select",
    components: {
      VSelect,
      VAutocomplete
    },
    props: {
      rules: {
        type: Array,
        default: () => []
      },
      varId: {
        type: Number,
        require: false,
        default: -1
      },
      returnObject: {
        type: Boolean,
        require: false,
        default: false
      },
      attach: {
        type: Boolean,
        require: false,
        default: true
      },
      clearable: {
        type: Boolean,
        require: false,
        default: false
      },
      default_value: {
        type: null
      },
      value: {
        type: null
      },
      val: {
        type: String
      },
      text: {
        type: String
      },
      nomenclador: {
        type: String,
        require: true
      },
      label: {
        type: String,
        require: true
      },
      model: {
        type: Object,
        require: true
      }
    },
    created() {
      this.itemSelected[this.val] = -1;
      this.itemSelected[this.text] = 'Seleccione';
      this.fetchNomenclador(this.nomenclador);


    },
    data() {
      return {
        items: [],
        loading: false,
        itemSelected: {},
        allQueries: {
          dpa: QUERY_GET_DPA_RESOURCE,
          mercado: GET_MARKETS_CURRENCIES_QUERY,
          variedad: GET_VARIETY_TYPE_QUERY,
          tipologia: QUERY_GET_TYPOLOGIES,
          moneda: GET_CURRENCIES_QUERY,
          incidencia: QUERY_GET_INCEDENCES,
          observacion: QUERY_GET_OBSERVACIONES,
          observacionVariedad: QUERY_GET_OBSERVACIONES_BY_VARIEDAD
        },
        allResultVariables: {
          dpa: 'findAllDPAResource',
          mercado: 'marketsCurrencies',
          variedad: 'varietyTypes',
          tipologia: 'typologies',
          moneda: 'currencies',
          incidencia: 'incidences',
          observacion: 'observations',
          observacionVariedad: 'observationByVariedad'
        }
      }
    },
    methods: {
      emitValue(method, val) {

        this.$emit(method, val);
      },
      fetchNomenclador(type) {

        if (type !== "observacionVariedad" || (type === "observacionVariedad" && this.varId !== -1)) {

          let currentQuery = this.allQueries[type];
          currentQuery = type === "observacionVariedad" ? {
            query: currentQuery,
            variables: {varId: this.varId}
          } : {query: currentQuery};
          this.loading = type === "observacionVariedad";
          this.$apollo.query(currentQuery).then((data) => {

            let tempData = [];
            //  tempData.push({...this.itemSelected});
            tempData.push([...data.data[this.allResultVariables[type]]]);
            this.items = [...tempData.flat()];
            const val = this.value ? this.value[this.val] : -1;
            const text = this.value ? this.value[this.text] : 'Seleccione';
            this.itemSelected = val;
            this.loading = false;
          });
        }

      },
      getVal(id = -1) {
        const val = id === -1 ? {id: -1, description: "Seleccione"} : this.items.filter(e => e[this.val] === id)[0];
        return this.returnObject ? val : val[this.val];
      }

    },
    watch: {
      varId($event) {
        debugger;
        this.fetchNomenclador("observacionVariedad");
      }
    }

  }


</script>

<style scoped>

</style>
