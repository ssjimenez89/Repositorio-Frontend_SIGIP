<template>
    <main-content
    title="Editar captación"
    >
      <edit-captaciones></edit-captaciones>
    </main-content>
</template>

<script>
    import MainContent from "../../../../../../shared/components/main-content/main-content";
    import EditCaptaciones from "../../components/captaciones/edit-captaciones";
    export default {
        name: "edit-captaciones-page",
      components: {EditCaptaciones, MainContent}

    }
</script>

<style scoped>

</style>
