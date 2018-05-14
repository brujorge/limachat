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
    <v-menu>
    <v-btn slot="activator" icon>
      <v-icon>mdi-settings</v-icon>
    </v-btn>
     <v-list>
       <v-list-tile>
         <v-list-tile-content>
          <v-list-tile-title>Settings</v-list-tile-title>
         </v-list-tile-content>
         <v-list-tile-action>
           <v-icon>mdi-settings</v-icon>
         </v-list-tile-action>
       </v-list-tile>
       <v-divider></v-divider>
       <v-list-tile @click="userSignOut">
         <v-list-tile-content>
          <v-list-tile-title>Logout</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon>mdi-arrow-right-bold-box-outline</v-icon>
         </v-list-tile-action>
       </v-list-tile>
       
     </v-list>
   </v-menu>
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
    },
    currentUser(){
      return this.$store.state.currentUser
    }
  },
  methods: {
    userSignOut(){
      this.$store.dispatch('userSignOut',{uid : this.currentUser.uid })
    }
  }
    
}
</script>

<style>
.container.grid-list-xs {
  padding: 0
}
</style>
