<template xmlns="http://www.w3.org/1999/html">
  <v-content class="mx-3 mt-3">
    <v-container class="mx-5">
      <v-card class="elevation-15 mx-5" flat>
        <v-card-title class="primary white--text subheading font-weight-bold">
          {{$t('applications.onei_ipc.modules.listarPreciosFueraRango.page_title')}}

          <!--                      <v-spacer></v-spacer>-->
          <!--                      <v-btn flat icon small class="primary" v-on:click="show=!show">-->
          <!--                        .-->
          <!--                      </v-btn>-->


        </v-card-title>
        <v-card-text class="pa-0">

<!--          <listar-percios-fuera-rango-filter/>-->

          <generic-filter
            @filter-change="updateFilter($event)"
            :all-exept="['establecimiento', 'usuario', 'tipologia', 'fecha', 'variedad']">

<!--          <v-flex md3>-->

<!--            <autocomplete-establecimiento-filed/>-->

<!--          </v-flex>-->
<!--            <v-flex md3>-->
<!--              <generic-nomenclador-select-->
<!--                :items="semanas.semana"-->
<!--                :label="this.$i18n.t('applications.onei_ipc.modules.listarPreciosFueraRango.self_component.semana')"-->
<!--                v-model="semanaSelected"-->
<!--                @change="emit('semanaSelected', semanaSelected)"-->
<!--              ></generic-nomenclador-select>-->
<!--            </v-flex>-->

            <v-flex md3>
              <v-select
                :items="semana"
                :label="this.$i18n.t('applications.onei_ipc.modules.listarPreciosFueraRango.self_component.semana')"
                item-value="id"
                item-text="description"
                return-object
                @change="updateFilterWeek($event)"
                v-model="semanaSelected"

              ></v-select>
            </v-flex>
          </generic-filter>

          <listar-precio-fuera-rango-show-list>
            :filterModels="filterModels"
          </listar-precio-fuera-rango-show-list>
          <v-layout align-end class="mr-4" column>
            <v-layout align-end row>

              <v-btn color="primary">
                {{$t('applications.onei_ipc.modules.listarPreciosFueraRango.self_component.aprobar')}}
              </v-btn>


              <v-btn color="primary">
                {{$t('applications.onei_ipc.modules.listarPreciosFueraRango.self_component.desaprobar')}}
              </v-btn>
              <v-btn color="primary" to=".">
                {{$t('applications.onei_ipc.modules.listarPreciosFueraRango.self_component.export')}}
              </v-btn>


            </v-layout>
          </v-layout>
        </v-card-text>


      </v-card>
    </v-container>
  </v-content>
</template>

<script>


    import VContainer from "@vuetify/components/VGrid/VContainer";
    import VContent from "@vuetify/components/VGrid/VContent";
    import VBtn from "@vuetify/components/VBtn/VBtn";
    import VFlex from "@vuetify/components/VGrid/VFlex";
    import {VSpacer} from "@vuetify/components/VGrid";
    import VLayout from "@vuetify/components/VGrid/VLayout";
    import VCard from "@vuetify/components/VCard/VCard";
    import {VCardActions, VCardText} from "@vuetify/components/VCard";
    import VCardTitle from "@vuetify/components/VCard/VCardTitle";
    import ListarPerciosFueraRangoFilter
        from "../../components/listarPreciosFueradeRango/ListarPerciosFueraRangoFilter";
    import ListarPrecioFueraRangoShowList
        from "../../components/listarPreciosFueradeRango/ListarPrecioFueraRangoShowList";
    import GenericFilter from "../../../../../../shared/components/generic-filter/generic-filter";
    import AutocompleteEstablecimientoFiled
        from "../../../../../../shared/components/autocomplete-establecimiento-field/autocomplete-establecimiento-filed";
    import VSelect from "@vuetify/components/VSelect/VSelect";
    import GenericNomencladorSelect
      from "../../../../../../shared/components/generic_nomenclador_select/generic-nomenclador-select";

  export default {
    name: "ListarPrecioFueraRangoViewPage",
    components: {
      GenericNomencladorSelect,
        AutocompleteEstablecimientoFiled,
        GenericFilter,
      ListarPrecioFueraRangoShowList,
      ListarPerciosFueraRangoFilter,

      VCard,
      VCardActions,
      VCardText,
      VCardTitle,
      VContainer,
      VContent,
      VBtn,
      VFlex,
      VSpacer,
      VLayout,
      VSelect


    },
    data: () => ({
        show: true,
        filterModels:{},
      semanas:"1",

        semana:[
          {
            id: 1,
            description: "Semana 1"
          },
          {
            id: 2,
            description: "Semana 2"
          },
          {
            id: 3,
            description: "Semana 3"
          },
          {
            id: 4,
            description: "Semana 4"
          }

        ],

        semanaSelected: ''
    }),
      methods: {

          updateFilter($event){
              this.filterModels = {...$event};
          },
        updateFilterWeek($event) {
          debugger;
          this.filterModel.semana = $event.id;
          this.updateFilter(this.filterModel);
        }



      }


  }
</script>


<style scoped>

</style>
