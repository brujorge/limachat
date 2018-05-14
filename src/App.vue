<template>
  <v-app >
  <v-toolbar v-if="isAuthenticated && this.$route.name!=='conversation'" dark color="primary">
    <v-layout row justify-space-around>
    <v-btn icon>
      <v-icon>mdi-forum</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-account-multiple</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-account-plus</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-settings</v-icon>
    </v-btn>
    </v-layout>
  </v-toolbar>
  <v-content>
      <router-view></router-view>
  </v-content>
</v-app>
</template>

<script>
export default {
  name: 'App',
  data : () => ({
    isAuthenticated: false
  }),
  
    
}
</script>

<style>
.container.grid-list-xs {
  padding: 0
}
</style>
