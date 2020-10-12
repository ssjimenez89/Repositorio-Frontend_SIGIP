<template>
  <v-dialog v-model="value" persistent :width="800">
    <v-card>
      <v-container>
        <v-card-title class="pb-0">
          <span class="headline">Captar precio</span>
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="submit" v-model="formValid" ref="form">
            <v-container class="pt-0" grid-list-md>
              <v-layout>
                <v-flex md6>
                  <template>

                    <div>
                      <b>{{variedad.variedadDescription || variedad.varietyName}}</b>

                    </div>
                    <ul>
                      <li v-for="spec in variedad.specs || variedad.caracEsp">
                        <b>{{spec.carac.desc}}</b>: {{spec.spec.desc}}
                      </li>
                    </ul>

                  </template>

                </v-flex>
                <v-flex md6>
                  <v-layout wrap>
                    <v-flex md12>
                      <generic-nomenclador-select v-if="!viewMode"
                                                  :rules="[rules.select('id')]"
                                                  :var-id="variedad.varEstabId"
                                                  nomenclador="observacionVariedad"
                                                  text="description"
                                                  val="id"
                                                  label="Observación"
                                                  v-model="variedad.observacion"
                                                  returnObject
                                                  :attach="false"
                                                  @change="changeObservacion($event)"
                      ></generic-nomenclador-select>
                      <div v-else><b>Observación: </b> {{variedad.observacion.description}}</div>
                    </v-flex>
                    <v-flex md12 v-if="!showCambiarUmForm">

                      <v-text-field v-if="!viewMode && showPrecio"
                                    :rules="[rules.greaterThanEqual(1)]"
                                    label="Precio"
                                    type="number"
                                    prefix="$"
                                    v-model="variedad.precio"
                                    min="0"
                      ></v-text-field>
                      <div v-if="viewMode || !showPrecio"><b>Precio: </b> {{variedad.precio}}</div>
                    </v-flex>
                    <v-flex md12 v-if="!showCambiarUmForm">
                      <!--                      <generic-nomenclador-select v-if="!viewMode"-->
                      <!--                                                  nomenclador="incidencia"-->
                      <!--                                                  text="description"-->
                      <!--                                                  val="id"-->
                      <!--                                                  label="Incidencia"-->
                      <!--                                                  v-model="variedad.incidencia"-->
                      <!--                                                  returnObject-->
                      <!--                      ></generic-nomenclador-select>-->
                      <div><b>Incidencia: </b>{{variedad.incidencia.description}}</div>

                    </v-flex>
                    <v-flex md12 v-if="showCambiarUmForm">
                      <modificar-u-m
                        :model="cambioUmModel"
                        :variedad="variedad"
                      ></modificar-u-m>
                    </v-flex>
                  </v-layout>

                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          valid:{{formValid}}/precio:{{variedad.precio}}
          <v-btn color="success" @click="save" v-if="!viewMode" :disabled="!isformValid">
            Aceptar
          </v-btn>
          <v-btn color="error" @click="close">
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-container>

    </v-card>
  </v-dialog>
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
  import GenericNomencladorSelect
    from "../../../../../../../shared/components/generic_nomenclador_select/generic-nomenclador-select";
  import ModificarUM from "../modificarUM/modificar-UM";
  import {variedadEstabUtils} from "../../../../../utils/variedadEstablecimiento";
  import {greaterThanEqual, select} from "@validator/validation-rules-service"

  export default {
    name: "captar-dialog-form",
    components: {
      ModificarUM,
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
      VTextField
    },
    data() {

      return {
        cambioUmModel: {
          precio: 0,
          cant: 0,
          um: -1,
          cantReal: 0,
          umReal: -1,
          tipoActual: -1
        },
        precioCorrelacionado: 0,
        cambioUmFormValid: false,
        formValid: false,
        idUM: -1,
        utils: variedadEstabUtils,
        rules: {
          greaterThanEqual: greaterThanEqual,
          select: select
        },
        showPrecio: true,
        incidenciaModel: -1,
        observacionModel: -1,
        precio: 0,


      }
    },
    props: {
      value: {
        type: Boolean,
        default: false,
        required: true
      },
      viewMode: {
        type: Boolean,
        required: false,
        default: false
      },
      variedad: {
        type: Object,
        default: {
          specs: [],
          variedadDescription: '-',
          precio: 0,
          incidencia: -1,
          observacion: -1,
          precioObservado: 0,
          correlacionado: false,
          cantObservada: 0,
          tipoUMObservada: -1

        }
      }
    },
    created() {

    },
    mounted() {
      //pedir cant de faltas ocasionales
      // this.rules.precio = [
      //   this.greaterThanEqual(1)
      // ]

    },
    computed: {
      showCambiarUmForm() {
        return this.variedad.observacion.id === 7;
      },
      isformValid() {
        return this.formValid && (this.showCambiarUmForm ? this.variedad.correlacionado : true);
      }
    },
    watch: {
      value($event) {
        if (!$event) {
          this.showPrecio = true;
          this.cambioUmModel.cant = 0;
          this.cambioUmModel.precio = 0;
        } else {
          this.$refs.form.resetValidation();
          if (this.variedad.observacion.id === 7) {
            this.precioCorrelacionado = this.variedad.precio;
          }
          this.getCant();
          this.getTipo();
        }
      }
    },
    methods: {
      getTipo() {
        debugger;
        const a = this.utils.getUmAndCant(this.variedad.specs).um;
        console.log(a,'tiposss');
        this.idUM = a.id;
        this.variedad.um = a.id;
        this.cambioUmModel.umReal = a.id;
        this.cambioUmModel.um = a.id;
        this.cambioUmModel.tipoActual = a.tipoUM;
        return a.tipoUM;
      },
      getCant() {

        const a = this.utils.getUmAndCant(this.variedad.specs).cant;
        this.cambioUmModel.cantReal = Number(a.desc);
        return Number(a.desc);
      },
      changeObservacion($event) {
        let id = $event.id;


        if (id === 5 || id === 2 || id === 3) {// Falta ocasional / Falta estacional / Falta definitiva
          this.showPrecio = false;
          this.variedad.precio = 0;
        } else {
          this.showPrecio = true;
        }

      },
      change($event) {

      },
      close() {
        this.$emit('input', false);

      },
      save() {
        this.$emit('save', this.variedad);
        this.$emit('input', false);
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
