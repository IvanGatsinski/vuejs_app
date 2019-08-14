<template>
    <div>
    <h3>Create your product!</h3>
    <v-container grid-list-xl>
        <v-layout row justify-space-around align-center class="mt-5">
          <v-flex xs12 sm4 md4 lg4 xl4>
    <v-form
    v-model="valid"
    ref="productForm"
  >
    <v-text-field
      v-model="productName"
      :counter="15"
      :rules="productNameRules"
      label="Name"
      required
      validate-on-blur
      clearable
      prepend-inner-icon="mdi-account"
    ></v-text-field>

    <v-text-field
      v-model="productPrice"
      :rules="productPriceRules"
      label="Price"
      required
      validate-on-blur
      clearable
      prepend-inner-icon="mdi-lock"
      
    ></v-text-field>

    <v-textarea
      v-model="productDescription"
      :rules="productDescriptionRules"
      :counter="250"
      label="Description"
      no-resize
      rows="5"
      required
      validate-on-blur
      clearable
      :placeholder="'Your product description'"
      prepend-inner-icon="mdi-text"
    ></v-textarea>

    <v-radio-group
      label="condition"
      v-model="productCondition" 
      :rules="productConditionRules"
      required row>
      <v-radio label="New" color="secondary" value="New"></v-radio>
      <v-radio label="Old" color="secondary" value="Old"></v-radio>
    </v-radio-group>

    <v-btn
      :color="isFormValid"
      class="mr-4"
      @click="submitProduct">
      Create
    </v-btn>
        <v-btn
      class="mr-4"
      @click="$router.back(-1)">
      Cancel
    </v-btn>
  </v-form>

  </v-flex>
    <v-flex xs12 sm7 md7 lg10 xl10>
      <v-card class="gallery__card">
      <v-img
        class="white--text"
        height="200px"
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      >
      <v-card-title class="align-end fill-height">{{ productPrice }}</v-card-title>
      </v-img>

      <v-card-text>   
        Име: {{ productName }} 
        <br/>
        Състояние: {{ formatProductCondition }}
      </v-card-text>

        <v-card-text>
            {{ datePublished }}
        </v-card-text>

      <v-card-actions class="cyan lighten-5">
      <v-btn disabled
        text
        >
        {{ show ? 'hide details' : 'show details' }}
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn disabled icon>
        <v-icon>
            {{ show ? 'mdi-arrow-up-drop-circle-outline' : 'mdi-arrow-down-drop-circle-outline' }}
        </v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-card-text class="cyan lighten-4">
         Пълно описание: {{ productDescription }}
        </v-card-text>
      </div>
    </v-expand-transition>

    </v-card>
            </v-flex>
        </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapActions, mapState } from 'vuex';

export default {
    name: 'CreateProduct',
    data() {
      return {
        author: this.authorName,
        show: true,
        productNameRules: [
          v => !!v || 'Product must have a name',
          v => v && v.length >= 3 && v.length <= 15 || 'Product name must be between 3 and 15 characters long',
          v => v && /^(([a-zA-Z]{3,})(\s?))+[^\s]$/.test(v) || 'Product name must contain latin letters only separated by a single space.',
          
        ],
        productPriceRules: [
          v => !!v || 'Product must have price.',
          v => /^([0-9]{1,5}[.])?[0-9]{1,5}$/.test(v) || 'Price must be a valid number between 1 and 99999'
        ],
        productDescriptionRules: [
          v => !!v || 'Product must have description.',
          v => v && v.length >= 10 && v.length <= 250 || 'Product description must be between 10 and 250 characters long',
          v => /^(([a-zA-Z0-9]+)(\s?))+[^\s]$/.test(v) || 'Product description must start and finish without space,also must contain latin letters and digits separated by a single space',
        ],
        productConditionRules: [
          v => !!v || 'Product must have condition.'
        ]
      }
    },
    computed: {
        ...mapState('user', ['userProfile']),
        ...mapFields('products', [
            'createProduct.valid',
            'createProduct.productName', 
            'createProduct.productPrice', 
            'createProduct.productDescription', 
            'createProduct.productCondition'
        ]),
        authorName() {
          return this.userProfile.username
        },
        isFormValid() {
          return this.valid ? 'success' : 'warning'
        },
        formatProductCondition() {
          if (this.productCondition === 'New') {
            return 'New'
          }
          else if (this.productCondition === 'Old') {
            return 'Used'
          }
          else {
            return ''
          }
        },
        datePublished() {
          let date = new Date(new Date()),
            year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate();

          month < 10 ? month = `0${month}` : false
          day < 10 ? day = `0${day}` : false
    
        return `Публикувано на ${day}-${month}-${year} г.`
        }
    },
    methods: {
        ...mapActions('products', [
            'createProduct',
        ]),
        submitProduct() {
            let product_data = {
                name: this.productName,
                author: this.authorName,
                price: this.productPrice,
                description: this.productDescription,
                condition: this.productCondition,
            }
            if (this.$refs.productForm.validate()) {
              this.createProduct(product_data)
            }
        }
    },
    beforeDestroy() {
      this.$refs.productForm.reset()
    }
}
</script>

<style scoped>
  .v-card__text {
    word-wrap: break-word;
  }
</style>
