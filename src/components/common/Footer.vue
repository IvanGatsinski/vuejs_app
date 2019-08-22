<template>
    <v-container fluid>
       <v-layout justify-center wrap>
           <v-flex xs12 class="text-center caption">&copy; Copyright 2019 
               <span class="project__creator body-2">Ivan Gatsinski</span>
           </v-flex>
       </v-layout>
    </v-container>
</template>

<script>
import axios from 'axios'
import { setTimeout } from 'timers';
export default {
    name: 'Footer',
}
</script>

<style scoped>
    .container {
        background: rgba(0, 132, 255, 0.521);
    }
    .project__creator {
       font-weight: 400;
       font-style: italic;
    }
</style>