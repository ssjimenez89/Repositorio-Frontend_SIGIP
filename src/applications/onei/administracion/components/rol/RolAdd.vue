<template>
  <v-card class="add_container">
    <v-layout row>
      <v-flex xs12>
        <v-card class="card-flex-toolbar">
          <v-toolbar card color="primary" dark>
            <v-toolbar-title class="subheading">
              {{$t('applications.onei_administracion.modules.rol.pages.add_rol.form_title')}}
            </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <v-form @submit.prevent="submit" v-model="valid" ref="formAddRol">
              <v-container fluid grid-list-xl>
                <v-layout wrap>
                  <v-flex md10 xs12>
                    <v-text-field
                      :rules="rules.generica"
                      name="descripcion"
                      label="Descripción*"
                      placeholder="Descripción del Rol"
                      required
                      v-model="formAddPermiso.description"
                    ></v-text-field>
                  </v-flex>
<!--                  <v-flex md2 xs12>-->
<!--                    <v-checkbox-->
<!--                      label="Activo"-->
<!--                      placeholder="true"-->
<!--                      required-->
<!--                      v-model="formAddPermiso.activo"-->
<!--                    ></v-checkbox>-->
<!--                  </v-flex>-->
                  <v-flex xs12 md12 d-flex>
                    <v-select
                      v-model="formAddPermiso.permisos"
                      :rules="rules.seleccionar"
                      :items="permisosss"
                      item-value="idpermiso"
                      item-text="description"
                      dense
                      label="Permisos*"
                      no-data-text="No quedan permisos para adicionar"
                      chips
                      hide-selected
                      small-chips
                      deletable-chips
                      multiple
                      return-object
                      ></v-select>
                  </v-flex>
                  <v-flex md12 xs12>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        :disabled="!valid"
                        color="success"
                        type="submit"
                      >
                        Registrar
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
import VAutocomplete from "@vuetify/components/VAutocomplete";
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
import {add_rol} from "../../services/rol_services";

export default {
  name: "onei-rol-add",
  components: {
    Validator,
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
    VAutocomplete,
    VSystemBar,
    VChip,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
    permisosss: {
      type: Array,
      required: true,
    }
  },
  data() {
    const defaultForm: IRol = {
      description: "",
      activo: true,
      permisos: []
    };
    return {
      valid: false,
      rolesSelected:null,
      formAddPermiso: Object.assign({}, defaultForm),
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
    };
  },
  computed: {
  },
  methods: {

    submit(e) {
      const formData = new FormData(e.target);
      const list_id_permiso = this.formAddPermiso.permisos.map(e => {
        return e.idpermiso;
      });
      this.defaultForm.description = formData.get("descripcion");
      this.defaultForm.permisos = list_id_permiso;
      this.defaultForm.activo = true;
      add_rol(this.defaultForm).then(e => {
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
      })
      ;

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
