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
      label="Name"
      required
      prepend-inner-icon="mdi-account"
    ></v-text-field>

    <v-text-field 
      v-model="password"
      label="Password"
      required
      prepend-inner-icon="mdi-lock"
      :append-icon="hidePassword ? 'mdi-eye-off' : 'mdi-eye'"
      @click:append="hidePassword = !hidePassword"
      :type="hidePassword ? 'password' : 'text'"
    ></v-text-field>
    
    <v-wait for="loading auth btn">
      <template slot="waiting">
        <v-btn
          disabled
          loading
          class="mr-4">
          Login
        </v-btn>
      </template>
        <v-btn
          color="success"
          class="mr-4"
          @click="submitLogin()">
          Login
        </v-btn>
    </v-wait>

  </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { mapFields } from 'vuex-map-fields'

export default {
  name: 'Login',
  data() {
    return {
      hidePassword: true
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
