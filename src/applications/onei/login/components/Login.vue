<template>
  <v-container fill-height fluid grid-list-xl>
    <div class="login-wrap">
      <div class="login-html">
        <div class="image_div group">
          <img src="../assets/logo_white.png"/>
          <div class="group mt-3">
            <h5 class="category white--text font-weight-medium">Sistema de gestión Índices y Precios / ONEI</h5>
            <h4 class="card-title white--text text-xs-center font-weight-medium">SIGIP-ONEI</h4>
          </div>
        </div>

        <div class="login-form">
          <v-form @submit.prevent="login()" v-model="valid" class="sign-in-htm"
                  v-autocomplete-off>
            <div class="group">
              <v-text-field
                dark
                color="white"
                box
                label="Usuario"
                name="username"
                prepend-icon="person"
                type="text"
                :rules="rules.generica"
                v-model="formLogin.username"
              ></v-text-field>
            </div>
            <div class="group">
              <v-text-field
                color="white"
                dark
                box
                id="password"
                label="Contraseña"
                name="password"
                prepend-icon="lock"
                type="password"
                :rules="rules.generica"
                v-model="formLogin.password"
              ></v-text-field>
            </div>
            <div class="text-xs-center mt-4">
              <v-btn :loading="linear_active" :disabled="!valid || linear_active" type="submit" color="primary" large>
                Aceptar
              </v-btn>
            </div>
          </v-form>
        </div>
        <div class="hr"></div>
        <div class="foot-lnk">
              <span class="white--text text--darken-3 mb-4 font-weight-medium text-xs-center">
                &copy;2020 —
                <strong>UCI</strong>
              </span>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
  import Vue from "vue";
  import {VList, VListTile, VListTileAvatar, VListTileContent, VListTileTitle} from "@vuetify/components/VList"
  import {VCard, VCardActions, VCardText, VCardTitle} from "@vuetify/components/VCard"
  import VAlert from "@vuetify/components/VAlert/VAlert";
  import VBtn from "@vuetify/components/VBtn";
  import VAvatar from "@vuetify/components/VAvatar";
  import VFooter from "@vuetify/components/VFooter/VFooter";
  import VForm from "@vuetify/components/VForm";
  import {VSpacer} from "@vuetify/components/VGrid";
  import VContainer from "@vuetify/components/VGrid/VContainer";
  import VContent from "@vuetify/components/VGrid/VContent";
  import VFlex from "@vuetify/components/VGrid/VFlex";
  import VLayout from "@vuetify/components/VGrid/VLayout";
  import VIcon from "@vuetify/components/VIcon";
  import VImg from "@vuetify/components/VImg";
  import VProgressLinear from "@vuetify/components/VProgressLinear/VProgressLinear";
  import VSwitch from "@vuetify/components/VSwitch";
  import VTextField from "@vuetify/components/VTextField";
  import image from "../assets/logo.svg";
  import {ILogin, IToken} from "../interfaces/ILogin";
  import LoadingDialog from "@shared/components/loading-dialog/loading-dialog.vue";
  import Validator from "@validator/validator";

  export default Vue.extend({
    name: "onei-login",
    components: {
      VAvatar,
      VList,
      VListTile,
      VListTileAvatar,
      VListTileContent,
      VListTileTitle,
      VContent,
      VContainer,
      VCard,
      VCardTitle,
      VLayout,
      VFlex,
      VCard,
      VCardActions,
      VCardText,
      VCardTitle,
      VSpacer,
      VIcon,
      VForm,
      VTextField,
      VBtn,
      VFooter,
      VImg,
      VSwitch,
      VAlert,
      VProgressLinear,
      LoadingDialog
    },
    data() {
      const defaultLoginForm: ILogin = {
        username: "",
        password: "",
        grant_type: "",
      };
      const defaultToken: IToken = {
        access_token: "",
        expires_in: -1,
        jti: "",
        refresh_token: "",
        scope: "",
        token_type: ""
      };
      return {
        valid: false,
        formLogin: Object.assign({}, defaultLoginForm),
        rules: {
          generica: [
            (val: any) =>
              Validator.of(val)
                .required()
                .validate
          ],
        },
        linear_active: false,
        logo: image,
        defaultLoginForm,
        defaultToken,
        error: false
      };
    },
    computed: {
      formIsValid(): boolean {
        return this.formLogin.username != "" && this.formLogin.password != "";
      }
    },
    methods: {
      login() {
        this.linear_active = true;
        this.error = false;
        this.$store
          .dispatch("@onei.login/login", this.formLogin)
          .then(() => {
            this.linear_active = false;
            this.$router.replace(
              this.$route.query.redirect || "/onei"
            );
          })
          .catch(error => {
            this.$swal({
              icon: 'error',
              title: 'Tenemos un problema!',
              text: `${error}`,
            }).then((result)=>{
              console.log("DS");
            });
            this.linear_active = false;
            this.error = error;
          });
      }
    }
  });
</script>
<style scoped>
  .login-wrap {
    width: 100%;
    margin: auto;
    max-width: 525px;
    min-height: 670px;
    position: relative;
    background: url("../assets/bgLogin.jpg") no-repeat center;
    box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
  }

  .login-html {
    width: 100%;
    height: 100%;
    position: absolute;
    padding: 70px 70px 50px 70px;
    background: linear-gradient(#005fb8, #436483d9);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .login-html .sign-in-htm {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    transform: rotateY(180deg);
    backface-visibility: hidden;
    transition: all 0.4s linear;
  }

  .login-form {
    min-height: 345px;
    position: relative;
    perspective: 1000px;
    transform-style: preserve-3d;
  }

  .login-form .group {
    margin-bottom: 15px;
  }

  .login-form .group .label,
  .login-form .group .input,
  .login-form .group .button {
    width: 100%;
    color: #fff;
    display: block;
  }

  .login-form .group .button {
    background: #1161ee;
  }

  .login-html .sign-in-htm {
    transform: rotate(0);
  }

  .hr {
    height: 2px;
    /*margin: 60px 0 50px 0;*/
    background: rgba(255, 255, 255, 0.2);
  }

  .foot-lnk {
    text-align: center;
  }

  .v-btn.v-btn--large {
    line-height: 0px !important;
  }

  .image_div {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    margin-bottom: 10%;
  }

  .image_div img {
    width: 50%;
  }
</style>
