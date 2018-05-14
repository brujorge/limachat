<template>
  <v-app >
  <v-toolbar v-if="isAuthenticated && this.$route.name!=='conversation'" dark color="primary">
    <v-layout row justify-space-around>
    <v-btn to="/conversations" icon>
      <v-icon>mdi-forum</v-icon>
    </v-btn>
    <v-btn to="/friends" icon>
      <v-icon>mdi-account-multiple</v-icon>
    </v-btn>
    <v-btn to="/solicitudes" icon>
      <v-icon>mdi-account-plus</v-icon>
    </v-btn>
    <v-btn to="/settings" icon>
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

  }),
  computed: {
    isAuthenticated(){
      return this.$store.getters.isAuthenticated
    }
  }
    
}
</script>

<style>
.container.grid-list-xs {
  padding: 0
}
</style>
