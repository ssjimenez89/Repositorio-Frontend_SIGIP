<template>
  <autocomplete-generic-filed
   label="Variedad"
   :query="query"
   identificador="id"
   filter-by="descripcion"
   text="description"
   data-name="variedadesFiltradas"
   @change="$emit('change', $event)"
  ></autocomplete-generic-filed>
</template>

<script>
  import VTextField from "@vuetify/components/VTextField";
  import {VARIEDADES_FILTRADAS} from "../../graphql/queries";
  import AutocompleteGenericFiled from "../auto-complete-generic-field/auto-complete-generic-field";

  export default {
    name: "autocomplete-variedad-field",
    components: {
      AutocompleteGenericFiled,
      VTextField
    },
    props:{
    },

    data() {
      return {
        query: {
          query: VARIEDADES_FILTRADAS,
          variables: {
            descripcion: "",
            page: 0,
            size: 10
          }
        }
      }
    },
    methods: {
      // renderFunction(item){
      //   return `${item.code}-${item.name}`;
      // }

    }
  }
</script>

<style scoped lang="stylus">
  #content
    width 100%
    position relative
    #menu
      ul
        list-style none
        li
          a:hover
            background rgba(0, 0, 0, 0.04)
      width 100%
      position absolute
      top 48px
      left 0
      z-index 2

</style>
