<template>
  <v-menu
    :close-on-content-click="false"
    full-width
    min-width="290px"
    offset-y
    transition="scale-transition"
    v-model="menu"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        :label="label"
        prepend-icon="event"
        readonly
        v-model="fieldDate"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker locale="es-ES" v-model="pickerDate"
                   @input="inputDatePicker($event)"
                   :no-title="title"
                   color="primary"
                   :min="min"
                   :max="max"
    >
      <v-spacer></v-spacer>
      <v-btn text color="primary" v-if="clearButton"
             small
             outline
             @click="clear"
      >Limpiar
      </v-btn>

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
    name: "date-picker-menu",
    components: {
      VDatePicker,
      VMenu,
      VTextField,
      VBtn,
      VSpacer
    },
    props: {
      clearButton: {
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
        required: false
      },
      max: {
        type: String,
        required: false,
        default: new Date().toISOString().substr(0, 10)
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
    created() {
      this.fieldDate = this.value !== '' ? this.formatDate(this.value) : this.fieldDate;
      this.pickerDate = this.value !== '' ? this.value : this.pickerDate;
    },
    data() {
      return {
        pickerDate: new Date().toISOString().substr(0, 10),
        fieldDate: '',
        menu: false
      }
    },
    methods: {

      inputDatePicker($event) {
        debugger;
        this.menu = false;
        if ($event !== null) {
          //pickerDate esta en formato YYYY-MM-DD y fieldDate en DD-MM-YYYY
          if ($event === '') {
            this.fieldDate = '';
            this.pickerDate = '';
          } else {
            this.fieldDate = this.formatDate($event);
          }

          this.$emit('input', this.fieldDate);
          this.$emit('change', this.fieldDate);
        }
      },
      clear() {
        this.menu = false;
        this.inputDatePicker('');
      },
      formatDate(date) {
        if (!date) return null;

        const [year, month, day] = date.split('-');
        return `${day}-${month}-${year}`;


      }
    }
  }
</script>

<style scoped>

</style>
