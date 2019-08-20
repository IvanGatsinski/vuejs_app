<template>
    <v-alert 
        class="text-center black--text"
        text
        prominent
        elevation="12"
        color="#fff"
        icon="mdi-information-outline"
        border="top">
        <slot></slot>
    </v-alert>
</template>

<script>
export default {
    name: 'global-empty-message'
}
</script>

<style scoped>
    .v-alert {
        position: relative !important;
    }
</style>