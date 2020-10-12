<template>
  <v-content class="padding-top">
    <v-container>
      <v-layout align-center justify-center row>
        <v-flex lg10 md10 sm8 xs12>
          <generic-nom-edit-component
            :model="nomenclador"
            v-if="!loading"
            :edit-mode="false"
          >

          </generic-nom-edit-component>
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
  import {
    resolveQuery,
    resolveMutation
  } from "@/applications/onei/domain/ipc/components/nomenclador/graphql/MutationAndQueriesResolver";
  import GenericNomEditComponent
    from "@/applications/onei/domain/ipc/components/nomenclador/nomencladorEdit/genericNomEditComponent.vue";

  export default {
    name: "GenericNomViewPage",
    components: {
      GenericNomEditComponent,
      CategoryEdit,
      VContainer,
      VContent,
      VLayout,
      VFlex,
      VTooltip,
      VBtn,
      VIcon
    },
    data() {
      return {
        loading: true,
        nomenclador: {
          id: -1,
          nombre: '',
          tipo: -1,
          code: '',
          acronym: '',
          imputed: false,
          categoryId: -1,
          regionId: -1,
          tipoReal: -1
        }
      }
    },
    head: {
      title() {
        return {
          inner: this.$i18n.t(
            "applications.onei_ipc.modules.nomenclador.pages.edit_nomenclador.page_title"
          )
        };
      }
    },
    created() {
      this.fetch();
    },
    methods: {
      fetch() {

        const resolveQ = resolveQuery(this.$route.params.type, this.$route.params.id);

        this.$apollo.query(resolveQ.query).then((data) => {
          debugger;
          const nom = data.data[resolveQ.data];
          this.nomenclador = {
            id: this.$route.params.id,
            nombre: nom.description || nom.descripcion,
            activo: nom.active || nom.activo,
            tipo: nom.__typename,
            code: nom.code || nom.codeClassifier,
            acronym: nom.acronym,
            imputed: nom.imputed,
            categoryId: nom.category ? nom.category.id : nom.category,
            regionId: nom.region ? nom.region.id : nom.region,

            tipoReal: this.$route.params.type
          };
          console.log(this.nomenclador);
          this.loading = false;
        });

      },
      save() {
        debugger;
        const nom = {...this.nomenclador};
        debugger;
        const mut = resolveMutation(this.$route.params.type, nom);
        this.$apollo.mutate(mut).then((data) => {
          this.$store.dispatch('showMessage', {
            message: this.$i18n.t("applications.onei_ipc.modules.nomenclador.messages.edit_success "),
            type: 'success'
          });
          this.$router.push('/onei/sigip/ipc/nomenclador');
        });
      }
    }

  };
</script>
<style lang="stylus" scoped>
  .padding-top {
    padding: 20px 0px 0px 0px !important;
  }
</style>
