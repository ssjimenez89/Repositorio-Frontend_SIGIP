<template>
  <autocomplete-generic-filed
    label="Establecimiento"
    :query="query"
    identificador="id"
    filter-by="establishment"
    text="name"
    :error-messages="message === ''? []: message "
    :messages="validating ? ['Validando establecimiento']: ['']"
    :data-name="'filterEstablishments'"
    @change="change($event)"
  ></autocomplete-generic-filed>
</template>

<script>
  import VTextField from "@vuetify/components/VTextField";
  import {FILTER_ESTABLISHMENT_PENDING, FILTER_ESTABLISHMENT_NO_REALTIONS} from "../../graphql/queries";
  import AutocompleteGenericFiled from "../auto-complete-generic-field/auto-complete-generic-field";
  import {IS_ESTABLISHMENT_CATCHED} from "../../graphql/queries/establecimiento"

  export default {
    name: "autocomplete-establecimiento-filed",
    components: {
      AutocompleteGenericFiled,
      VTextField
    },
    props: {
      toCatchOnly: false
    },

    data() {
      return {
        query: {

          query: FILTER_ESTABLISHMENT_NO_REALTIONS,
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

        },
        queryCatch: {

          query: IS_ESTABLISHMENT_CATCHED,
          variables: {
            idEstablishment: "null",
          }
        },
        message: "",
        validating: false
      }
    },
    methods: {
      renderFunction(item) {
        return `${item.code}-${item.name}`;
      },
      change($event) {
        debugger;
        if ($event) {
          this.queryCatch.variables.idEstablishment = $event.id;
          if (this.toCatchOnly) {
            this.validating = true;
          }
          this.$apollo.query(this.queryCatch).then((data) => {
            if (this.toCatchOnly) {
              this.message = data.data.isEstablishmentCatched ? "El establecimiento ya captó." : "";
              this.validating = false;
            }
            this.$emit('change', this.message === '' ? $event : {id: -1});
          });
        } else {
          this.message = '';
          this.$emit('change', {id: -1});
        }

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
