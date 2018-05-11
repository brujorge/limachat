<template>
  <v-container  fluid grid-list-xs>
    <v-toolbar color="primary" dark>
      <v-btn to="/conversations" icon>
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
      <v-toolbar-title>{{conversation.name}}</v-toolbar-title>
    </v-toolbar>
    <v-container>
    <v-layout>
      <v-flex xs10 offset-xs1>
          <p v-for="(msg,i) in conversation.messages" :key="i">{{msg.content}}</p>
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
          message: ''
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
        })
        this.participants =  participants
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
          author: 'bruno',
          timestamp : Date.now(),
          content: this.message
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
        }).then(() => {
        })
      }
    },
    mounted() {
      this.getParticipants()
      this.getConversation()
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
