<template>
  <v-layout row >
    <v-flex xs12>
      <v-list class="pt-0">
        <v-list-tile :to="'/conversation/'+conversation.id" v-for="(conversation, i) in conversations" :key="i" avatar>
          <v-list-tile-title>{{conversation.name}}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  data: () =>({
    conversations: []
  }),
  computed: {
    db(){
      return this.$store.state.db
    },
    currentUser(){
      return this.$store.state.currentUser
    }
  },
  mounted(){
    this.getConversations()
  },
  methods: {
    getConversations(){
      this.db.doc(`users/${this.currentUser.uid}`).get().then(doc => {
        const conversationsId = doc.data().conversations
        Object.keys(conversationsId).filter(k => conversationsId[k]).forEach(id => {
          this.db.doc(`conversations/${id}`).get().then(conv => {
            this.conversations.push(conv.data())
            console.log(conv.data());
          })
        })
      })
    }
  }
}
</script>