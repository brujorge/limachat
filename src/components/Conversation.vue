<template>
<v-container fluid grid-list-xs>
  <v-toolbar color="primary" dark>
    <v-btn to="/conversations" icon>
    <v-icon>mdi-arrow-left</v-icon>
  </v-btn>
  <v-toolbar-title>{{conversation.name}}</v-toolbar-title>
  <v-spacer></v-spacer>
  <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
  </v-toolbar>
  <v-navigation-drawer right v-model="drawer" temporary fixed>
    <v-list>
      <v-list-tile avatar v-for="(participant,i) in participants" :key="i">
        <v-list-tile-avatar>
          <img src="https://i.imgur.com/M3BCYmI.jpg">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{participant.username}}</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon :color="participant.active? 'green':'gray'">mdi-circle</v-icon>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
  <v-layout row wrap>
    <v-flex d-flex xs12 >
      <v-list two-line>
        <v-list-tile v-for="(msg,i) in conversation.messages" :key="i" avatar>
          <v-list-tile-avatar>
            <img src="https://i.imgur.com/M3BCYmI.jpg">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-sub-title>{{msg.user}}</v-list-tile-sub-title>
            <v-list-tile-title>{{msg.content}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-flex>
    <v-flex xs12>
      <v-text-field
        @keyup.enter="sendMessage"
        :prepend-icon-cb="sendMessage"
        prepend-icon="mdi-send"
        label="Write a message"
        v-model="message"
      ></v-text-field>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import firebase from 'firebase'
export default {
    name: 'home',
    data() {
        return {
          participants: [],
          conversation : [],
          message: '',
          drawer: true
        }
    },
    computed:{
      db(){
        return this.$store.state.db
      },
      currentUser(){
        return this.$store.state.db
      }
    },
    methods: {
      getParticipants(){
        const convId = this.$route.params.id
        const colRef = this.db.collection(`conversations/${convId}/participants`)
        const userColRef = this.db.collection('users')
        const participants = []
        colRef.get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            userColRef.doc(doc.data().reference).get().then(userDoc =>{
              participants.push(userDoc.data())
            }) 
          })
          this.participants =  participants
        })
      },
      getConversation(){
        const convId = this.$route.params.id
        const convRef = this.db.doc(`conversations/${convId}`)
        convRef.get().then(doc => {
          this.conversation = doc.data()
        })
        convRef.onSnapshot(doc => {
          this.conversation.messages = doc.data().messages
        })
      },
      sendMessage(){
        const newMessage = {
          user: this.$store.state.currentUser.displayName,
          avatar: this.$store.state.currentUser.photoURL,
          content: this.message,
          timestamp : Date.now(),
        }
        this.message = ''
        
        const convId = this.$route.params.id
        const convRef = this.db.doc(`conversations/${convId}`)
        let messages = []
        this.db.runTransaction(transaction => {
          return transaction.get(convRef).then(conv => {
            messages = conv.data().messages
            messages.push(newMessage)
            transaction.update(convRef, {messages: messages})
          })
        })
      }
    },
    mounted() {
      this.getParticipants()
      this.getConversation()
      this.db.collection('users').onSnapshot(querySnapshot => {
        this.getParticipants()
      })
    }
}
</script>
<style>

</style>
