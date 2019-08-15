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
      label="Password"
      required
      clearable
      prepend-inner-icon="mdi-lock"
      
    ></v-text-field>

    <v-text-field
       v-model="confirmPassword"
      :rules="confirmPasswordRules"
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
      label="+359 "
      required
      clearable
      prepend-inner-icon="mdi-cellphone-basic"
    ></v-text-field>
    <v-btn 
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="submitRegister()">
      Register
    </v-btn>
  </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import { registerUser } from '../../api_calls/auth'

export default {
  name: 'Register',
  data() {
    return {
      nameRules: [
        v => !!v || 'Name is required',
        v => /^[a-zA-Z]{3,12}$/.test(v) || 'Username must contain letters only and be between 3 and 12 characters long'
        ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,12}$/.test(v) || 'Password must be between 4 and 12 characters and contain at least one letter and one number',
        ],
      confirmPasswordRules: [
        v => !!v || 'Confirm password is required',
        v => (this.confirmPassword === this.password) || 'Passwords must match'
        ],
      emailRules: [
        v => !!v || 'E-mail is required'
        ],
      cityRules: [v => !!v || 'City is required!'],
      genderRules: [v => !!v || 'Gender is required!'],
      birthdayRules: [v => !!v || 'Date of birth is required!'],
      ageRules: [
        v => !!v || 'Age is required'
        ],
      phoneRules: [
        v => !!v || 'Phone is required'
        ],
      cities: ['Pleven', 'Plovdiv', 'Sofia'],
      menu: false,
      // years: () => {
      //   let date = new Date()
      //   let getThisYear = date.getFullYear()
      //   let maxAge = 105
      //   let earliestYear = getThisYear - maxAge
      //   let yearsCollection = []

      //   for (let i = 1; i <= maxAge; i++) { yearsCollection.push(earliestYear + i) }
      //   return yearsCollection
      // },
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
    ...mapActions('auth',[
      'authenticate'
    ]),
    save (date) {
      this.$refs.menu.save(date)
    },
    submitRegister() {
     let user_data = {
       username: this.username,
       password: this.password,
       email: this.email,
       age: null,
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
