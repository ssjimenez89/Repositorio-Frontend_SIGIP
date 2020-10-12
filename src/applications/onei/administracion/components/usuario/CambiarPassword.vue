<template>
  <v-card class="add_container">
    <v-layout row>
      <v-flex xs12>
        <v-card class="card--flex-toolbar">
          <v-toolbar card color="primary" dark>
            <v-toolbar-title
              class="subheading"
            >{{$t('applications.onei_administracion.modules.usuario.pages.cambiar_password.form_title')}}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!valid"
              :title="$t('applications.onei_administracion.modules.usuario.pages.add_usuario.form_send_button')"
              icon
            >
              <v-icon>check</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <v-form @submit.prevent="submit" v-model="valid" ref="formCambiarPassword">
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
                      type="password"
                      :rules="rules.pwdRules"

                      label="Nueva Contraseña"
                      placeholder
                      v-model="formCambiarPassword.password"
                    ></v-text-field>
                  </v-flex>
                  <v-flex md3>
                    <v-text-field
                      type="password"
                      :rules="rules.pwdConfirm"
                      ref="passwordConfirm"

                      label="Repetir Nueva Contraseña"
                      placeholder
                      v-model="formCambiarPassword.confirmpassword"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout align-end class="mr-4" column>
                  <v-layout align-end row>
                    <v-btn :disabled="!valid" color="success" type="submit">Guardar</v-btn>
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
import Validator from "@validator/validator";
import VAutocomplete from "@vuetify/components/VAutocomplete";
import VBtn from "@vuetify/components/VBtn";
import {VCard, VCardActions, VCardText, VCardTitle} from "@vuetify/components/VCard";
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
import {IUsuario} from "../../interfaces/usuario/IUsuario";
import {cambiar_password} from "../../services/usuario_services";

export default {
  name: "onei-usuario-cambiar-password",
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
    const defaultForm: IUsuario = {
      idTrabajador: -1,
      password: "",
      confirmpassword: "",
    };
    return {
      valid: false,
      formCambiarPassword: Object.assign({}, defaultForm),
      rules: {
        pwdRules: [val => Validator.of(val).required().validate],
        pwdConfirm: [
          val =>
            Validator.of(val)
              .required()
              .passwordConfirm(this.formCambiarPassword.password).validate
        ],
      },
      defaultForm,
    };
  },
  created() {
  },
  computed: {},
  watch: {
    "formCambiarPassword.password" (val, oldval) {
      this.$refs.passwordConfirm.validate();
    }
  },
  methods: {
    submit() {
      // debugger;
      this.formCambiarPassword.idTrabajador = this.usuario.idTrabajador;
      cambiar_password(this.usuario.idTrabajador, this.formCambiarPassword).then(e => {
        const mensaje = e.headers["x-sigipapp-info"];
        this.$store.dispatch("showMessage", {
          message: mensaje,
          type: "success"
        });
        this.$router.push("/onei/sigip/administracion/usuarios");
      }).catch(error => {
        const mensaje = error.response.headers["x-sigipapp-badrequest"];
        this.$store.dispatch("showMessage", {
          message: mensaje,
          type: "error"
        });
      });
    },
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
