<template>
     <div>
       <div class="section__heading">Sign up</div>
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
     </div>
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
    avatar() {
      return this.gender === 'Male' ? 
      'data:image/jpeg;base64,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' :
      'data:image/jpeg;base64,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'
    }
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
       avatar: this.avatar,
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
