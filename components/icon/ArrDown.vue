<template>
  <div class="icon icon-arr-top icon-40">
    <img
      class="icon-image"
      :src="require('/assets/arr-up-finger.svg')"
      alt="위로"
    />
  </div>
</template>

<script>
export default {
  name: 'IconArrDown',
}
</script>

<style lang="scss" scoped>
.icon-image {
  transform: rotate(-180deg);
}
</style>
