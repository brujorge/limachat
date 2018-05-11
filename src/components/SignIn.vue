<template>
  <v-container  class="signin-container" grid-list-xs text-xs-center mt-5>
  <v-alert type="success" v-if="alertMsg" dismissible v-model="alertIsVisible">{{alertMsg}}</v-alert>
    <v-layout row wrap>
      <v-flex xs10 sm6 md4 offset-xs1 offset-sm3 offset-md4>
        <h1>Sign In</h1>
        <v-form @submit.prevent="userSignIn">
          <v-text-field
            label="Email"
            prepend-icon="mdi-account-circle"
            name="email"
            id="id"
            v-model="email"
          ></v-text-field>
          <v-text-field
            :prepend-icon-cb="()=>(passwordIsVisible=!passwordIsVisible)"
            :prepend-icon="passwordIsVisible? 'visibility': 'visibility_off'"
            :type="passwordIsVisible? 'text':'password'"
            name="password"
            label="Password"
            v-model="password"
          ></v-text-field>
          <v-btn type="submit" block color="primary" >sign in</v-btn>
          Don't have an account yet? <v-btn to="/signup" color="success" flat>sign up</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data: ()=>({
    passwordIsVisible: false,
    email: '',
    password: '',
    alertIsVisible: true
  }),
  methods: {
    userSignIn() {
      this.$store.dispatch('userSignIn',{email:this.email, password: this.password})
    }
  },
  computed:{
    alertMsg(){
      return this.$store.state.alert
    },
  },
  watch: {
    alertIsVisible(val){
      if(!val){
        this.$store.commit('SET_ALERT', false)
      }
    }
  }
}
</script>
<style>

</style>
