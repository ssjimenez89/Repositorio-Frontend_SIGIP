<template>
  <v-content class="padding-top">
    <v-container>
      <v-layout align-center justify-center row>
        <v-flex lg10 md10 sm8 xs12>
          <category-edit></category-edit>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>
<script lang="ts">
  import VBtn from "@vuetify/components/VBtn";
  import VContainer from "@vuetify/components/VGrid/VContainer";
  import VContent from "@vuetify/components/VGrid/VContent";
  import VFlex from "@vuetify/components/VGrid/VFlex";
  import VLayout from "@vuetify/components/VGrid/VLayout";
  import VIcon from "@vuetify/components/VIcon";
  import VTooltip from "@vuetify/components/VTooltip";
  import CategoryEdit from "../../components/nomenclador/nomencladorEdit/category.vue";

  export default {
    name: "onei-categoria-edit-page",
    components: {
      CategoryEdit,
      VContainer,
      VContent,
      VLayout,
      VFlex,
      VTooltip,
      VBtn,
      VIcon
    },
    head: {
      title() {
        return {
          inner: this.$i18n.t(
            "applications.onei_ipc.modules.nomenclador.pages.edit_nomenclador.page_title"
          )
        };
      }
    }
  };
</script>
<style lang="stylus" scoped>
  .padding-top {
    padding: 20px 0px 0px 0px !important;
  }
</style>
