<template>
  <div id="app">
    <header>
      <!-- 로고 -->
      <Logo :gatherd="onGathered" />
      <global-nav />
    </header>
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
</style>
