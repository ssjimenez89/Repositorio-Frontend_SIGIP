<template>
<v-layout class="content">
  <v-flex md3>

    <b>Seleccione el establecimiento: </b>
    <autocomplete-establecimiento-filed
      :toCatchOnly="true"
      @change="selectEstablishment($event)"
    ></autocomplete-establecimiento-filed>
  </v-flex>
</v-layout>
</template>

<script>
  import VLayout from "@vuetify/components/VGrid/VLayout";
  import VFlex from "@vuetify/components/VGrid/VFlex";
  import AutocompleteEstablecimientoFiled
    from "@shared/components/autocomplete-establecimiento-field/autocomplete-establecimiento-filed";
  import MinMaxDatePicker from "../../../../../../../shared/components/min-max-date-picker/min-max-date-picker";

  export default {
    name: "step-pick-establecimiento",
    components: {
      MinMaxDatePicker,
      AutocompleteEstablecimientoFiled,
      VLayout,
      VFlex
    },
    data() {
      return {
        establecimientoId: -1
      }
    },
    methods:{
      selectEstablishment($event){
        debugger;
        this.$emit('change',$event.id)
      }
    }
  }
</script>

<style scoped lang="stylus">
.content
  min-height 300px
</style>
