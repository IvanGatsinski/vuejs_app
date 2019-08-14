<template>
  <div>
    <v-container grid-list-xl>
      <v-layout row wrap justify-space-around>

          <v-flex xs12 sm12 md8 lg6 xl6>
            <v-card 
              class="mb-3"
              color="transparent" dark >
              <v-list-item three-line>
                <v-list-item-avatar size="125">
                  <v-img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"></v-img>
                    </v-list-item-avatar>
                      <v-list-item-content class="align-self-start">
                        <v-list-item-title class="secondary--text headline mb-1">
                          My profile
                        </v-list-item-title>
                         <v-list-item-subtitle>Username: {{ userProfile.username }}</v-list-item-subtitle>
                      <v-list-item-subtitle>Age: {{ userProfile.age }}</v-list-item-subtitle>
                    <v-list-item-subtitle>City: {{ userProfile.city }}</v-list-item-subtitle>
                     <v-list-item-subtitle>E-mail: {{ userProfile.email }}</v-list-item-subtitle>
                    <v-list-item-subtitle>Phone: {{ userProfile.phone }}</v-list-item-subtitle>
                    <v-list-item-subtitle>Gender:
                       <v-icon color="#01579b" :title="'Male'" v-show="userProfile.gender === 'Male'">mdi-gender-male</v-icon>
                       <v-icon color="pink" :title="'Female'" v-show="userProfile.gender === 'Female'">mdi-gender-female</v-icon>
                       </v-list-item-subtitle>
                  </v-list-item-content>
                <v-layout column wrap justify-space-around align-content-end>
                  <v-btn :to="{ name: 'editMyProfile' }" max-width="50%" class="ma-1" color="rgb(31, 107, 36)">Edit Info</v-btn>
                  <v-btn :to="{ name: 'myProducts' }" max-width="50%" class="ma-1" color="rgb(31, 107, 36)">My products</v-btn>
                  <v-btn @click="$router.back(-1)" max-width="50%" class="ma-1" color="rgb(31, 107, 36)">Back</v-btn>
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
import { mapState, mapActions } from "vuex";

export default {
  name: "MyProfile",
  computed: {
    ...mapState("user", ["userProfile"]),
    ...mapState("products", ["myProducts"]),
  },
};
</script>

<style scoped>
  .v-card {
    box-shadow: none;
  }
  .headline {
    color: rgba(255, 255, 255, 0.75);
  }
  .theme--dark.v-list-item .v-list-item__subtitle {
    color: rgba(0, 0, 0, 0.85);
  }
</style>
