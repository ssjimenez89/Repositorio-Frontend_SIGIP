<template>
  <v-card class="add_container">
    <v-layout row>
      <v-flex xs12>
        <v-card class="card-flex-toolbar">
          <v-toolbar card color="primary" dark>
            <v-toolbar-title class="subheading">
              {{$t('applications.onei_administracion.modules.permiso.pages.edit_permiso.form_title')}}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!formIsValid"
              :title="$t('applications.onei_administracion.modules.permiso.pages.edit_permiso.form_send_button')"
              icon>
              <v-icon>check</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <v-form @submit.prevent="submit" ref="formEdirPermiso">
              <v-container fluid grid-list-xl>
                <v-layout wrap>
                  <v-flex md12 xs12>
                    <v-text-field
                      :rules="rules.description"
                      name="descripcion"
                      color="blue darken-2"
                      label="Description"
                      placeholder="Descripcion del PERMISO_BASICO"
                      required
                      v-model="formEdirPermiso.description"
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
                      v-model="formEdirPermiso.permiso"
                    ></v-text-field>
                  </v-flex>
                  <v-flex md2 xs12>
                    <v-checkbox
                      :rules="rules.activo"
                      color="blue darken-2"
                      label="Activo"
                      placeholder="true"
                      required
                      disabled
                      v-model="formEdirPermiso.activo"
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
                        Actualizar
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
import {IPermiso} from "../../interfaces/permiso/IPermiso";
import {add_permiso} from "../../services/permiso_services";

export default {
  name: "onei-permiso-edit",
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
    },
  },
  data() {
    console.log(this.data);
    const defaultForm: IPermiso = {
      description: this.data.description,
      permiso: this.data.permiso,
      activo: this.data.activo,
    };
    return {
      formEdirPermiso: Object.assign({}, defaultForm),
      rules: {
        description: [val => (val || "").length > 0 || "This field is required"],
        permiso: [val => (val || "").length > 0 || "This field is required"],
        activo: [val => (val || "").length > 0 || "This field is required"],
      },
      defaultForm,
    };
  },
  computed: {
    formIsValid(): boolean {
      return (
        this.formEdirPermiso.description != "" &&
        this.formEdirPermiso.permiso != "" &&
        this.formEdirPermiso.activo != ""
      )
    }
  },
  methods: {
    submit(e) {
      const formData = new FormData(e.target);
      this.defaultForm.description = formData.get("descripcion");
      this.defaultForm.permiso = formData.get("permiso");
      this.defaultForm.activo = true;
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
