import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _d22125a6 = () => interopDefault(import('../pages/admin/index.vue' /* webpackChunkName: "pages/admin/index" */))
const _68919e5a = () => interopDefault(import('../pages/blog/index.vue' /* webpackChunkName: "pages/blog/index" */))
const _44e9cc8a = () => interopDefault(import('../pages/contact.vue' /* webpackChunkName: "pages/contact" */))
const _5efe9882 = () => interopDefault(import('../pages/logout.vue' /* webpackChunkName: "pages/logout" */))
const _077d1f1c = () => interopDefault(import('../pages/products/index.vue' /* webpackChunkName: "pages/products/index" */))
const _6eb28331 = () => interopDefault(import('../pages/admin/create.vue' /* webpackChunkName: "pages/admin/create" */))
const _60971044 = () => interopDefault(import('../pages/admin/login.vue' /* webpackChunkName: "pages/admin/login" */))
const _0b726c7e = () => interopDefault(import('../pages/admin/update.vue' /* webpackChunkName: "pages/admin/update" */))
const _733e4dba = () => interopDefault(import('../pages/admin/write.vue' /* webpackChunkName: "pages/admin/write" */))
const _82c2e6e8 = () => interopDefault(import('../pages/admin/writings.vue' /* webpackChunkName: "pages/admin/writings" */))
const _4cc76f42 = () => interopDefault(import('../pages/blog/_id.vue' /* webpackChunkName: "pages/blog/_id" */))
const _4a13b09e = () => interopDefault(import('../pages/work/_id.vue' /* webpackChunkName: "pages/work/_id" */))
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
    path: "/admin",
    component: _d22125a6,
    name: "admin"
  }, {
    path: "/blog",
    component: _68919e5a,
    name: "blog"
  }, {
    path: "/contact",
    component: _44e9cc8a,
    name: "contact"
  }, {
    path: "/logout",
    component: _5efe9882,
    name: "logout"
  }, {
    path: "/products",
    component: _077d1f1c,
    name: "products"
  }, {
    path: "/admin/create",
    component: _6eb28331,
    name: "admin-create"
  }, {
    path: "/admin/login",
    component: _60971044,
    name: "admin-login"
  }, {
    path: "/admin/update",
    component: _0b726c7e,
    name: "admin-update"
  }, {
    path: "/admin/write",
    component: _733e4dba,
    name: "admin-write"
  }, {
    path: "/admin/writings",
    component: _82c2e6e8,
    name: "admin-writings"
  }, {
    path: "/blog/:id",
    component: _4cc76f42,
    name: "blog-id"
  }, {
    path: "/work/:id?",
    component: _4a13b09e,
    name: "work-id"
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
