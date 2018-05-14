<template>
  <v-container class="signup-container" grid-list-xs text-xs-center mt-5>
    <v-layout row wrap>
      <v-flex xs12 >
        <img src="../assets/LIMACHAT.png" width="140px;" height="140px;" alt="">
      </v-flex>
      <v-flex xs10 sm6 offset-sm3 offset-xs1>
        <h1>Sign Up</h1>
        <v-form @submit.prevent="userSignUp">
           <v-text-field
            label="Email"
            prepend-icon="mdi-email"
            name="email"
            v-model="email"
          ></v-text-field>
          <v-text-field
            label="Username"
            prepend-icon="mdi-account-circle"
            name="username"
            v-model="username"
          ></v-text-field>
          <v-text-field
            :prepend-icon-cb="()=>(passwordIsVisible=!passwordIsVisible)"
            :prepend-icon="passwordIsVisible? 'visibility': 'visibility_off'"
            :type="passwordIsVisible? 'text':'password'"
            name="password"
            label="Password"
            v-model="password"
          ></v-text-field>
          <v-btn type="submit" block color="success" >sign up</v-btn>
          Already have an account? <v-btn to="/" color="primary" flat>sign in</v-btn>
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
    username: '',
    password: ''
  }),
  methods: {
    userSignUp() {
      this.$store.dispatch('userSignUp',{email:this.email, password: this.password, username: this.username})
    }
  }
}
</script>
<style>

</style>
