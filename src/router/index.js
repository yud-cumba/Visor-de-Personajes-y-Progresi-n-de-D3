import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// Configuración rutas
const routerOptions = [
  { path: '/', name: 'Home' },
  { path: '/region/:region/profile/:battleTag', name: 'Profile' },
  { path: '/region/:region/profile/:battleTag/hero/:heroId', name: 'Hero' },
  { path: '/about', name: 'About' },
  { path: '/error', name: 'Error' },
  { path: '*', redirect: { name: 'Home' } }
]

// Rutas
const routes = routerOptions.map(r => {
  return {
    ...r,
    // Lazy load
    component: () => import(/* webpackChunkName: "[request]" */`@/views/${r.name}/Index.vue`)
  }
})

// const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: () => import(/* webpackChunkName: "Home" */ '@/views/Home/Index.vue')
//   },
//   {
//     path: '/about',
//     name: 'About',
//     component: () => import(/* webpackChunkName: "About" */ '@/views/About/Index.vue')
//   },
//   {
//     path: '/region/:region/profile/:battleTag',
//     name: 'Profile',
//     component: () => import(/* webpackChunkName: "Profile" */ '@/views/Profile/Index.vue')
//   },
//   {
//     path: '/region/:region/profile/:battleTag/hero/:heroId',
//     name: 'Hero',
//     component: () => import(/* webpackChunkName: "Hero" */ '@/views/Hero/Index.vue')
//   },
//   {
//     path: '/error',
//     name: 'Error',
//     component: () => import(/* webpackChunkName: "Error" */ '@/views/Error/Index.vue')
//   }
// ]

const router = new Router({
  routes
})

export default router
