<template>
  <v-stepper v-model="currentStep">
    <v-stepper-header>
      <template v-for="(item, index) in steps">
        <v-stepper-step :complete="currentStep > index" :step="index">{{item.title}}-index:{{index}}-current:{{currentStep}}-{{currentStep > index}}</v-stepper-step>

        <v-divider></v-divider>
      </template>


      <!--<v-stepper-step :complete="currentStep > 2" step="2">Name of step 2</v-stepper-step>-->

      <!--<v-divider></v-divider>-->

      <!--<v-stepper-step step="3">Name of step 3</v-stepper-step>-->
    </v-stepper-header>

    <v-stepper-items>
      <template v-for="(item, index) in steps">
        <v-stepper-content :step="index">
          <slot :name="item.stepName"></slot>
          <v-spacer></v-spacer>
          <v-btn
                 color="primary"
                 @click="currentStep-=1"
          >
            Anterior
          </v-btn>
          <v-btn v-if="index < steps.length-1"
            color="primary"
            @click="currentStep+=1"
          >
            Continue
          </v-btn>

          <v-btn text>Cancel</v-btn>
        </v-stepper-content>
      </template>
    </v-stepper-items>

  </v-stepper>


</template>

<script>
  import {VStepper, VStepperContent, VStepperHeader, VStepperItems, VStepperStep} from "@vuetify/components/VStepper";
  import {VBtn} from "@vuetify/components/VBtn";
  import {VCard, VCardActions, VCardText, VCardTitle} from "@vuetify/components/VCard";
  import VDivider from "@vuetify/components/VDivider";

  import {VSpacer} from "@vuetify/components/VGrid";

  export default {
    name: "generic-stepper",
    components: {
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
    props:{
    steps: {
      type: Array,
      require: true,
      default: []
    }
    },
    data () {
      return {
        currentStep: 0
      }
    }
  }
</script>

<style scoped>

</style>
