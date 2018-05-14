import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

Vue.use(Router)
const routerOptions = [
  {path: '/conversations', name: 'conversations', component: 'Conversations', meta:{requiresAuth:true}},
  {path: '/conversation/:id', name: 'conversation', component: 'Conversation', meta:{requiresAuth:true}},
  {path: '/paint', component: 'Paint'},
  {path: '/signup', component: 'SignUp'},
  {path: '/', component: 'SignIn'},
]
const routes = routerOptions.map(route => {
  return {
    ...route,
    component: () => import(`@/components/${route.component}`)
  }
})

const router = new Router({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next)=> {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = firebase.auth().currentUser
  if(requiresAuth && !isAuthenticated){
    next('/')
  } else {
    next()
  }
})
export default router
