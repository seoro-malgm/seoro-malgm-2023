<template>
  <div id="app">
    <header>
      <!-- 로고 -->
      <Logo :gatherd="false" />
      <global-nav />
    </header>
    <!-- 내용 -->
    <main id="main" class="container-fluid">
      <Nuxt />
    </main>
  </div>
</template>

<script>
export default {
  name: 'Fixed',
  data() {
    return {
      onGathered: true,
    }
  },

  methods: {},
}
</script>
<style lang="scss" scoped>
#app {
  padding: 16px 0;
  #main {
    padding-top: 100px;
  }
}
</style>
