<template>
  <div>
    <h2>Register Form {{ city }} {{ gender }} {{ username }}</h2>
      <v-container grid-list-xl>
        <v-layout row justify-center align-center>
          <v-flex xs11 sm4 md4 lg4 xl8>
    <v-form
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
      validate-on-blur
      clearable
      prepend-inner-icon="mdi-lock"
      
    ></v-text-field>

    <v-text-field
       v-model="repeatPassword"
      :rules="repeatPasswordRules"
      label="repeatPassword"
      required
      validate-on-blur
      clearable
      prepend-inner-icon="mdi-lock"
      
    ></v-text-field>

    <v-text-field
      v-model="age"
      :rules="ageRules"
      label="Age"
      required
      validate-on-blur
      clearable
      prepend-inner-icon="mdi-lock"
      
    ></v-text-field>

    <v-radio-group v-model="gender" row>
      <v-radio label="Female" color="pink" value="Female"></v-radio>
      <v-radio label="Male" color="primary" value="Male"></v-radio>
    </v-radio-group>

      <v-select
        v-model="city"
        :items="cities"
        :rules="[v => !!v || 'City is required']"
        label="City"
        required
      ></v-select>

    <v-text-field
      v-model="phone"
      :rules="phoneRules"
      label="Phone"
      required
      validate-on-blur
      clearable
      prepend-inner-icon="mdi-lock"
      
    ></v-text-field>

    <v-btn
     
      color="success"
      class="mr-4"
      @click="submitRegister">
      Login
    </v-btn>
  </v-form>
            </v-flex>
        </v-layout>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import { registerUser } from '../../api_calls/auth'

export default {
  name: 'Register',
  data() {
    return {
      nameRules: [v => !!v || 'Name is required'],
      passwordRules: [v => !!v || 'Password is required'],
      repeatPasswordRules: [v => !!v || 'Repeat pass is required'],
      ageRules: [v => !!v || 'Age is required'],
      phoneRules: [v => !!v || 'Phone is required'],
      cities: ['Pleven', 'Plovdiv', 'Sofia'],
    }
  },
  computed: {
    ...mapFields('auth', [
      'registerForm.username',
      'registerForm.password',
      'registerForm.repeatPassword',
      'registerForm.age',
      'registerForm.gender',
      'registerForm.city',
      'registerForm.phone'
    ])
  },
  methods: {
    ...mapActions('auth',[
      'authenticate'
    ]),
   submitRegister() {
     let user_data = {
       username: this.username,
       password: this.password,
       age: this.age,
       sex: this.sex,
       city: this.city,
       county: this.county,
       phone: this.phone,
       cart: [],
       authType: 'register'
     }
     this.authenticate(user_data)
   },
  }
};
</script>

<style scope>
label {
  display: block;
  margin: 10px;
}
.v-input--radio-group__input {
  flex-wrap: nowrap;
}
</style>
