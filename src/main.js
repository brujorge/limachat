// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import router from './router'
import store from './store'
import firebase from 'firebase'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'mdi/css/materialdesignicons.min.css'
Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
const unsubscribe = firebase.auth()
.onAuthStateChanged(firebaseUser => {
  new Vue({
    el: '#app',
    store,
    router,
    components: { App },
    template: '<App/>',
    created(){
      if(firebaseUser){
        store.dispatch('userAutoSignIn', firebaseUser)
      }
    }
  })
  unsubscribe()
})