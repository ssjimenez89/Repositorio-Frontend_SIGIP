<template>
  <v-card class="add_container">
    <v-layout row>
      <v-flex xs12>
        <v-card class="card-flex-toolbar">
          <v-toolbar card color="primary" dark>
            <v-toolbar-title class="subheading">
              {{$t('applications.onei_administracion.modules.permiso.pages.add_permiso.form_title')}}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn :title="$t('applications.onei_administracion.modules.permiso.pages.add_permiso.form_reset_button')" @click="resetForm"
                   icon>
              <v-icon>refresh</v-icon>
            </v-btn>
            <v-btn
              :disabled="!formIsValid"
              :title="$t('applications.onei_administracion.modules.permiso.pages.add_permiso.form_send_button')"
              icon>
              <v-icon>check</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <v-form @submit.prevent="submit" ref="formAddPermiso">
              <v-container fluid grid-list-xl>
                <v-layout wrap>
                  <v-flex md12 xs12>
                    <v-text-field
                      :rules="rules.description"
                      name="descripcion"
                      color="blue darken-2"
                      label="Descripción"
                      placeholder="Descripción del PERMISO_BASICO"
                      required
                      v-model="formAddPermiso.description"
                    ></v-text-field>
                  </v-flex>
                  <v-flex md10 xs12>
                    <v-text-field
                      :rules="rules.permiso"
                      name="permiso"
                      color="blue darken-2"
                      label="Permiso"
                      placeholder="PERMISO_BASICO"
                      required
                      v-model="formAddPermiso.permiso"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md4 d-flex>
                    <v-select
                      v-model="rolesSelected"
                      item-text="description"
                      name="idrol"
                      item-value="id"
                      :items="roles"
                      :label="$t('applications.onei_administracion.modules.permiso.pages.add_permiso.rol')"
                      :rules="rules.rol"
                    ></v-select>
                  </v-flex>
                  <v-flex md2 xs12>
                    <v-checkbox
                      :rules="rules.rol"
                      color="blue darken-2"
                      label="Rol"
                      placeholder="true"
                      required
                      disabled
                      v-model="formAddPermiso.activo"
                    ></v-checkbox>
                  </v-flex>
                  <v-flex md12 xs12>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        :disabled="!formIsValid"
                        color="primary"
                        type="submit"
                      >
                        Registrar
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
import {
  CREATE_COUNTRY_MUTATION,
  GET_CONTINENTS_QUERY,
  GET_COUNTRIES_QUERY
} from "../../components/country/graphql/graphql-country.js";
import {IPermiso} from "../../interfaces/permiso/IPermiso";
import {add_permiso} from "../../services/permiso_services";

export default {
  name: "onei-permiso-add",
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
      type: Array,
      required: true,
    },
  },
  data() {
    const defaultForm: IPermiso = {
      description: "",
      permiso: "",
      activo: true,
      idRol: -1
    };
    return {
      roles:[
        {
          id:  1,
          activo: true,
          description: "Rol1",
          rol: "rol",
        }
      ],
      rolesSelected:null,
      formAddPermiso: Object.assign({}, defaultForm),
      rules: {
        description: [val => (val || "").length > 0 || "El campo descripción es obligatorio"],
        permiso: [val => (val || "").length > 0 || "El campo permiso es obligatorio"],
        activo: [val => (val || "").length > 0 || "This field is required"],
        rol: [val => (val || "") || "This field is required"],
      },
      defaultForm,
    };
  },
  computed: {
    formIsValid(): boolean {
      return (
        this.formAddPermiso.description != "" &&
        this.formAddPermiso.permiso != "" &&
        this.formAddPermiso.idRol != "" &&
        this.formAddPermiso.activo != ""
      )
    }
  },
  methods: {
    resetForm() {
      this.$refs.formAddPermiso.reset();
      this.formAddPermiso = Object.assign({}, this.defaultForm);
    },
    submit(e) {
      const formData = new FormData(e.target);
      this.defaultForm.description = formData.get("descripcion");
      this.defaultForm.permiso = formData.get("permiso");
      this.defaultForm.activo = true;
      this.defaultForm.idRol = this.rolesSelected;
      add_permiso(this.defaultForm);

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
