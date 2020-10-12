<template xmlns="http://www.w3.org/1999/html">
  <main-content
    :title="$i18n.t('applications.onei_ipc.modules.imputarprecio.page_title')"

  >
    <v-card-text class="pa-0">
      <generic-filter
        @filter-change="updateFilter($event)"
        :only="['dpa', 'findestablecimiento', 'tipologia', 'nombreVariedad']"
      >
      </generic-filter>

      <imputar-precio-show-list :filter-models="filterModel"></imputar-precio-show-list>

    </v-card-text>
  </main-content>
</template>

<script>
  import GenericFilter from "../../../../../../shared/components/generic-filter/generic-filter";
  import imputarPrecioShowList from "../../components/listarImputarPrecio/imputarPrecioShowList";
  import VContainer from "@vuetify/components/VGrid/VContainer";
  import VContent from "@vuetify/components/VGrid/VContent";
  import VCard from "@vuetify/components/VCard/VCard";
  import VCardTitle from "@vuetify/components/VCard/VCardTitle";
  import {VCardActions, VCardText} from "@vuetify/components/VCard";
  import VLayout from "@vuetify/components/VGrid/VLayout";
  import VBtn from "@vuetify/components/VBtn/VBtn";
  import MainContent from "@shared/components/main-content/main-content";

  export default {
    name: "imputarPrecioViewPage",
    components: {
      imputarPrecioShowList,
      GenericFilter,
      VCard,
      VCardTitle,
      VCardText,
      VContainer,
      VContent,
      VCardActions,
      VBtn,
      MainContent,
      VLayout
    },
    data: () => ({
      filterModel: {}
    }),
    methods: {
      updateFilter($event) {
        debugger;
        this.filterModel = {...$event};
      }
    }
  }


</script>

<style scoped>

</style>
