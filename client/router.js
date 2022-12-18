import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _2cd86a7a = () => interopDefault(import('../pages/Blog/index.vue' /* webpackChunkName: "pages/Blog/index" */))
const _40f4c19b = () => interopDefault(import('../pages/Contact.vue' /* webpackChunkName: "pages/Contact" */))
const _7540db3c = () => interopDefault(import('../pages/Products/index.vue' /* webpackChunkName: "pages/Products/index" */))
const _578347a2 = () => interopDefault(import('../pages/Admin/Dashboard.vue' /* webpackChunkName: "pages/Admin/Dashboard" */))
const _c6c82ff8 = () => interopDefault(import('../pages/Admin/Login.vue' /* webpackChunkName: "pages/Admin/Login" */))
const _5692c362 = () => interopDefault(import('../pages/Blog/_id.vue' /* webpackChunkName: "pages/Blog/_id" */))
const _367d085e = () => interopDefault(import('../pages/Work/_id.vue' /* webpackChunkName: "pages/Work/_id" */))
const _f62f4ba6 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/Blog",
    component: _2cd86a7a,
    name: "Blog"
  }, {
    path: "/Contact",
    component: _40f4c19b,
    name: "Contact"
  }, {
    path: "/Products",
    component: _7540db3c,
    name: "Products"
  }, {
    path: "/Admin/Dashboard",
    component: _578347a2,
    name: "Admin-Dashboard"
  }, {
    path: "/Admin/Login",
    component: _c6c82ff8,
    name: "Admin-Login"
  }, {
    path: "/Blog/:id",
    component: _5692c362,
    name: "Blog-id"
  }, {
    path: "/Work/:id?",
    component: _367d085e,
    name: "Work-id"
  }, {
    path: "/",
    component: _f62f4ba6,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
