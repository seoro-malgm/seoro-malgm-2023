<template>
  <div>
    <b-spinner variant="primary" large />
  </div>
</template>

<script>
export default {
  layout: 'Dashboard',
  mounted() {
    this.$router.push('/admin/works')
  },
}
</script>

<style lang="scss" scoped></style>
