<template>
    <v-container grid-list-xl>
        <v-layout row justify-center align-center>
            <v-flex xs11 sm4 md4 lg4 xl8>
    <v-form
    v-model="valid"
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
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="submitLogin()"
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
        v => !!v || 'Username is required',
        v => /^.{3,12}$/.test(v) || 'Username must be between 3 and 12 characters'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => /^.{5,12}$/.test(v) || 'Password must be between 5 and 12 characters'
      ],
      }
    },
  computed: {
    ...mapFields('auth', [
      'loginForm.valid',
      'loginForm.username',
      'loginForm.password'
    ]),
  },
  methods: {
    ...mapActions('auth',["authenticate"]),
    submitLogin() {
      let user_info = {
        username: this.username,
        password: this.password,
        authType: 'login'
      };
      if (this.$refs.loginForm.validate()) {
        this.authenticate(user_info);
      }
    }
  },
  beforeDestroy() {
    this.$refs.loginForm.reset()
  }
};
</script>

<style scoped>
.v-btn:not(.v-btn--round).v-size--default {
  margin-top: 10px;
}
</style>
