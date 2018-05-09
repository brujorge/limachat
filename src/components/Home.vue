<template>
    <div id='home'>
        <v-flex xs10 offset-xs1 id="message">
          <v-text-field
          v-model="message"
          label="Escribe algo">
        </v-text-field>
        </v-flex>  
    </div>
</template>

<script>
export default {
    name: 'home',
    data() {
        return {
          message: ''
        }
    },
    computed:{
      db(){
        return this.$store.state.db.currentUser
      }
    }
}
</script>
<style>
#message {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0
}
</style>
