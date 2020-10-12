<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>

    <v-stepper v-model="currentStep">
      <v-stepper-header>

        <v-stepper-step :complete="currentStep > 1" :step="1">Seleccionar Establecimiento</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="currentStep > 2" :step="2">Captar Precio</v-stepper-step>
        <!--<v-divider></v-divider>-->
        <!--<v-stepper-step :complete="currentStep > 3" :step="3">Finalizar</v-stepper-step>-->


        <!--<v-stepper-step :complete="currentStep > 2" step="2">Name of step 2</v-stepper-step>-->

        <!--<v-divider></v-divider>-->

        <!--<v-stepper-step step="3">Name of step 3</v-stepper-step>-->
      </v-stepper-header>

      <v-stepper-items>

        <v-stepper-content :step="1">
          <step-pick-establecimiento
            @change="pickEstablish($event)"
          ></step-pick-establecimiento>
          <div class="btnContainer">
            <v-btn
              color="primary"
              @click="currentStep+=1"
              :disabled="establishmentId === -1"
            >
              Continue
            </v-btn>
            <v-btn
              to="/onei/sigip/ipc/captaciones/listarcaptacionesall"
              color="error"
            >Cancelar
            </v-btn>
          </div>


        </v-stepper-content>
        <v-stepper-content :step="2">
          <step-captar-precio v-if="currentStep >=2"
                              :establesimientoId="establishmentId"
                              @captacion-status="changeStatus($event)"
                              @captacion-values="captacionValues = $event"
          ></step-captar-precio>
          <confirm-precies-dialog
            v-model="dialogPrecio"
            :data="captaciones"
            @save="save"
          >
          </confirm-precies-dialog>
          <div class="btnContainer">
            <v-btn
              color="primary"
              @click="currentStep-=1"
            >
              Anterior
            </v-btn>
            <v-btn
              color="primary"
              @click="setValues"
              :disabled="!captacionStatus"
            >
              Guardar
            </v-btn>

            <v-btn
              to="/onei/sigip/ipc/captaciones/listarcaptacionesall"
              color="error"
            >Cancelar
            </v-btn>
          </div>

        </v-stepper-content>
        <!--<v-stepper-content :step="3">-->
        <!--<step-complete-->
        <!--v-model="captaciones"-->
        <!--&gt;</step-complete>-->

        <!--<div class="btnContainer">-->
        <!--<v-btn-->
        <!--color="primary"-->
        <!--@click="currentStep-=1"-->
        <!--&gt;-->
        <!--Anterior-->
        <!--</v-btn>-->
        <!--<v-btn-->
        <!--color="primary"-->
        <!--@click="openConfirmDialog"-->
        <!--&gt;-->
        <!--Guardar-->
        <!--</v-btn>-->

        <!--<v-btn-->
        <!--color="error"-->
        <!--&gt;Cancel-->
        <!--</v-btn>-->
        <!--</div>-->
        <!--</v-stepper-content>-->

      </v-stepper-items>

    </v-stepper>
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="290">

        <v-card>
          <v-card-title class="headline">Desea continuar?</v-card-title>
          <v-card-text>La suma de los precios de las variedades captadas es <b>${{total()}}</b>. Si es el valor correcto
            haga click en aceptar.
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click="dialog = false">Cancelar</v-btn>
            <v-btn color="green darken-1" flat @click="dialog = false">Aceptar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
  import {VStepper, VStepperContent, VStepperHeader, VStepperItems, VStepperStep} from "@vuetify/components/VStepper";
  import {VBtn} from "@vuetify/components/VBtn";
  import {VCard, VCardActions, VCardText, VCardTitle} from "@vuetify/components/VCard";
  import VDivider from "@vuetify/components/VDivider";
  import {ADD_CAPTACION_MUTATION} from "../../listarcaptaciones/graphql/graphql-listarcaptaciones";
  import {VSpacer} from "@vuetify/components/VGrid";
  import StepPickEstablecimiento from "../steps/step-pick-establecimiento";
  import StepCaptarPrecio from "../steps/step-captar-precio";
  import StepComplete from "../steps/step-complete";
  import VLayout from "@vuetify/components/VGrid/VLayout";
  import VDialog from "@vuetify/components/VDialog";
  import ConfirmPreciesDialog from "../confirm-precies-dialog";

  export default {
    name: "captar-precio-wizard",
    components: {
      ConfirmPreciesDialog,
      VDialog,
      VLayout,
      StepComplete,
      StepCaptarPrecio,
      StepPickEstablecimiento,
      VStepper,
      VStepperContent,
      VStepperHeader,
      VStepperItems,
      VStepperStep,
      VCard,
      VCardActions,
      VCardText,
      VCardTitle,
      VDivider,
      VSpacer,
      VBtn
    },
    props: {},
    data() {
      return {
        dialogPrecio: false,
        establishmentId: -1,
        currentStep: 0,
        captacionStatus: false,
        captacionValues: {},
        captaciones: {},
        dialog: false
      }
    },
    methods: {
      pickEstablish($event) {
        debugger;
        this.establishmentId = $event;
      },
      total() {
        let cant = 0;

        Object.values(this.captaciones).forEach(e => {
          cant += parseFloat(e.precio);
        });
        console.log('asdasdasdasdasd');
        return cant;
      },
      changeStatus($event) {
        debugger;
        this.captacionStatus = $event;
      },
      setValues() {
        debugger;
        this.captaciones = {...this.captacionValues};
        console.log('el valor de la captacion', Object.values(this.captacionValues).map(e => e.precio));
        let i = 0;
        // while (i <6){
        //   this.captaciones[i] = {precio:1,variedadDescription:"asdasd"}
        //   i++;
        // }

        this.dialogPrecio = true;
        //this.currentStep += 1;

      },
      openConfirmDialog() {
        this.dialog = true;
      },
      save() {
        debugger;
        console.log(this.captaciones);
        const inputs = Object.values(this.captaciones).map(e => {
          const obj = {
            id: -1,
            users: this.$store.getters["@onei.login/userId"],
            price: e.precio,
            incidence: e.incidencia.id,
            observation: e.observacion.id,
            dvarEstabId: e.varEstabId,
            establishment: this.establishmentId
          };
          return {...obj};
        });

        const mutation = {
          mutation: ADD_CAPTACION_MUTATION,
          variables: {
            catchmentInputs: inputs
          },
          update: (cache, data) => {
            this.$apolloCache.invalidateQuery('catchmentsByFilter');
          }
        };
        this.$apollo.mutate(mutation).then(data => {
          console.log(data.data.addCatchment + "");
          this.$store.dispatch("showMessage", {
            message: "Precios captados satisfactoriamente.",
            type: "success"
          });
          this.$router.push("/onei/sigip/ipc/captaciones/listarcaptacionesall");
        });
      }
    }
  }
</script>

<style scoped lang="stylus">
  .btnContainer
    display flex
    justify-content: flex-end
</style>
