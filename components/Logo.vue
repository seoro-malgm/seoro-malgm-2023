<template>
  <div class="logo-wrapper">
    <router-link to="/">
      <img
        class="logo eye"
        :src="require('~/assets/eye.svg')"
        alt="로고, 눈"
        :style="options.eye[gatherd ? 'gatherd' : 'scatterd']"
      />
    </router-link>
    <router-link to="/">
      <img
        class="logo text"
        :src="require('~/assets/text.svg')"
        alt="로고, Seoro-malgm Studio"
        :style="options.text[gatherd ? 'gatherd' : 'scatterd']"
      />
    </router-link>
    <router-link to="/">
      <img
        class="logo right-hand"
        :src="require('~/assets/right-hand.svg')"
        alt="로고, 오른손"
        :style="options.rightHand[gatherd ? 'gatherd' : 'scatterd']"
      />
    </router-link>
    <router-link to="/">
      <img
        class="logo left-hand"
        :src="require('~/assets/left-hand.svg')"
        alt="로고, 왼손"
        :style="options.leftHand[gatherd ? 'gatherd' : 'scatterd']"
      />
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    // 모일때, 모이지않을 때 토글
    gatherd: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      options: {
        eye: {
          gatherd: {
            top: '15px',
            left: '87px',
          },
          scatterd: {
            top: '16px',
            left: '50%',
            transfrom: 'translateX(-50%)',
          },
        },
        text: {
          gatherd: {
            top: '78px',
            left: '21px',
          },
          scatterd: {
            top: '16px',
            left: '16px',
            width: '130px',
          },
        },
        rightHand: {
          gatherd: {
            top: '148px',
            left: '16px',
          },
          scatterd: {
            top: 'calc(100% - 32px)',
            left: '16px',
            transfrom: 'translateY(-100%)',
          },
        },
        leftHand: {
          gatherd: {
            top: '107px',
            left: '154px',
          },
          scatterd: {
            top: '70%',
            left: 'calc(100% - 40px)',
            transfrom: 'translateX(-100%)',
          },
        },
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.logo {
  height: auto;
  position: fixed;
  transition: all 0.4s;
  z-index: 2000;
  animation-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
  &.eye {
    width: 74px;
    // max-width: 10vw;
  }
  &.text {
    width: 85px;
    // max-width: 24vw;
  }
  &.right-hand {
    width: 51px;
    // max-width: 8vw;
  }
  &.left-hand {
    width: 50px;
    // max-width: 8vw;
  }
}
</style>
