<template>
      <v-container grid-list-xl>
        <v-layout row justify-center align-center>
          <v-flex xs11 sm4 md4 lg4 xl8>
    <v-form
    v-model="valid"
    ref="registerForm"
  >
    <v-text-field
      v-model="username"
      :counter="10"
      :rules="nameRules"
      label="Name"
      required
      clearable
      prepend-inner-icon="mdi-account"
    ></v-text-field>

    <v-text-field
      v-model="password"
      :rules="passwordRules"
      :append-icon="hidePassword ? 'mdi-eye-off' : 'mdi-eye'"
      @click:append="hidePassword = !hidePassword"
      :type="hidePassword ? 'password' : 'text'"
      label="Password"
      required
      clearable
      prepend-inner-icon="mdi-lock"
      
    ></v-text-field>

    <v-text-field
       v-model="confirmPassword"
      :rules="confirmPasswordRules"
      :append-icon="hidePasswordConfirm ? 'mdi-eye-off' : 'mdi-eye'"
      @click:append="hidePasswordConfirm = !hidePasswordConfirm"
      :type="hidePasswordConfirm ? 'password' : 'text'"
      label="Confirm Password"
      required
      clearable
      prepend-inner-icon="mdi-lock"   
    ></v-text-field>

    <v-text-field
       v-model="email"
      :rules="emailRules"
      label="email"
      required
      clearable
      prepend-inner-icon="mdi-email"   
    ></v-text-field>

    <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="dateOfBirth"
            :rules="birthdayRules"
            label="Birthday date"
            prepend-icon="mdi-calendar-range"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          ref="picker"
          v-model="dateOfBirth"
          :max="new Date().toISOString().substr(0, 10)"
          min="1930-01-01"
          @change="save"
        ></v-date-picker>
      </v-menu>

    <v-radio-group 
        required
        v-model="gender" 
        :rules="genderRules" 
        prepend-icon="mdi-gender-male-female" row>
      <v-radio label="Female" color="pink" value="Female"></v-radio>
      <v-radio label="Male" color="primary" value="Male"></v-radio>
    </v-radio-group>

      <v-select
        prepend-inner-icon="mdi-city-variant"
        v-model="city"
        :items="cities"
        :rules="cityRules"
        label="City"
        required
      ></v-select>

    <v-text-field
      v-model="phone"
      :rules="phoneRules"
      label="Phone number"
      required
      clearable
      prepend-inner-icon="mdi-cellphone-basic">
    </v-text-field>

    <v-wait for="loading auth btn">
      <template slot="waiting">
        <v-btn 
          disabled
          loading
          class="mt-3 mr-4">
          Register
        </v-btn>
      </template>
        <v-btn 
          color="success"
          class="mt-3 mr-4"
          @click="submitRegister()">
          Register
        </v-btn>
    </v-wait>

  </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import { registerUser } from '../../api_calls/auth'
import { user_register_validation_mixin } from '../../mixins/validation_mixins'

export default {
  name: 'Register',
  mixins: [user_register_validation_mixin],
  data() {
    return {
      menu: false,
      hidePassword: true,
      hidePasswordConfirm: true,
    }
  },
  computed: {
    ...mapFields('auth', [
      'registerForm.valid',
      'registerForm.username',
      'registerForm.password',
      'registerForm.confirmPassword',
      'registerForm.email',
      'registerForm.dateOfBirth',
      'registerForm.gender',
      'registerForm.city',
      'registerForm.phone'
    ]),
  },
  methods: {
    ...mapActions('auth',['authenticate']),
    save (date) {
      this.$refs.menu.save(date)
    },
    submitRegister() {
     let user_data = {
       username: this.username,
       password: this.password,
       email: this.email,
       dateOfBirth: this.dateOfBirth,
       gender: this.gender,
       city: this.city,
       phone: this.phone,
       cart: [],
       authType: 'register'
     }
     if (this.$refs.registerForm.validate()) {
      this.authenticate(user_data)
     }
   },
  },
  watch: {
  menu (val) {
    val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
  },
  },
  beforeDestroy() {
    this.$refs.registerForm.reset()
  }
};
</script>

<style>
label {
  display: block;
  margin: 10px;
}
.v-input--radio-group__input {
  flex-wrap: nowrap;
}
</style>
