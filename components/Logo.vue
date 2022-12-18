<template>
  <div class="logo-wrapper">
    <img class="logo eye" :src="require('~/assets/eye.svg')" alt="로고, 눈" />
    <img
      class="logo text"
      :src="require('~/assets/text.svg')"
      alt="로고, Seoro-malgm Studio"
    />
    <img
      class="logo right-hand"
      :src="require('~/assets/right-hand.svg')"
      alt="로고, 오른손"
    />
    <img
      class="logo left-hand"
      :src="require('~/assets/left-hand.svg')"
      alt="로고, 왼손"
    />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.logo-wrapper {
  position: relative;
  width: 180px;
  height: 180px;
}
.logo {
  height: auto;
  position: absolute;
  &.eye {
    width: 74px;
    top: 0;
    left: 40%;
  }
  &.text {
    width: 85px;
    top: 35%;
    left: 8px;
  }
  &.right-hand {
    width: 51px;
    left: 0;
    bottom: 0;
  }
  &.left-hand {
    width: 50px;
    right: 0;
    bottom: 20%;
  }
}
</style>
