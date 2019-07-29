<template>
    <div>
    <li>
        <div v-if="checkProductOwner">
        <button>Edit</button>

        </div>
        <p>name: {{ name }}</p>
        <p>price: {{ Number(price) }}</p>
        <p>description: {{ description }}</p>
        <p>condition: {{ condition }}</p>
    </li>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Product',
    computed: {
        ...mapState('auth', [
            'userId'
        ]),
        checkProductOwner() {
           return this.creatorId === this.userId ? true : false
        }
    },
    props: {
        creatorId: {
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
