<template>
  <div class="text-center py-5">
    <b-spinner variant="primary" large />
  </div>
</template>

<script>
export default {
  mounted() {
    this.logout()
  },
  methods: {
    logout() {
      // 스토리지에서 제거
      sessionStorage.removeItem('seoro-malgm-token')
      // store에서 제거
      this.$store.dispatch('setState', ['user', null])
      this.$router.push('/admin/login')
    },
  },
}
</script>

<style lang="scss" scoped></style>
