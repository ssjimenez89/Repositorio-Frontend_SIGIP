<template>

  <captar-precio-wizard></captar-precio-wizard>
</template>

<script>
  import ListarCaptacionesFilter from "../../components/listarcaptaciones/ListarCaptacionesFilter";
  import ListarCaptacionesShowList from "../../components/listarcaptaciones/ListarCaptacionesShowList";
  import ListarPendientesCaptarPrecioShowList
    from "../../components/listarcaptaciones/listarPendientesCaptarPrecioShowList"
  import {VStepperContent} from "@vuetify/components/VStepper";
  import VContainer from "@vuetify/components/VGrid/VContainer";
  import VContent from "@vuetify/components/VGrid/VContent";
  import VBtn from "@vuetify/components/VBtn/VBtn";
  import VFlex from "@vuetify/components/VGrid/VFlex";
  import {VSpacer} from "@vuetify/components/VGrid";
  import VLayout from "@vuetify/components/VGrid/VLayout";
  import VCard from "@vuetify/components/VCard/VCard";
  import {VCardActions, VCardText} from "@vuetify/components/VCard";
  import VCardTitle from "@vuetify/components/VCard/VCardTitle";
  import GenericFilter from "../../../../../../shared/components/generic-filter/generic-filter";
  import AutocompleteEstablecimientoFiled
    from "../../../../../../shared/components/autocomplete-establecimiento-field/autocomplete-establecimiento-filed";
  import ActionsMenu from "../../../../../../shared/components/actions-menu/actions-menu";
  import GenericNomencladorSelect
    from "../../../../../../shared/components/generic_nomenclador_select/generic-nomenclador-select";
  import GenericStepper from "../../../../../../shared/components/generic-stepper/generic-stepper";
  import CaptarPrecioWizard from "./captar-precio-wizard/captar-precio-wizard";


  export default {
    name: "listado-precios-faltantes",
    components: {
      CaptarPrecioWizard,
      GenericStepper,
      GenericNomencladorSelect,
      ActionsMenu,
      AutocompleteEstablecimientoFiled,
      GenericFilter,
      ListarPendientesCaptarPrecioShowList,
      ListarCaptacionesFilter,
      ListarCaptacionesShowList,
      VStepperContent,
      VCard,
      VCardActions,
      VCardText,
      VCardTitle,
      VContainer,
      VContent,
      VBtn,
      VFlex,
      VSpacer,
      VLayout


    },
    data() {
      return {
        text: 1,
        modelMoneda: {id: -1, description:'Seleccione'},
        preciosCaptados: [],
        items:[],
        filterModel:{},
        paginModel:{}
      }
    },
    methods: {
      update($event) {
        //this.text+=1;
        console.log($event);
      },
      prueba(a, b) {
        this.text += 1;
        console.log(a, b, 'ooooo', this.text);
      },
      fetchItems(){
        this.$apollo.query({}).then((data)=>{
          this.items = data.data.captados.map(e => {
            const temp = this.preciosCaptados.filter(f =>{ e.id === f.id});
            return temp > 0 ? temp[0] : e
          });
        });

      }
    }
  }
</script>

<style scoped>

</style>
