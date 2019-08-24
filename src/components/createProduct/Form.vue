<template>
    <div>
      <div class="section__heading">Add your product for sale</div>
        <v-container grid-list-xl>
        <v-layout row justify-space-around align-center class="mt-5">
          <v-flex xs12 sm4 md4 lg4 xl6>
    <v-form
    v-model="valid"
    ref="productForm"
  >
    <v-text-field
      v-model="imageUrl"
      :rules="imageUrlRules"
      label="Image URL"
      required
      validate-on-blur
      clearable
      prepend-inner-icon="mdi-image"
    ></v-text-field>

    <v-text-field
      v-model="productName"
      :counter="20"
      :rules="productNameRules"
      label="Product name"
      required
      validate-on-blur
      clearable
      prepend-inner-icon="mdi-shopify"
    ></v-text-field>

    <v-text-field
      v-model="productPrice"
      :rules="productPriceRules"
      label="Price"
      required
      validate-on-blur
      clearable
      prepend-inner-icon="mdi-currency-eur"
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

    <v-wait for="create product loading btn">
      <template slot="waiting">
        <v-btn
          disabled
          loading
          class="mr-4">
          Create
        </v-btn>
        <v-btn
          disabled
          class="mr-4">
          Cancel
        </v-btn>
      </template>
        <v-btn
          color="success"
          class="mr-4"
          @click="submitProduct()">
          Create
        </v-btn>
        <v-btn
          color="warning"
          class="mr-4"
          @click="$router.back(-1)">
          Cancel
        </v-btn>
    </v-wait>
  </v-form>

  </v-flex>
    <v-flex xs12 sm7 md7 lg6 xl6>

    <v-card class="mx-auto">
      <div class="create-product__image-container">
        <img
          :src="imageUrl"
          alt="product image will be placed here"
        />
      </div>
        <v-card-title 
            class="align-end fill-height">
            {{ productName }}
            </v-card-title>
        <v-card-text>
    
      <span class="text--primary">
        <span>Author: {{ userProfile.username }}</span><br>

        <span>Price: <span v-html="validTemplatePrice"></span></span><br>
        <span>Condition: {{ productCondition }}</span><br>
       
      </span>
    <span>{{ productDate(Date.now(), 'published') }}</span><br>
    <span>{{ productDate(Date.now(), 'modified') }}</span><br>
    </v-card-text>

    <v-card-actions class="rgba(31, 77, 107, 0.5) py-0">
      <v-btn
        text>
         Hide description
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>
            mdi-arrow-up-drop-circle-outline
        </v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <v-card>
        <v-card-text class="card-description__text">
          {{ productDescription }}
        </v-card-text>
      </v-card>
    </v-expand-transition>

      </v-card>
            </v-flex>
        </v-layout>
    </v-container>
  </div>
</template>

<script>
import { product_validation_mixin } from '../../mixins/validation_mixins'
import { mapFields } from 'vuex-map-fields'
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
    name: 'CreateProduct',
    mixins: [ product_validation_mixin ],
    computed: {
        ...mapState('user', ['userProfile']),
        ...mapGetters('products', ['productDate', 'formatPrice']),
        ...mapFields('products', [
            'createProduct.imageUrl',
            'createProduct.valid',
            'createProduct.productName', 
            'createProduct.productPrice', 
            'createProduct.productDescription', 
            'createProduct.productCondition'
        ]),
        validTemplatePrice() {
          return this.productPrice > 0 ? this.formatPrice(this.productPrice) : ''
        }
    },
    methods: {
        ...mapActions('products', ['createProduct',]),
        submitProduct() {
            let product_data = {
                name: this.productName,
                imageUrl: this.imageUrl,
                author: this.userProfile.username,
                price: this.productPrice,
                description: this.productDescription,
                condition: this.productCondition,
            }
            if (this.$refs.productForm.validate() && this.productName.length <= 20) {
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
  img {
    width: 60%;
    cursor: auto;
  }
  .create-product__image-container {
    width: 100%;
    text-align: center;
  }
  .v-card__text {
    word-wrap: break-word;
  }
</style>
