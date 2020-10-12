<template>
  <v-card class="add_container">
    <v-layout row>
      <v-flex xs12>
        <v-card class="card-flex-toolbar">
          <v-toolbar card color="primary" dark>
            <v-toolbar-title class="subheading">
              {{$t('applications.onei_administracion.modules.rol.pages.edit_rol.form_title')}}
            </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <v-form @submit.prevent="submit" v-model="valid" ref="formEdirPermiso">
              <v-container fluid grid-list-xl>
                <v-layout wrap>
                  <v-flex md10 xs12>
                    <v-text-field
                      :rules="rules.generica"
                      name="descripcion"
                      label="Descripción*"
                      placeholder="Descripción del Rol"
                      required
                      v-model="data.description"
                    ></v-text-field>
                  </v-flex>
                  <v-flex md2 xs12>
                    <v-checkbox
                      v-model="data.activo"
                      label="Activo"
                      name="activo"
                      placeholder="Activo"
                      required
                    ></v-checkbox>
                  </v-flex>
                  <v-flex xs12 md12 d-flex>
                    <v-select
                      v-model="data.permisos"
                      :rules="rules.seleccionar"
                      :items="lista_permisos_restantes"
                      item-value="id"
                      item-text="description"
                      name="permiso"
                      dense
                      label="Permisos*"
                      no-data-text="A seleccionado ya todos los permisos."
                      chips
                      hide-selected
                      small-chips
                      deletable-chips
                      multiple
                      return-object
                    >
                    </v-select>
                  </v-flex>
                  <v-flex md12 xs12>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        :disabled="!valid"
                        color="success"
                        type="submit"
                      >
                        Actualizar
                      </v-btn>
                      <v-btn
                        :to="`/onei/sigip/administracion/roles/`"
                        color="error"
                        type="button"
                      >
                        Cancelar
                      </v-btn>
                    </v-card-actions>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-card>
</template>
<script lang="ts">
import Validator from "@validator/validator";
import VBtn from "@vuetify/components/VBtn";
import {VCard, VCardActions, VCardText, VCardTitle,} from "@vuetify/components/VCard";
import VCheckbox from "@vuetify/components/VCheckbox";
import VChip from "@vuetify/components/VChip";
import VDialog from "@vuetify/components/VDialog";
import VDivider from "@vuetify/components/VDivider";
import VForm from "@vuetify/components/VForm";
import {VSpacer} from "@vuetify/components/VGrid";
import VContainer from "@vuetify/components/VGrid/VContainer";
import VContent from "@vuetify/components/VGrid/VContent";
import VFlex from "@vuetify/components/VGrid/VFlex";
import VLayout from "@vuetify/components/VGrid/VLayout";
import VIcon from "@vuetify/components/VIcon";
import VSelect from "@vuetify/components/VSelect";
import VSlider from "@vuetify/components/VSlider";
import VSnackbar from "@vuetify/components/VSnackbar";
import VSubheader from "@vuetify/components/VSubheader";
import VSystemBar from "@vuetify/components/VSystemBar";
import VTextField from "@vuetify/components/VTextField";
import {VToolbar, VToolbarTitle} from "@vuetify/components/VToolbar";
import {IRol} from "../../interfaces/rol/IRol";
import {get_permisos,get_permisos_contenga, update_rol} from "../../services/rol_services";

export default {
  name: "onei-rol-edit",
  components: {
    VCard,
    VCardTitle,
    VCardText,
    VTextField,
    VContainer,
    VContent,
    VLayout,
    VFlex,
    VForm,
    VCardActions,
    VBtn,
    VToolbar,
    VToolbarTitle,
    VIcon,
    VSpacer,
    VDivider,
    VSnackbar,
    VSelect,
    VSlider,
    VCheckbox,
    VDialog,
    VSubheader,
    VSystemBar,
    VChip,
  },
  props: {
    data: {
      type: Object,
      required: true,
    }
  },

  created() {
    get_permisos().then(({data}) => {
      this.lista_permisos_restantes = data.map(e => {
        return {...e, id:e.idpermiso}
        })
    })
  },

  data() {
    const defaultForm: IRol = {
      description: this.data.description,
      permisos: this.data.permisos,
      activo: this.data.activo,
    };
    return {
      valid: false,
      formEdirRol: Object.assign({}, defaultForm),
      rules: {
        seleccionar: [val => Validator.of(val).requiredSelected().validate],
        generica: [
          val =>
            Validator.of(val)
              .required()
              .lettersconstraint().validate
        ],
      },
      defaultForm,
      lista_permisos: [],
      lista_permisos_restantes: [],
    };

  },

  computed: {
    formIsValid(): boolean {
      return (
        this.formEdirRol.description != "" &&
        this.formEdirRol.permiso != "" &&
        this.formEdirRol.activo != ""
      )
    }
  },

  methods: {

    submit(e) {
      const formData = new FormData(e.target);

      const tempRoles = this.data.permisos.map
      (e =>e.id);

      this.defaultForm.description = formData.get("descripcion");
      this.defaultForm.activo = e.target.elements[1].checked;
      this.defaultForm.permisos = tempRoles;

      update_rol(this.data.idRol ,this.defaultForm).then(e => {
        const mensaje = e.headers["x-sigipapp-info"];
        this.$store.dispatch('showMessage', {
          message: mensaje,
          type: 'success'
        });
        this.$router.push('/onei/sigip/administracion/roles');
      }).catch(error=> {
        const mensaje = error.response.headers["x-sigipapp-badrequest"];
        this.$store.dispatch('showMessage', {
          message: mensaje,
          type: 'error'
        });
      });

    },
  }
};
</script>
<style lang="stylus" scoped>
  .add_container
    width: 100%

  .add_form
    width: 100%
</style>
