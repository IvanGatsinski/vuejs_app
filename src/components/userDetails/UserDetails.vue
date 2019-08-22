<template>
  <div>

    <global-loader v-if="!userDetails">
    </global-loader>
    <v-container grid-list-xl v-else>
      <v-layout row wrap justify-space-around>
          <v-flex xs12>
            <div class="section__heading">
              Information about 
              <span v-if="isAuthor(userId)">me</span>
              <span v-else>{{ userDetails.username }}</span>
            </div>
          </v-flex>
          <v-flex xs12 sm12 md8 lg6 xl6>
            <v-card 
              class="mb-3"
              color="rgba(31, 77, 107, .2)" dark >
              <v-list-item three-line>
                <v-list-item-avatar size="125">
                  <v-img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"></v-img>
                    </v-list-item-avatar>

                      <v-list-item-content v-if="isAuthor(userId)" class="align-self-start">
                        <v-list-item-title class="headline mb-1">
                           My profile
                        </v-list-item-title>
                         <v-list-item-subtitle>Username: {{ userProfile.username }}</v-list-item-subtitle>
                      <v-list-item-subtitle>Age: {{ getAge(userProfile.dateOfBirth) }}</v-list-item-subtitle>
                    <v-list-item-subtitle>City: {{ userProfile.city }}</v-list-item-subtitle>
                     <v-list-item-subtitle>E-mail: {{ userProfile.email }}</v-list-item-subtitle>
                    <v-list-item-subtitle>Phone: {{ userProfile.phone }}</v-list-item-subtitle>
                    <v-list-item-subtitle>Gender:
                       <v-icon color="#01579b" :title="'Male'" v-show="userProfile.gender === 'Male'">mdi-gender-male</v-icon>
                       <v-icon color="pink" :title="'Female'" v-show="userProfile.gender === 'Female'">mdi-gender-female</v-icon>
                       </v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-content v-else class="align-self-start">
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
                  v-if="isAuthor(userId)"
                  :to="{ name: 'editMyProfile' }" 
                  max-width="70%" 
                  class="ma-1" 
                  color="indigo darken-2">
                  Edit profile
                  </v-btn>
                  
                  <v-btn 
                  v-show="isAuthor(userId)"
                  :to="{ name: 'userProducts', params: userId }" 
                  max-width="70%" 
                  class="ma-1" 
                  color="indigo darken-2">
                  My products
                  </v-btn>

                  <v-btn 
                  v-show="isAuthor(userId) === false"
                  :to="{ name: 'userProducts', params: userId }" 
                  max-width="70%" 
                  class="ma-1" 
                  color="indigo darken-2">
                  {{userDetails.username}}'s products
                  </v-btn>

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
    <transition name="fade" mode="out-in">
    <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { fetchUserInfo } from '../../api_calls/user'
import { mapState, mapActions, mapGetters } from 'vuex';
import { setTimeout } from 'timers';

export default {
    name: 'UserDetails',
    computed: {
        ...mapState('user', ['userProfile','userDetails']),
        ...mapGetters('user', ['getAge', 'isAuthor']),
        userId() {
          return this.$route.params.id
        }
    },
    methods: {
        ...mapActions('user', ['getUserDetails', 'clearUserDetails'])
    },
    created() {
        this.getUserDetails(this.userId)
    },
    beforeDestroy() {
        this.clearUserDetails()
    }
}
</script>

<style scoped>
    .v-list-item__subtitle, .v-list-item__title {
      color: rgba(0, 0, 0, 0.7) !important;
    }
    .user-details__layout {
        width: 75px;
        margin: auto -10px;
        margin-top: 0 !important;
    }
    .user-details__layout > .v-btn {
        width: 100% !important;
    }
</style>