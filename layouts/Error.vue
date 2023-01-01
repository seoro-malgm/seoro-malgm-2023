<template>
  <div id="error">
    <div
      class="min-vh-100 d-flex flex-column align-items-center justify-content-center"
    >
      <h1 class="mb-2 text-primary">ERROR</h1>
      <img src="~/assets/on-error.png" alt="에러 이미지" class="mb-5" />
      <b-btn variant="primary" pill to="/">메인으로 이동</b-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
}
</script>

<style lang="scss" scoped></style>
