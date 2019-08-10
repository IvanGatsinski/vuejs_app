<template>
    <v-card class="mb-3" :class="slideBackground" color="rgba(31, 77, 107, .5)" dark @mouseleave="leaveBackground" @mouseenter="enterBackground">
      <v-list-item three-line>
        <v-list-item-avatar size="125" tile>
          <v-img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"></v-img>
            </v-list-item-avatar>
              <v-list-item-content class="align-self-start">
                <v-list-item-title class="headline mb-2">
                  {{ name }}
                </v-list-item-title>
              <v-list-item-subtitle>Author: {{ author }}</v-list-item-subtitle>
               <v-list-item-subtitle>Price: {{ price }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-btn @click="removeFromCart(id)" color="rgb(31, 107, 36)">Remove</v-btn>
          </v-list-item>
        
        <v-btn class="ml-5" outlined="" text :to="`/product/details/${id}`">Детайли</v-btn>
        <v-card-actions @click="show = !show" class="rgba(31, 77, 107, 0.5) py-0">
      <v-btn
        text
        >
        {{ show ? 'Скрии описание' : 'Покажи описание' }}
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>
            {{ show ? 'mdi-arrow-up-drop-circle-outline' : 'mdi-arrow-down-drop-circle-outline' }}
        </v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <v-card dark v-show="show">
        <v-card-text>
          {{ description }}
        </v-card-text>
      </v-card>
    </v-expand-transition>

        </v-card>
</template>

<script>
import DialogProductImage from '../home/DialogProductImage'
import { mapActions } from 'vuex';
export default {
    name: 'CartProduct',
    components: {
        DialogProductImage
    },
    data() {
      return {
          slideBackground: '',
          show: false,
          id: this.product._id,
          name: this.product.name,
          price: this.product.price,
          description: this.product.description,
          condition: this.product.condition,
          author: this.product.author,
      }
    },
    props: {
      product: {
        required: true,
        type: Object
      }
    },
    methods: {
      ...mapActions('user', ['removeFromCart']),
      enterBackground() {
        this.slideBackground = 'slideEnter'
      },
      leaveBackground() {
        this.slideBackground = 'slideLeave'
      }
    }
}
</script>

<style scoped>
  .v-sheet.theme--dark {
    background: rgba(31, 77, 107, 0.5);
  }
  .v-card {
    position: relative;
  }
  .v-card > * {
    z-index: 1 !important;
  }
  .slideEnter::before {
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    background: rgba(31, 77, 107, 0.75);
    height: 100%;
    animation-name: slider_enter;
    animation-fill-mode: forwards;
    animation-duration: 0.5s;
  }
  .slideLeave::after {
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    background: rgba(31, 77, 107, 0.75);
    height: 100%;
    animation-name: slider_leave;
    animation-fill-mode: forwards;
    animation-duration: 0.5s;
  }
    @keyframes slider_leave {
    from {
    width: 100%;
 
    }
    to {
    width: 0%;

    }
  }
  @keyframes slider_enter {
    from {
    width: 0%;

    }
    to {
    width: 100%;

    }
  }
</style>
