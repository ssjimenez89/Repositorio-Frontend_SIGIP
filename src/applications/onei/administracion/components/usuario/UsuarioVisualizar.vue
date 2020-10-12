<template>
  <v-card class="add_container">
    <v-layout row>
      <v-flex xs12>
        <v-card class="card--flex-toolbar">
          <v-toolbar card color="primary" dark>
            <v-toolbar-title
              class="subheading"
            >{{$t('applications.onei_administracion.modules.usuario.pages.visualizar_usuario.page_title')}}
            </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <v-form ref="formVisualizar">
              <v-container fluid grid-list-xl>
                <v-layout wrap>
                  <v-flex md3>
                    <v-text-field
                      disabled
                      color="purple darken-2"
                      label="Primer nombre"
                      placeholder
                      v-model="usuario.primernombre"
                    ></v-text-field>
                  </v-flex>
                  <v-flex md3>
                    <v-text-field
                      disabled
                      color="purple darken-2"
                      label="Segundo nombre"
                      placeholder
                      v-model="usuario.segundonombre"
                    ></v-text-field>
                  </v-flex>
                  <v-flex md3>
                    <v-text-field
                      disabled
                      color="purple darken-2"
                      label="Primer apellido"
                      placeholder
                      v-model="usuario.primerapellido"
                    ></v-text-field>
                  </v-flex>
                  <v-flex md3>
                    <v-text-field
                      disabled
                      color="purple darken-2"
                      label="Segundo apellido"
                      placeholder
                      v-model="usuario.segundoapellido"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout wrap>
                  <v-flex md3>
                    <v-text-field
                      disabled
                      color="purple darken-2"
                      label="Usuario"
                      placeholder
                      v-model="usuario.username"
                    ></v-text-field>
                  </v-flex>
                  <v-flex md3>
                    <v-text-field
                      disabled
                      color="purple darken-2"
                      label="Dpa"
                      placeholder
                      v-model="dpa.codigo_descripcion"
                    ></v-text-field>
                  </v-flex>
                  <v-flex md3>
                    <v-text-field
                      disabled
                      color="purple darken-2"
                      label="Cargo"
                      placeholder
                      v-model="cargo.descripcion"
                    ></v-text-field>
                  </v-flex>
                  <v-flex md3>
                    <v-checkbox disabled v-model="usuario.activo" label="Activo" dense chips></v-checkbox>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex md3>
                    <v-text-field
                      disabled
                      color="purple darken-2"
                      label="Correo"
                      placeholder
                      v-model="usuario.email"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex md3>
                    <v-select
                      disabled
                      v-model="usuario.roles"
                      :items="usuario.roles"
                      item-value="id"
                      item-text="description"
                      eager
                      chips
                      dense
                      small-chips
                      label="Roles"
                      multiple
                      return-object
                    ></v-select>
                  </v-flex>
                  <v-flex md9>
                    <v-select
                      disabled
                      v-model="usuario.permisos"
                      :items="usuario.permisos"
                      item-value="id"
                      item-text="description"
                      eager
                      chips
                      hide-selected
                      small-chips
                      dense
                      label="Permisos"
                      multiple
                      return-object
                    ></v-select>
                  </v-flex>
                </v-layout>
                <v-layout align-end class="mr-4" column>
                  <v-layout align-end row>
                    <v-btn :to="`/onei/sigip/administracion/usuarios/`" color="error">Cancelar</v-btn>
                  </v-layout>
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
import VAutocomplete from "@vuetify/components/VAutocomplete";
import VBtn from "@vuetify/components/VBtn";
import {
  VCard,
  VCardActions,
  VCardText,
  VCardTitle
} from "@vuetify/components/VCard";
import VCheckbox from "@vuetify/components/VCheckbox";
import VChip from "@vuetify/components/VChip";
import VCombobox from "@vuetify/components/VCombobox";
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
import {obtener_cargo,obtener_obj_dpa,obtener_usuario} from "../../services/usuario_services";

export default {
  name: "onei-usuario-visualizar",
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
    VCombobox,
    VAutocomplete
  },
  props: {
    usuario: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      dpa:{},
      cargo:{},
    }
  },
  created() {
    obtener_obj_dpa(this.usuario.dpa).then(({data}) => {
      this.dpa = data;
    });

    obtener_cargo(this.usuario.cargo).then(({data}) => {
      this.cargo = data;
    });
  },
  computed: {},
  methods: {
  }
};
</script>
<style lang="stylus" scoped>
  .add_container {
    width: 100%;
  }

  .add_form {
    width: 100%;
  }
</style>
