<template>
      <div>
           <v-flex
          v-for="(item, i) in items"
          :key="i"
        >

        </v-flex>
      </div>
</template>

<script>
  export default {
    data: () => ({
      items: [
        {
          color: 'rgb(97, 189, 255)',
          src: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
          title: 'Supermodel',
          artist: 'Foster the People',
        },
        {
          color: '#952175',
          src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
          title: 'Halcyon Days',
          artist: 'Ellie Goulding',
        },
      ],
    }),
  }
</script>

<style>

</style>
