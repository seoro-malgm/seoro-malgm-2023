<template>
  <div id="app">
    <header>
      <!-- 로고 -->
      <Logo :gatherd="onGathered" />
      <global-nav />
    </header>
    <!-- scroll down -->
    <div class="scroll-down" :class="{ active: onGathered }">
      <span class="text-primary">Scroll Down</span>
      <icon-arr-down />
    </div>

    <!-- scroll up btn -->
    <b-btn
      variant="secondary btn-go-top d-inline-flex align-items-center shadow"
      :class="{ active: scrollUpActive }"
      @click="goTop"
      aria-label="맨 위로 이동 버튼"
      aria-description="스크롤을 맨 위로 이동시키는 버튼입니다"
    >
      <icon-arr-top />
    </b-btn>

    <!-- 내용 -->
    <main id="main" class="container-fluid" :class="{ active: !onGathered }">
      <Nuxt />
    </main>

    <!-- footer -->
    <global-footer />
  </div>
</template>

<script>
export default {
  name: 'Default',
  data() {
    return {
      onGathered: true,
      scrollUpActive: false,
    }
  },
  computed: {
    path() {
      return this.$nuxt.$route.name
    },
  },
  beforeMount() {
    // 스크롤 핸들러
    window.addEventListener('scroll', this.handleScroll)
  },
  mounted() {
    window.toast = this.toast
  },
  beforeDestroy() {
    if (this.path !== 'index') return
    // 스크롤 핸들러 해제
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll(e) {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      if (scrollTop <= 50) {
        this.onGathered = true
      }

      if (scrollTop >= 180) {
        this.scrollUpActive = true
      }

      if (this.onGathered && scrollTop > 50) {
        this.onGathered = false
      }
      if (this.scrollUpActive && scrollTop < 180) {
        this.scrollUpActive = false
      }
    },
    goTop() {
      window.scrollTo(0, 0)
    },
    async toast(
      msg,
      opt = {
        id: 'toast',
        variant: 'primary',
        textVariant: 'white',
      }
    ) {
      const h = this.$createElement

      const bodyNode = h('div', {
        class: 'px-2',
        domProps: {
          innerHTML: `
          <div class="text-${opt.textVariant}">
            <span class="text-13 fw-500">${msg}</span>
          </div>
          `,
        },
      })

      this.$bvToast.toast(bodyNode, {
        solid: true,
        noCloseButton: true,
        headerClass: `bg-${opt.variant} p-0 border-0 text-white fw-600`,
        bodyClass: `bg-${opt.variant} py-3 border-0 rounded text-white fw-600`,
        toastClass: 'border-0  pt-0',
        toaster: 'b-toaster-bottom-left',
      })
    },
  },
}
</script>
<style lang="scss" scoped>
#app {
  // padding: 16px 0;
  #main {
    padding-top: 100vh;
    overflow-y: unset;
    // transform: translateY(48px);
    opacity: 0;
    transition: all 0.5s;
    &.active {
      transform: translateY(-10vh);
      opacity: 1;
    }
  }
}
@keyframes updown {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(16px);
  }
}
.scroll-down {
  position: fixed;
  left: 50%;
  bottom: 6rem;
  display: none;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.4s;
  .icon {
    animation-name: updown;
    animation-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
    animation-duration: 0.7s;
    animation-fill-mode: forwards;
    animation-direction: alternate;
    animation-iteration-count: infinite;
    width: 64px;
    height: 64px;
    margin-bottom: 4px;
  }
  &.active {
    display: flex;
    opacity: 1;
  }
}

.btn-go-top {
  padding: 8px 8px;
  background-color: #ededed !important;
  border-color: #ededed !important;
  border-radius: 50%;
  display: flex;
  position: fixed;
  transition: 0.3s;
  z-index: 2010;
  font-size: 16px;
  right: 1rem;
  // top: -4rem;
  // @media (min-width: 1280px) {
  // top: unset;
  bottom: -4rem;
  // }
  &.active {
    // @media (min-width: 1280px) {
    bottom: 1rem;
    top: unset;
    // }
    // top: 1rem;
  }
}
</style>
