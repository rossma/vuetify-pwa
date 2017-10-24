<template>
  <v-slide-y-transition mode="out-in">
    <v-layout column align-center>
      <img src="/static/img/v.png" alt="Vuetify.js" class="mb-5">
      <v-divider class="mb-2"></v-divider>
      <v-layout row wrap>
        <v-flex d-flex xs12>
          <v-card>
            <v-card-title primary class="title">Home Landing Page</v-card-title>
            <v-card-text>
              This is your home screen
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-slide-y-transition>
</template>

<script>
export default {
  name: 'home'
}
</script>

