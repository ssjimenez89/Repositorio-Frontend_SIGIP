<template>
  <main-content
    title="Gestionar clasificadores">
    <clasificador-tree-view :prop-classifiers="classifiers" :load-childrens="loadChildQuery"></clasificador-tree-view>
  </main-content>
</template>
<script lang="ts">
  import Vue from "vue";
  import {GET_CLASIFICADOR_QUERY} from "@shared/graphql/queries";
  import ClasificadorTreeView from "../../components/clasificador/ClasificadorTreeView";
  import VContainer from "@vuetify/components/VGrid/VContainer";
  import VContent from "@vuetify/components/VGrid/VContent";
  import MainContent from "@shared/components/main-content/main-content";

  export default Vue.extend({
    name: "onei-clasificador-tree-view-page",
    components: {
      VContainer,
      VContent,
      MainContent,
      ClasificadorTreeView,
    },
    data() {
      return {
        idTree: null,
        classifiers: [],
        loadChildQuery: {
          query: GET_CLASIFICADOR_QUERY,
          variables() {
            return {id: this.idTree}
          },
        }
      };
    },
    mounted() {
      this.$eventBus.$on("changeTree", (data) => {
        this.idTree = data.manageClassifier.id;
      })
    },
    created() {
    },
    computed: {},
    methods: {},
    apollo: {
      classifiers: {
        query: GET_CLASIFICADOR_QUERY,
        update: data => {
          return data.classifiers;
        },
      },
    },
    head: {
      title() {
        return {
          inner: this.$i18n.t(
            "applications.onei_ipc.modules.clasificador.page_title"
          )
        };
      }
    }
  });
</script>
<style lang="stylus" scoped>
  .padding-top {
    padding: 72px 0px 0px 0px !important;
  }
</style>
