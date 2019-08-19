<template>
  <div>
    <global-loader v-if="!userDetails">
    </global-loader>
    
    <v-container grid-list-xl v-else>
      <v-layout row wrap justify-space-around>

          <v-flex xs12 sm12 md8 lg6 xl6>
            <v-card 
              class="mb-3"
              color="rgba(31, 77, 107, .5)" dark >
              <v-list-item three-line>
                <v-list-item-avatar size="125">
                  <v-img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"></v-img>
                    </v-list-item-avatar>
                      <v-list-item-content class="align-self-start">
                        <v-list-item-title class="headline mb-1">
                           {{ userDetails.username }}'s profile
                        </v-list-item-title>
                         <v-list-item-subtitle>Username: {{ userDetails.username }}</v-list-item-subtitle>
                      <v-list-item-subtitle>Age: {{ getAge(userDetails.dateOfBirth) }}</v-list-item-subtitle>
                    <v-list-item-subtitle>City: {{ userDetails.city }}</v-list-item-subtitle>
                    <v-list-item-subtitle>Gender:
                       <v-icon color="#01579b" :title="'Male'" v-show="userDetails.gender === 'Male'">mdi-gender-male</v-icon>
                       <v-icon color="pink" :title="'Female'" v-show="userDetails.gender === 'Female'">mdi-gender-female</v-icon>
                       </v-list-item-subtitle>
                  </v-list-item-content>
                <v-layout class="user-details__layout" column wrap justify-space-around align-content-end>
        
                  <v-btn 
                  :to="{ name: 'userProducts', params: $route.params.id }" 
                  max-width="70%" 
                  class="ma-1" 
                  color="indigo darken-2">{{userDetails.username}}'s products</v-btn>
                  <v-btn 
                  @click="$router.back(-1)" 
                  max-width="70%" 
                  class="ma-1" 
                  color="indigo darken-2">Back</v-btn>
                </v-layout>
              </v-list-item>
            </v-card>
            
        </v-flex>
      </v-layout>
    </v-container>
    <router-view></router-view>
  </div>
</template>

<script>
import { fetchUserInfo } from '../../api_calls/user'
import { mapState, mapActions, mapGetters } from 'vuex';
import { setTimeout } from 'timers';

export default {
    name: 'UserDetails',
    computed: {
        ...mapState('user', ['userDetails']),
        ...mapGetters('user', ['getAge'])
    },
    methods: {
        ...mapActions('user', ['getUserDetails', 'clearUserDetails'])
    },
    created() {
        this.getUserDetails(this.$route.params.id)
    },
    beforeDestroy() {
        this.clearUserDetails()
    }
}
</script>

<style scoped>
    .user-details__layout {
        width: 75px;
        margin: auto -10px;
    }
    .user-details__layout > .v-btn {
        width: 100% !important;
    }
</style>