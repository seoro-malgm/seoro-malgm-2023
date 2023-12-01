import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _11ad4096 = () => interopDefault(import('../pages/admin/index.vue' /* webpackChunkName: "pages/admin/index" */))
const _30e98a5c = () => interopDefault(import('../pages/blog/index.vue' /* webpackChunkName: "pages/blog/index" */))
const _2918df7a = () => interopDefault(import('../pages/contact.vue' /* webpackChunkName: "pages/contact" */))
const _660ab5f6 = () => interopDefault(import('../pages/linktree.vue' /* webpackChunkName: "pages/linktree" */))
const _a0296792 = () => interopDefault(import('../pages/logout.vue' /* webpackChunkName: "pages/logout" */))
const _023880d8 = () => interopDefault(import('../pages/products/index.vue' /* webpackChunkName: "pages/products/index" */))
const _15b6e1a9 = () => interopDefault(import('../pages/admin/create.vue' /* webpackChunkName: "pages/admin/create" */))
const _7e5dfa68 = () => interopDefault(import('../pages/admin/login.vue' /* webpackChunkName: "pages/admin/login" */))
const _9b126a14 = () => interopDefault(import('../pages/admin/update.vue' /* webpackChunkName: "pages/admin/update" */))
const _590f7f7c = () => interopDefault(import('../pages/admin/write.vue' /* webpackChunkName: "pages/admin/write" */))
const _93f5a5f8 = () => interopDefault(import('../pages/admin/writings.vue' /* webpackChunkName: "pages/admin/writings" */))
const _08246c8c = () => interopDefault(import('../pages/blog/_id.vue' /* webpackChunkName: "pages/blog/_id" */))
const _ebc6fbae = () => interopDefault(import('../pages/work/_id.vue' /* webpackChunkName: "pages/work/_id" */))
const _4a0cd2b5 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _11ad4096,
    name: "admin"
  }, {
    path: "/blog",
    component: _30e98a5c,
    name: "blog"
  }, {
    path: "/contact",
    component: _2918df7a,
    name: "contact"
  }, {
    path: "/linktree",
    component: _660ab5f6,
    name: "linktree"
  }, {
    path: "/logout",
    component: _a0296792,
    name: "logout"
  }, {
    path: "/products",
    component: _023880d8,
    name: "products"
  }, {
    path: "/admin/create",
    component: _15b6e1a9,
    name: "admin-create"
  }, {
    path: "/admin/login",
    component: _7e5dfa68,
    name: "admin-login"
  }, {
    path: "/admin/update",
    component: _9b126a14,
    name: "admin-update"
  }, {
    path: "/admin/write",
    component: _590f7f7c,
    name: "admin-write"
  }, {
    path: "/admin/writings",
    component: _93f5a5f8,
    name: "admin-writings"
  }, {
    path: "/blog/:id",
    component: _08246c8c,
    name: "blog-id"
  }, {
    path: "/work/:id?",
    component: _ebc6fbae,
    name: "work-id"
  }, {
    path: "/",
    component: _4a0cd2b5,
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
