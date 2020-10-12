<template>
  <v-menu
    ref="menuPro"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    full-width
    min-width="290px"

  >
    <template v-slot:activator="{on}">
      <v-text-field
        v-model="fieldDate"
        :label="label"
        prepend-icon="event"
        readonly
        v-on="on"
      >

      </v-text-field>
    </template>
    <v-date-picker
      locale="es-ES"
      type="month"
      ref="pickerPro"
      v-model="pickerDate"
      :max="max"
      :min="min"
      @input="menu = false"
      :no-title="title"
      :show-current="false"
      color="primary"
    >
      <v-spacer></v-spacer>
      <v-btn text color="primary"
       small
       outline
       @click="clear"
       v-if="clearButton"
      >Limpiar</v-btn>
    </v-date-picker>

  </v-menu>
</template>

<script>
  import VDatePicker from "@vuetify/components/VDatePicker/VDatePicker";
  import VMenu from "@vuetify/components/VMenu/VMenu";
  import VTextField from "@vuetify/components/VTextField/VTextField";
  import VBtn from "@vuetify/components/VBtn";
  import {VSpacer} from "@vuetify/components/VGrid";

  export default {
    name: "month-picker-menu",
    components: {
      VDatePicker,
      VMenu,
      VTextField,
      VBtn,
      VSpacer
    },
    props:{
      clearButton:{
        type: Boolean,
        default: false
      },
      title: {
        type: Boolean,
        default: true,
        required: false
      },
      min: {
        type: String,
        required: false,
        default: (new Date().toISOString().substr(0,4))+'-01-01'
      },
      max: {
        type: String,
        required: false,
        default: new Date().toISOString().substr(0,10)
      },
      value: {
        type: String,
        required: false,
        default: ''
      },
      label: {
        type: String,
        required: false
      }
    },
    created(){

      this.fieldDate = this.value;
      this.pickerDate = this.fieldDate !== '' ? (new Date().toISOString().substr(0,5)) + this.fieldDate : '';
    },
    data(){
      return {
        pickerDate:'',
        fieldDate: '',
        menu: false

      }
    },
    watch: {
      pickerDate (val){
        this.fieldDate = this.pickerDate.split('-')[1];
      },
      menu (val){
        if(!val){
          this.$emit('input', this.fieldDate);
          this.$emit('change', this.fieldDate);
        }
      }
    },
    methods:{
      clear(){
        this.fieldDate = '';
        this.menu = false;
      }
    }
  }
</script>

<style scoped>

</style>
