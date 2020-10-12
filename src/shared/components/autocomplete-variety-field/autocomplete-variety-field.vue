<template>

    <autocomplete-generic-filed
      label="Establecimiento"
      :query="query"
      identificador="id"
      filter-by="establishment"
      text="name"
      :data-name="toCatchOnly ? 'pendingEstablishments' : 'filterEstablishments'"
      @change="$emit('change', $event)"
    ></autocomplete-generic-filed>

</template>

<script>
    import AutocompleteGenericFiled from "../auto-complete-generic-field/auto-complete-generic-field";
    import VTextField from "vuetify/es5/components/VTextField";

    import {FILTER_VARIETY_NAME} from "../../graphql/queries/variedad";

    export default {
        name: "autocomplete-variety-field",
      components: {
        AutocompleteGenericFiled,
        VTextField
      },
      props:{
        toCatchOnly: false
      },data() {
        return {
          query: {

            query: FILTER_VARIETY_NAME,
            variables: {
              marketId: -1,
              typologyId: -1,
              dpaId: -1,
              establishment: "null",
              code: "",
              stateId: -1,
              page: 0,
              size: 5
            }

          }

        }
      },
      methods: {
        renderFunction(item){
          return `${item.code}-${item.name}`;
        }

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

