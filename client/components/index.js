export { default as GlobalFooter } from '../../components/GlobalFooter.vue'
export { default as GlobalNav } from '../../components/GlobalNav.vue'
export { default as Loading } from '../../components/Loading.vue'
export { default as Logo } from '../../components/Logo.vue'
export { default as IconArrBack } from '../../components/icon/ArrBack.vue'
export { default as IconArrDown } from '../../components/icon/ArrDown.vue'
export { default as IconArrTop } from '../../components/icon/ArrTop.vue'

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
