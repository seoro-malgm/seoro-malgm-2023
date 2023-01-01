import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5b82250d = () => interopDefault(import('../pages/Admin/index.vue' /* webpackChunkName: "pages/Admin/index" */))
const _40f4c19b = () => interopDefault(import('../pages/Contact.vue' /* webpackChunkName: "pages/Contact" */))
const _47528fdf = () => interopDefault(import('../pages/Logout.vue' /* webpackChunkName: "pages/Logout" */))
const _996eb91e = () => interopDefault(import('../pages/Admin/Create.vue' /* webpackChunkName: "pages/Admin/Create" */))
const _c6c82ff8 = () => interopDefault(import('../pages/Admin/Login.vue' /* webpackChunkName: "pages/Admin/Login" */))
const _50088cbe = () => interopDefault(import('../pages/Admin/Update.vue' /* webpackChunkName: "pages/Admin/Update" */))
const _b76aeb4c = () => interopDefault(import('../pages/Blog/Index.vue' /* webpackChunkName: "pages/Blog/Index" */))
const _269a09c8 = () => interopDefault(import('../pages/Products/Index.vue' /* webpackChunkName: "pages/Products/Index" */))
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
    path: "/Admin",
    component: _5b82250d,
    name: "Admin"
  }, {
    path: "/Contact",
    component: _40f4c19b,
    name: "Contact"
  }, {
    path: "/Logout",
    component: _47528fdf,
    name: "Logout"
  }, {
    path: "/Admin/Create",
    component: _996eb91e,
    name: "Admin-Create"
  }, {
    path: "/Admin/Login",
    component: _c6c82ff8,
    name: "Admin-Login"
  }, {
    path: "/Admin/Update",
    component: _50088cbe,
    name: "Admin-Update"
  }, {
    path: "/Blog/Index",
    component: _b76aeb4c,
    name: "Blog-Index"
  }, {
    path: "/Products/Index",
    component: _269a09c8,
    name: "Products-Index"
  }, {
    path: "/Blog/:id?",
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
