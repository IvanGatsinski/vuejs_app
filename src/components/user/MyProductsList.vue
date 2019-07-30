<template>
    
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'MyProducts',
    computed: {
        ...mapState('auth', [
            'loggedUserId',
        ]),
        ...mapState('user', [
            'myProducts'
        ])
    },
    methods: {
        ...mapActions('user', [
            'fetchMyProducts'
        ])
    },
    created() {
        this.fetchMyProducts(this.loggedUserId)
    },
    mounted() {
        console.log(this.myProducts);
    }
}
</script>

<style>

</style>
