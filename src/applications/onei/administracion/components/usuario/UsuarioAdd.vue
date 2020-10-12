<template>
  <v-card class="add_container">
    <v-layout row>
      <v-flex xs12>
        <v-card class="card--flex-toolbar">
          <v-toolbar card color="primary" dark>
            <v-toolbar-title
              class="subheading"
            >{{$t('applications.onei_administracion.modules.usuario.pages.add_usuario.form_title')}}
            </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <v-form @submit.prevent="submit" v-model="valid" ref="formAddUsuario" v-autocomplete-off>
              <v-container fluid grid-list-xl>
                <v-layout wrap>
                  <v-flex md3>
                    <v-text-field
                      :rules="rules.generica"
                      label="Primer nombre*"
                      placeholder
                      v-model="formAddUsuario.primernombre"
                    ></v-text-field>
                  </v-flex>
                  <v-flex md3>
                    <v-text-field
                      :rules="rules.segundo"
                      label="Segundo nombre"
                      placeholder
                      v-model="formAddUsuario.segundonombre"
                    ></v-text-field>
                  </v-flex>
                  <v-flex md3>
                    <v-text-field
                      :rules="rules.generica"
                      label="Primer apellido*"
                      placeholder
                      v-model="formAddUsuario.primerapellido"
                    ></v-text-field>
                  </v-flex>
                  <v-flex md3>
                    <v-text-field
                      :rules="rules.generica"
                      label="Segundo apellido*"
                      placeholder
                      v-model="formAddUsuario.segundoapellido"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout wrap>
                  <v-flex md3>
                    <v-text-field
                      :rules="rules.generica"
                      label="Usuario*"
                      placeholder
                      v-model="formAddUsuario.username"
                    ></v-text-field>
                  </v-flex>
                  <v-flex md3>
                    <v-autocomplete
                      v-model="formAddUsuario.dpa"
                      :rules="rules.seleccionar"
                      :items="lista_dpa"
                      item-value="identificador"
                      item-text="descripcion"
                      attach
                      dense
                      label="Dpa*"
                      no-data-text="No hay datos"
                    ></v-autocomplete>
                  </v-flex>
                  <v-flex md3>
                    <v-autocomplete
                      v-model="formAddUsuario.cargo"
                      :rules="rules.seleccionar"
                      :items="lista_cargo"
                      item-value="identificador"
                      item-text="descripcion"
                      attach
                      dense
                      label="Cargo*"
                      no-data-text="No hay datos"
                    ></v-autocomplete>
                  </v-flex>
                  <v-flex md3>
                    <v-checkbox v-model="formAddUsuario.activo" label="Activo" dense chips color="primary"></v-checkbox>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex md3>
                    <v-text-field
                      :rules="rules.correo"
                      label="Correo*"
                      placeholder
                      v-model="formAddUsuario.email"
                    ></v-text-field>
                  </v-flex>
                  <v-flex md3>
                    <v-text-field
                      type="password"
                      :rules="rules.pwdRules"
                      label="Contraseña*"
                      placeholder
                      v-model="formAddUsuario.password"
                    ></v-text-field>
                  </v-flex>
                  <v-flex md3>
                    <v-text-field
                      type="password"
                      :rules="rules.pwdConfirm"
                      ref="passwordConfirm"
                      label="Repetir Contraseña*"
                      placeholder
                      v-model="formAddUsuario.confirmpassword"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex md12>
                    <v-select
                      @change="rol_event()"
                      v-model="formAddUsuario.roles"
                      :rules="rules.seleccionar"
                      :items="lista_roles"
                      item-value="idRol"
                      item-text="description"
                      chips
                      hide-selected
                      small-chips
                      attach
                      deletable-chips
                      label="Roles*"
                      multiple
                      no-data-text="No hay datos"
                      return-object
                    ></v-select>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex md12>
                    <v-select
                      v-model="formAddUsuario.permisos"
                      :items="lista_permisos_temp"
                      item-value="idpermiso"
                      item-text="description"
                      eager
                      chips
                      hide-selected
                      small-chips
                      attach
                      deletable-chips
                      dense
                      label="Permisos"
                      multiple
                      no-data-text="No hay datos"
                      return-object
                    ></v-select>
                  </v-flex>
                </v-layout>
                <v-layout align-end class="mr-4" column>
                  <v-layout align-end row>
                    <v-btn :disabled="!valid" color="success" type="submit">Registrar</v-btn>
                    <v-btn color="error" type="button" :to="`/onei/sigip/administracion/usuarios/`">Cancelar</v-btn>
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
  import {IUsuario} from "../../interfaces/usuario/IUsuario";
  import {
    obtener_permisos,
    registrar_usuario
  } from "../../services/usuario_services";

  export default {
    name: "onei-usuario-add",
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
      data: {
        type: Array,
        required: true
      },
      lista_roles: {
        type: Array,
        required: true
      },
      lista_dpa: {
        type: Array,
        required: true
      },
      lista_cargo: {
        type: Array,
        required: true
      }
    },
    data() {
      const defaultForm: IUsuario = {
        idTrabajador: -1,
        primernombre: "",
        segundonombre: "",
        primerapellido: "",
        segundoapellido: "",
        username: "",
        email: "",
        cargo: -1,
        dpa: -1,
        activo: true,
        password: "",
        confirmpassword: "",
        permisos: [],
        roles: []
      };
      return {
        valid: false,
        formAddUsuario: Object.assign({}, defaultForm),
        rules: {
          generica: [
            val =>
              Validator.of(val)
                .required()
                .lettersForRoland().validate
          ],
          segundo: [
            val =>
              Validator.of(val)
                .vacio_not_required()
                .validate
          ],
          pwdRules: [val => Validator.of(val).required().validate],
          pwdConfirm: [
            val =>
              Validator.of(val)
                .required()
                .passwordConfirm(this.formAddUsuario.password).validate
          ],
          seleccionar: [val => Validator.of(val).requiredSelected().validate],
          correo: [
            val =>
              Validator.of(val)
                .required()
                .email().validate
          ]
        },
        defaultForm,
        lista_permisos: [],
        lista_permisos_temp: []
      };
    },
    created() {
      obtener_permisos()
        .then(({data}) => {
          this.lista_permisos = [...data];
          this.lista_permisos_temp = [...data];
        })
        .catch();
    },
    computed: {},
    watch: {
      "formAddUsuario.password"(val, oldval) {
        this.$refs.passwordConfirm.validate();
      }
    },
    methods: {
      resetForm() {
        this.$refs.formAddUsuario.reset();
        this.formAddUsuario = Object.assign({}, this.defaultForm);
      },
      submit() {
        const list_id_rol = this.formAddUsuario.roles.map(e => {
          return e.idRol;
        });
        const list_id_permiso = this.formAddUsuario.permisos.map(e => {
          return e.idpermiso;
        });
        this.formAddUsuario.roles = list_id_rol;
        this.formAddUsuario.permisos = list_id_permiso;

        registrar_usuario(this.formAddUsuario)
          .then(e => {
            const mensaje = e.headers["x-sigipapp-info"];
            this.$store.dispatch("showMessage", {
              message: mensaje,
              type: "success"
            });
            this.$router.push("/onei/sigip/administracion/usuarios");
          })
          .catch(error => {
            const mensaje = error.response.headers["x-sigipapp-badrequest"];
            this.$store.dispatch("showMessage", {
              message: mensaje,
              type: "error"
            });
          });
      },

      rol_event() {
        let tempRoles = [];
        tempRoles = this.formAddUsuario.roles.map(e => {
          return e.permisos.map(p => {
            return p.id;
          });
        });
        tempRoles = tempRoles.flat();
        const tempPermisos = [];
        this.lista_permisos_temp = this.lista_permisos.filter(e => {
          return tempRoles.indexOf(e.idpermiso) == -1;
        });
      }
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
