<template>
    <div>
    <li>
        <div v-if="checkProductOwner">
        <button>Edit</button>
        <button @click="deleteProduct(productId)">Remove</button>
        </div>
        <p>Name: {{ name }}</p>
        <p>Price: {{ Number(price) }}</p>
        <p>Description: {{ description }}</p>
        <p>Condition: {{ condition }}</p>
        <p>Date created: {{ dateCreated }}</p>
    </li>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'Product',
    computed: {
        ...mapState('auth', [
            'loggedUserId'
        ]),
        checkProductOwner() {
           return this.creatorId === this.loggedUserId ? true : false
        }
    },
    props: {
        productId: {
            type: String,
            required: true,
        },
        creatorId: {
            type: String,
            required: true,
        },
        dateCreated: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        condition: {
            type: String,
            required: true,
        },
    },
    methods: {
        ...mapActions('products', [
            'removeProduct'
        ]),
        deleteProduct(productId) {
            this.removeProduct(productId)
        }
    }
}
</script>

<style scoped>
    li {
        width: 50%;
        margin: 25px auto;
        padding: 15px 0;
        border-top: 2px solid purple;
        border-bottom: 2px solid purple;
    }
    p {
        text-align: left;
    }
    button {
        padding: 5px 15px;
    }
</style>
