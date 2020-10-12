<template>
  <div>

    <v-select
      :items="items"
      label="Tipo unidad de medida"
      item-value="id"
      item-text="description"
      v-model="value"
      @change="$emit('change', value)"
      @input="$emit('input',value)"

    ></v-select>
  </div>

</template>

<script>
  import VSelect from "@vuetify/components/VSelect/VSelect";
  import {
    QUERY_TIPOS_UNIDAD_MEDIDA
  } from "../../graphql/queries/index";

  export default {
    name: "tipos-unidad-medida-select",
    components: {
      VSelect
    },
    props: {
      tipoUm:{
        type: Number,
        required: true,
        default: -1
      },
      variedad: {
        type: Object,
        required: false,
        default: () => {
          return {
            id: -1,
            tipoUM: 10
          }
        }
      },
      value: {
        type: null
      },
      val: {
        type: String
      }
    },
    data() {
      return {
        items: [],
        query: {
          query: QUERY_TIPOS_UNIDAD_MEDIDA,
          variables: {}
        }
      }
    },
    created() {
      this.fetchTipos();
    },
    watch:{
      tipoUm($event){
        debugger;

        this.fetchTipos();
      }
    },
    methods:{
      fetchTipos() {
        this.query.variables.tipoUM = this.tipoUm;
        this.$apollo.query(this.query).then((data) => {
          this.items = data.data.listUMsByTipoUM;
        });
      }
    }


  }
</script>

<style scoped>

</style>
