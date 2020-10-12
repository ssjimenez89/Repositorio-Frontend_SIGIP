<template>
  <div>
    <nomenclators :filter-model="filterModel"
                  v-if="filterModel.tipoNomenclador === TipoNomenclador.TODOS"></nomenclators>
    <nomenclator-cargo :filter-model="filterModel"
                       v-if="filterModel.tipoNomenclador === TipoNomenclador.CARGO"></nomenclator-cargo>
    <nomenclator-category :filter-model="filterModel"
                          v-if="filterModel.tipoNomenclador === TipoNomenclador.CATEGORIA"></nomenclator-category>
    <nomenclator-incidence  :filter-model="filterModel" v-if="filterModel.tipoNomenclador === TipoNomenclador.INCIDENCIA"></nomenclator-incidence>
    <nomenclator-market :filter-model="filterModel" v-if="filterModel.tipoNomenclador === TipoNomenclador.MERCADO"></nomenclator-market>
    <nomenclator-observation
      :filter-model="filterModel"
      v-if="filterModel.tipoNomenclador === TipoNomenclador.OBSERVACION"></nomenclator-observation>
    <nomenclator-typology :filter-model="filterModel" v-if="filterModel.tipoNomenclador === TipoNomenclador.TIPOLOGIA"></nomenclator-typology>
    <nomenclator-dpa :filter-model="filterModel" v-if="filterModel.tipoNomenclador === TipoNomenclador.DPA"></nomenclator-dpa>
    <nomenclator-moneda :filter-model="filterModel" v-if="filterModel.tipoNomenclador === TipoNomenclador.MONEDA"></nomenclator-moneda>
    <nomenclator-tipo-ponderacion
      :filter-model="filterModel"
      v-if="filterModel.tipoNomenclador === TipoNomenclador.TIPOPONDERACION"></nomenclator-tipo-ponderacion>
    <nomenclator-tipo-variedad
      :filter-model="filterModel"
      v-if="filterModel.tipoNomenclador === TipoNomenclador.TIPOVARIEDAD"></nomenclator-tipo-variedad>
    <nomenclator-tipo-clasificador
      :filter-model="filterModel"
      v-if="filterModel.tipoNomenclador === TipoNomenclador.TIPOCLASIFICADOR"></nomenclator-tipo-clasificador>
    <nomenclator-tipo-unidad-medida
      :filter-model="filterModel"
      v-if="filterModel.tipoNomenclador === TipoNomenclador.TIPOUM"></nomenclator-tipo-unidad-medida>
    <nomenclator-region :filter-model="filterModel"
                       v-if="filterModel.tipoNomenclador === TipoNomenclador.REGION"></nomenclator-region>
  </div>
</template>

<script lang="ts">
  import VBtn from "@vuetify/components/VBtn";
  import {VCard, VCardActions, VCardText, VCardTitle} from "@vuetify/components/VCard";
  import {VDataTable} from "@vuetify/components/VDataTable";
  import VDialog from "@vuetify/components/VDialog";
  import {VSpacer} from "@vuetify/components/VGrid";
  import VContainer from "@vuetify/components/VGrid/VContainer";
  import VContent from "@vuetify/components/VGrid/VContent";
  import VFlex from "@vuetify/components/VGrid/VFlex";
  import VLayout from "@vuetify/components/VGrid/VLayout";
  import VIcon from "@vuetify/components/VIcon";
  import {VList, VListTile, VListTileAction, VListTileContent, VListTileTitle} from "@vuetify/components/VList";
  import VMenu from "@vuetify/components/VMenu";
  import VSelect from "@vuetify/components/VSelect";
  import VTextField from "@vuetify/components/VTextField";
  import VTooltip from "@vuetify/components/VTooltip";
  import NomenclatorCargo from "../../components/nomenclador/dataTable/NomenclatorCargo.vue";
  import NomenclatorCategory from "../../components/nomenclador/dataTable/NomenclatorCategory.vue";
  import NomenclatorIncidence from "../../components/nomenclador/dataTable/NomenclatorIncidence.vue";
  import NomenclatorMarket from "../../components/nomenclador/dataTable/NomenclatorMarket.vue";
  import NomenclatorObservation from "../../components/nomenclador/dataTable/NomenclatorObservation.vue";
  import Nomenclators from "../../components/nomenclador/dataTable/Nomenclators.vue";
  import NomenclatorTypology from "../../components/nomenclador/dataTable/NomenclatorTypology.vue";
  import NomenclatorDpa from "../../components/nomenclador/dataTable/NomenclatorDpa.vue";
  import NomenclatorMoneda from "../../components/nomenclador/dataTable/NomenclatorMoneda.vue";
  import NomenclatorTipoPonderacion from "../../components/nomenclador/dataTable/NomenclatorTipoPonderacion.vue";
  import NomenclatorTipoVariedad from "../../components/nomenclador/dataTable/NomenclatorTipoVariedad.vue";
  import NomenclatorTipoClasificador from "../../components/nomenclador/dataTable/NomenclatorTipoClasificador.vue";
  import NomenclatorTipoUnidadMedida from "../../components/nomenclador/dataTable/NomenclatorTipoUnidadMedida.vue";
  import NomenclatorRegion from "../../components/nomenclador/dataTable/NomenclatorRegion.vue";
  import {VToolbar, VToolbarTitle} from "@vuetify/components/VToolbar";
  import {filterable} from "@shared/mixins";
  import {TipoNomenclador} from "@shared/types/TipoNomenclador";

  export default {
    name: "onei-nomenclador-list",
    components: {
      Nomenclators,
      NomenclatorCargo,
      NomenclatorCategory,
      NomenclatorIncidence,
      NomenclatorMarket,
      NomenclatorObservation,
      NomenclatorTypology,
      NomenclatorDpa,
      NomenclatorMoneda,
      NomenclatorTipoPonderacion,
      NomenclatorTipoVariedad,
      NomenclatorTipoClasificador,
      NomenclatorTipoUnidadMedida,
      NomenclatorRegion,
      VContainer,
      VContent,
      VFlex,
      VLayout,
      VSelect,
      VCard,
      VCardTitle,
      VCardText,
      VCardActions,
      VTextField,
      VDataTable,
      VMenu,
      VBtn,
      VIcon,
      VTooltip,
      VList,
      VListTile,
      VListTileContent,
      VListTileTitle,
      VListTileAction,
      VDialog,
      VSpacer,
      VToolbar,
      VToolbarTitle,
    },
    mixins: [filterable],
    data() {
      return {
        TipoNomenclador: TipoNomenclador
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .list__tile
    font-size: 13px;

  .list__tile__action
    min-width: 30px;

  .icon
    font-size: 21px;

  .list__tile__title
    font-size: 13px;

  .spacer_text_field
    margin-left: 50%;
</style>
