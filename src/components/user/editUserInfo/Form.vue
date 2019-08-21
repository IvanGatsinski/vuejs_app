<template>
    <v-container>
        <v-layout justify-center>
            <v-flex xs12 sm8 md6 lg6 xl6>
                    <v-form
                        v-model="valid"
                        ref="userInfoForm">

                        <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="E-mail"
                        required
                        validate-on-blur
                        clearable
                        prepend-inner-icon="mdi-email"
                        ></v-text-field>

                        <v-text-field
                        v-model="phone"
                        :rules="phoneRules"
                        label="Phone"
                        required
                        validate-on-blur
                        clearable
                        prepend-inner-icon="mdi-phone"
                        ></v-text-field>

                        <v-radio-group v-model="gender" :rules="genderRules" row>
                        <v-radio label="Female" color="pink" value="Female"></v-radio>
                        <v-radio label="Male" color="primary" value="Male"></v-radio>
                        </v-radio-group>

                        <v-select
                        v-model="city"
                        :items="cities"
                        :rules="cityRules"
                        label="City"
                        required
                        ></v-select>

                        <v-wait for="edit user info loading">
                          <template slot="waiting">
                            <v-btn
                              loading
                              disabled
                              class="mr-4">
                              Save
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
                            @click="submitEdit()">
                            Save
                          </v-btn>
                          <v-btn 
                            color="warning"
                            @click="cancelEdit()"
                            class="mr-4">
                            Cancel
                          </v-btn>
                        </v-wait>
                    </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { user_register_validation_mixin } from '../../../mixins/validation_mixins'
import { mapState, mapActions } from "vuex";
import { mapFields } from 'vuex-map-fields'
import store from '../../../store';

export default {
  name: "EditUserInfo",
  mixins: [user_register_validation_mixin],
  computed: {
    ...mapState("user", ["userProfile"]),
    ...mapFields("user", [
        'editUserInfo.valid',
        'editUserInfo.city',
        'editUserInfo.email',
        'editUserInfo.gender',
        'editUserInfo.phone',
    ])
  },
  methods: {
    ...mapActions('user', ['editUserInfo']),
    submitEdit() {
      let user_data = {...this.userProfile}
      user_data.city = this.city
      user_data.email = this.email
      user_data.gender = this.gender
      user_data.phone = this.phone

      if (this.$refs.userInfoForm.validate()) {
        this.editUserInfo(user_data)
      }
    },
    cancelEdit() {
      this.$router.back(-1)
    }
  },
  beforeRouteEnter(to, from, next) {
    store.commit('user/SET_EDIT_USER_INFO_FORM_FIELDS')
    next()
  }
};
</script>