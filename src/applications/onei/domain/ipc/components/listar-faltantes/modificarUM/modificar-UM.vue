<template>
  <v-layout wrap>
    <v-flex md12>
      <v-text-field
        :rules="[rules.greaterThanEqual(1)]"
        label="Precio observado"
        type="number"
        prefix="$"
        v-model="model.precio"
      ></v-text-field>
    </v-flex>
    <v-flex md12>
      <v-text-field
        :rules="[rules.greaterThanEqual(1)]"
        label="Cantidad de la presentación actual"
        type="number"
        v-model="model.cant"
      ></v-text-field>
    </v-flex>
    <v-flex md12>
      <tipos-unidad-medida-select
        v-model="model.um"
        :tipo-um="model.tipoActual"
      ></tipos-unidad-medida-select>
    </v-flex>
    <v-flex md12>
      <v-layout>
        <v-flex md6>
          <div style="margin-top:6px">
            <b>Precio correlacionado:</b>{{variedad.precio}}
          </div>
        </v-flex>
        <v-flex md3>

          <v-btn color="primary" :disabled="(parseInt(model.precio, 10)<=0)|| (parseInt(model.cant, 10)<=0)" small
                 @click="correlacionar()">
            Correlacionar
          </v-btn>
          <!--          <a href="#" @click.prevent="correlacionar()">-->
          <!--            Correlacionar-->
          <!--          </a>-->
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
  import VTextField from "@vuetify/components/VTextField";
  import VContainer from "@vuetify/components/VGrid/VContainer";
  import VDialog from "@vuetify/components/VDialog";
  import {VCard, VCardActions, VCardText, VCardTitle} from "@vuetify/components/VCard";
  import VFlex from "@vuetify/components/VGrid/VFlex";
  import VLayout from "@vuetify/components/VGrid/VLayout";
  import {VSpacer} from "@vuetify/components/VGrid";
  import VBtn from "@vuetify/components/VBtn";
  import VForm from "@vuetify/components/VForm";
  import VSelect from "@vuetify/components/VSelect";
  import GenericNomencladorSelect
    from "../../../../../../../shared/components/generic_nomenclador_select/generic-nomenclador-select";
  import TiposUnidadMedidaSelect
    from "../../../../../../../shared/components/tipos-unidad-medida-select/tipos-unidad-medida-select";
  import {QUERY_CAMBIO_UM} from "../../listarcaptaciones/graphql/graphql-listarcaptaciones";
  import {greaterThanEqual} from "@validator/validation-rules-service"

  export default {
    name: "modificarUM",
    components: {
      TiposUnidadMedidaSelect,
      VForm,
      GenericNomencladorSelect,
      VCard,
      VCardActions,
      VCardText,
      VCardTitle,
      VFlex,
      VLayout,
      VSpacer,
      VBtn,
      VDialog,
      VContainer,
      VTextField,
      VSelect
    },
    props: {

      model: {
        type: Object,
        required: true,
        default: () => {
          return {
            precio: 0,
            cant: 0,
            um: -1,
            cantReal: 0,
            umReal: -1,
            tipoActual: -1
          }
        }
      },
      variedad: {
        type: Object,
        required: true,
        default: () => {
          return {
            id: -1,
            precio: 0,
            incidencia: -1,
            observacion: -1,
            precioObservado: 0,
            correlacionado: false,
            cantObservada: 0,
            tipoUMObservada: -1
          }
        }
      }
    },
    created() {
      //mandar a buscar el precio nuevo

      //this.tipoUM
    },
    data() {
      return {
        rules: {
          greaterThanEqual: greaterThanEqual

        },
        precio: 0,
        cant: 0,
        query: {
          query: QUERY_CAMBIO_UM,
          variables: {}
        },
        tipo: -1
      }
    },
    methods: {
      correlacionar() {
        this.query.variables = {
          precioObservado: this.model.precio,
          cantidadObservada: this.model.cant,
          cantidadActual: this.model.cantReal,
          specificationIdUMObservada: this.model.um,
          specificationIdUMActual: this.model.umReal,
          varEstabId: this.variedad.varEstabId
        };

        this.$apollo.query(this.query).then((data) => {
          this.variedad.precio = data.data.cambioUM;
          this.variedad.correlacionado = true;
        });
      }
    }
  }
</script>

<style scoped>

</style>
