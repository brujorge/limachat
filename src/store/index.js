import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
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
  db: firebase.firestore()
}

const mutations = {

}

const actions = {

}

export default new Vuex.Store({
  state,
  mutations,
  actions  
})