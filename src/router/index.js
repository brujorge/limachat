import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

Vue.use(Router)
const routerOptions = [
  {path: '/conversation/:id', component: 'Conversation', meta:{requiresAuth:true}},
  {path: '/signup', component: 'SignUp'},
  {path: '/signin', component: 'SignIn'},
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
    next('/signin')
  } else {
    next()
  }
})
export default router
