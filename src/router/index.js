import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const routerOptions = [
  {path: '/', component: 'Home'},
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

export default router
