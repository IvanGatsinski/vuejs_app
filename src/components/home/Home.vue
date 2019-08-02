<template>
    <div>
        <h1>Welcome to my page</h1>
            <Products></Products>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import Products from './Products'

export default {
    name: 'Home',
    components: {
        Products
    },
}
</script>

<style>

</style>
