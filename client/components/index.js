export const GlobalNav = () => import('../../components/GlobalNav.vue' /* webpackChunkName: "components/global-nav" */).then(c => wrapFunctional(c.default || c))
export const Loading = () => import('../../components/Loading.vue' /* webpackChunkName: "components/loading" */).then(c => wrapFunctional(c.default || c))
export const Logo = () => import('../../components/Logo.vue' /* webpackChunkName: "components/logo" */).then(c => wrapFunctional(c.default || c))
export const IconArrBack = () => import('../../components/icon/ArrBack.vue' /* webpackChunkName: "components/icon-arr-back" */).then(c => wrapFunctional(c.default || c))
export const IconArrDown = () => import('../../components/icon/ArrDown.vue' /* webpackChunkName: "components/icon-arr-down" */).then(c => wrapFunctional(c.default || c))
export const IconArrTop = () => import('../../components/icon/ArrTop.vue' /* webpackChunkName: "components/icon-arr-top" */).then(c => wrapFunctional(c.default || c))

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
