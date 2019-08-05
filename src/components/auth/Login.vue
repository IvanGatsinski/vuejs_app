<template>
    <v-container grid-list-xl>
        <v-layout row justify-center align-center>
            <v-flex xs11 sm4 md4 lg4 xl8>
    <v-form
    ref="loginForm"
  >
    <v-text-field
      v-model="username"
      :counter="10"
      :rules="nameRules"
      label="Name"
      required
      prepend-inner-icon="mdi-account"
    ></v-text-field>

    <v-text-field
      v-model="password"
      :rules="passwordRules"
      label="Password"
      required
     
      prepend-inner-icon="mdi-lock"
      
    ></v-text-field>
    
    <v-btn
      :disabled="isFormValid"
      color="success"
      class="mr-4"
      @click="submitLogin"
    >
      Login
    </v-btn>
  </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapActions } from "vuex";
import { mapFields } from 'vuex-map-fields'

export default {
  name: 'Login',
    data() {
      return {
      nameRules: [
        v => !!v || 'Name is required',
        v => (v.length >= 2 && v.length <= 10) || 'Name length must be between 2 and 10 characters',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 4 || 'Password length must be at least 5 characters',
      ],
      }
    },
  computed: {
    ...mapFields('auth', [
      'loginForm.username',
      'loginForm.password'
    ]),
    isFormValid() {
      return this.username && this.password && this.$refs.loginForm.validate() ? false : true
    }
  },
  methods: {
    ...mapActions('auth',["authenticate"]),
    submitLogin() {
      let user_info = {
        username: this.username,
        password: this.password,
        authType: 'login'
      };
      this.authenticate(user_info);
    }
  },
};
</script>

<style scoped>
.v-btn:not(.v-btn--round).v-size--default {
  margin-top: 10px;
}
</style>
