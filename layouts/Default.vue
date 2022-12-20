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
    <!-- 내용 -->
    <main id="main" class="container-fluid" :class="{ active: !onGathered }">
      <Nuxt />
    </main>
  </div>
</template>

<script>
export default {
  name: 'Default',
  data() {
    return {
      onGathered: true,
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
      } else {
        if (this.onGathered) {
          this.onGathered = false
        }
      }
    },
  },
}
</script>
<style lang="scss" scoped>
#app {
  padding: 16px 0;
  #main {
    padding-top: 600px;
    transform: translateY(48px);
    opacity: 0;
    transition: all 0.5s;
    &.active {
      transform: translateY(0);
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
</style>
