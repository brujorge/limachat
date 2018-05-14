import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from '@/router'
import 'firebase/firestore'

Vue.use(Vuex)
firebase.initializeApp({
  apiKey: "AIzaSyA0SzC8AaT0z7ChkbLTZsgVeUb6PrzseHw",
  authDomain: "limachat-5debf.firebaseapp.com",
  databaseURL: "https://limachat-5debf.firebaseio.com",
  projectId: "limachat-5debf",
  storageBucket: "limachat-5debf.appspot.com",
  messagingSenderId: "353731756650"
})

const state = {
  db: firebase.firestore(),
  currentUser : null,
  alert: false
}

const mutations = {
  SET_CURRENT_USER(state, user){
    state.currentUser = user
  },
  SET_ALERT(state, payload){
    state.alert = payload
  }
}

const actions = {
  userSignUp({commit,rootState}, payload){
    const db = rootState.db
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
    .then(firebaseUser => {
      commit('SET_ALERT', 'Succesfully registered')
      firebaseUser.user.updateProfile({
        displayName: payload.username,
        photoURL: 'https://i.imgur.com/M3BCYmI.jpg'
      })
      db.collection('users').doc(firebaseUser.user.uid).set({
        username: payload.username,
        email: firebaseUser.user.email,
        uid : firebaseUser.user.uid,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      }).then(docRef => {
        db.collection('conversations/limajs/participants').add({
          reference: firebaseUser.user.uid
        })
      }).catch(err => console.log(err))
      router.push('/')
    })
  },
  userSignIn({commit}, payload){
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
    .then(firebaseUser => {
      commit('SET_CURRENT_USER', firebaseUser.user)
      router.push('/conversation/limajs')
    })
  },
  userAutoSignIn({commit}, firebaseUser){
    commit('SET_CURRENT_USER', firebaseUser)
  }
}

const getters = {
  isAuthenticated(state){
    return state.currentUser !== null && state.currentUser !== undefined
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions ,
  getters
})