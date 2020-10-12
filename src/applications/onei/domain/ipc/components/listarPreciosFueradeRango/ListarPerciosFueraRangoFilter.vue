<template>
  <v-container class="pb-0 px-0">
    <div class="div-content-filter mb-0">
      <v-flex class="pa-0" d-flex md6 xs12>
        <v-container fluid grid-list-xl>

          <v-layout justify-space-around wrap>
            <v-flex d-flex lg6 md12 xs12>
              <v-select
                :items="markets"
                :label="this.$i18n.t('applications.onei_ipc.modules.listarPreciosFueraRango.self_component.market')"

                v-model="marketSelected"

              ></v-select>
            </v-flex>

            <v-flex d-flex lg6 md12 xs12>
              <v-select
                :items="variacion"
                :label="this.$i18n.t('applications.onei_ipc.modules.listarPreciosFueraRango.self_component.variacion')"

                v-model="variacionSelected"

              ></v-select>
            </v-flex>
          </v-layout>


          <v-layout justify-space-around wrap>
            <v-flex d-flex lg6 md12 xs12>
              <v-select
                :items="establecimiento"
                :label="this.$i18n.t('applications.onei_ipc.modules.listarPreciosFueraRango.self_component.establecimiento')"

                v-model="establecimientoSelected"

              ></v-select>

            </v-flex>

            <v-flex d-flex lg4 md8 xs7>
              <v-select
                :items="months"
                :label="this.$i18n.t('applications.onei_ipc.modules.listarPreciosFueraRango.self_component.month')"

                v-model="monthSelected"

              ></v-select>
            </v-flex>

            <v-flex d-flex lg2 md4 xs5>
              <v-select
                :items="years"
                :label="this.$i18n.t('applications.onei_ipc.modules.listarPreciosFueraRango.self_component.year')"

                v-model="yearSelected"

              ></v-select>
            </v-flex>
          </v-layout>

        </v-container>
      </v-flex>


      <v-flex d-flex md6 xs12>
        <v-container fluid grid-list-xl>
          <v-layout wrap>
            <v-flex d-flex lg6 md12 xs12>
              <v-select
                :items="dpa"
                :label="this.$i18n.t('applications.onei_ipc.modules.listarPreciosFueraRango.self_component.dpa')"

                v-model="dpaSelected"
              ></v-select>
            </v-flex>

            <v-flex d-flex lg6 md12 xs12>
              <v-select
                :items="variedad"
                :label="this.$i18n.t('applications.onei_ipc.modules.listarPreciosFueraRango.self_component.variedad')"

                v-model="variedadSelected"

              ></v-select>

            </v-flex>

          </v-layout>
          <v-layout justify-end wrap>
            <v-flex lg6 md12 xs12>
              <v-select
                :items="semana"
                :label="this.$i18n.t('applications.onei_ipc.modules.listarPreciosFueraRango.self_component.semana')"


                v-model="semanaSelected"

              ></v-select>
            </v-flex>

            <v-flex d-flex lg6 md12 xs12>
              <v-select
                :items="precios"
                :label="this.$i18n.t('applications.onei_ipc.modules.listarPreciosFueraRango.self_component.precio')"


                v-model="preciosSelected"

              ></v-select>
            </v-flex>
          </v-layout>

        </v-container>

      </v-flex>
    </div>

    <!--    <v-layout column align-end class="mr-4">-->
    <!--      <v-layout row align-end>-->
    <!--        <v-btn color="primary" to=".">-->
    <!--          {{$t('applications.onei_ipc.modules.listarCaptaciones.self_component.search')}}-->
    <!--        </v-btn>-->
    <!--      </v-layout>-->
    <!--    </v-layout>-->


  </v-container>
</template>

<script>


    import VDatePicker from "@vuetify/components/VDatePicker/VDatePicker";
    import VMenu from "@vuetify/components/VMenu/VMenu";
    import VTextField from "@vuetify/components/VTextField/VTextField";
    import VContent from "@vuetify/components/VGrid/VContent";
    import VContainer from "@vuetify/components/VGrid/VContainer";
    import VLayout from "@vuetify/components/VGrid/VLayout";
    import VFlex from "@vuetify/components/VGrid/VFlex";
    import VSelect from "@vuetify/components/VSelect/VSelect";
    import VBtn from "@vuetify/components/VBtn/VBtn";
    import VCard from "@vuetify/components/VCard/VCard";

  export default {
    name: "ListarPerciosFueraRangoFilter",
    components: {
      VDatePicker,
      VMenu,
      VTextField,
      VContent,
      VContainer,
      VLayout,
      VFlex,
      VSelect,
      VBtn,
      VCard

    },

    data() {
      return {
        semana: [],
        semanaSelected: '',
        marketSelected: '',
        markets: [1, 2, 3],
        variacionSelected: '',
        variacion: [],
        establecimientoSelected: '',
        establecimiento: [],
        monthSelected: '',
        months: [],
        yearSelected: '',
        years: [2019],
        dpaSelected: '',
        dpa: [],
        variedadSelected: '',
        variedad: [],
        preciosSelected: '',
        precios: []
      }
    },


  }
</script>

<style lang="stylus" scoped>
  .div-content-filter
    display flex
    margin 0px 0px 0px 0px

  .div-content
    padding 0px 0px 0px 0px


</style>


