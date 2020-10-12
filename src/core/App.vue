<template>
  <v-app>
    <div v-bar>
      <div>
        <router-view/>
      </div>
    </div>
  </v-app>
</template>
<style lang="stylus">
  @import '~material-design-icons-iconfont/dist/material-design-icons.css';
  @import '~vuetify/src/stylus/main';
  /* vietnamese */
  @font-face {
    font-family: 'Barlow';
    font-style: normal;
    font-weight: 200;
    font-display: swap;
    src: local('Barlow Regular'), local('Barlow-Regular'), url(../assets/fonts/google-contacts/google2.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'Barlow';
    font-style: normal;
    font-weight: 200;
    font-display: swap;
    src: local('Barlow Regular'), local('Barlow-Regular'), url(../assets/fonts/google-contacts/google2.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'Barlow';
    font-style: normal;
    font-weight: 200;
    font-display: swap;
    src: local('Barlow Regular'), local('Barlow-Regular'), url(../assets/fonts/google-contacts/google2.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  * {
    box-sizing: border-box;
  }

  *:before,
  *:after {
    box-sizing: border-box;
  }
  .application {
    font-family: 'Barlow';
    font-weight :  'Semi-Bold'
  }

  html {
    overflow-y: auto
    padding: 0;
    margin: 0;
  }

  body {
    margin: 0;
    overflow: hidden;
    padding: 0;
    position relative;
    height 100%;
  }

  .fulfill-container {
    display: flex;
    flex: 1;
    height: 100%;
    width: 100%;
  }

  .take-full-height {
    height: 100%;
  }

  .ignore-element {
    display: contents;
  }

  .fab-spacer {
    margin-bottom: 72px;
  }


  .vb > .vb-dragger {
    z-index: 5;
    width: 12px;
    right: 0;
  }

  .vb > .vb-dragger > .vb-dragger-styler {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform: rotate3d(0, 0, 0, 0);
    transform: rotate3d(0, 0, 0, 0);
    -webkit-transition: background-color 100ms ease-out, margin 100ms ease-out, height 100ms ease-out;
    transition: background-color 100ms ease-out, margin 100ms ease-out, height 100ms ease-out;
    background-color: rgba(0, 0, 0, 0.1);
    margin: 5px 5px 5px 0;
    border-radius: 20px;
    height: calc(100% - 10px);
    display: block;
  }

  .vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(0, 0, 0, 0.3);
  }

  .vb > .vb-dragger:hover > .vb-dragger-styler {
    background-color: rgba(0, 0, 0, 0.5);
    margin: 0px;
    height: 100%;
  }

  .vb.vb-dragging > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(0, 0, 0, 0.5);
    margin: 0px;
    height: 100%;
  }

  .vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(0, 0, 0, 0.5);
  }

  .application--wrap {
    height: 100vh;
  }
  .grey--background{
    background : #eee;
  }

  .v-treeview-node__label{
    font-size: 14px !important;
    width : 0;
    margin: 7px;
  }

  .swal2-styled.swal2-confirm{
    border-radius : 0px !important;
  }
  .swal2-popup{
    border-radius : 0px !important
  }
</style>
