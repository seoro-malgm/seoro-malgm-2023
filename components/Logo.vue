<template>
  <div class="logo-wrapper">
    <client-only>
      <router-link to="/">
        <!-- <img
        class="logo eye"
        :src="require('~/assets/eye.svg')"
        alt="로고, 눈"
        :style="options.eye[gatherd ? 'gatherd' : 'scatterd']"
      /> -->
        <svg
          version="1.1"
          class="logo eye"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 74.8 80.9"
          style="enable-background: new 0 0 74.8 80.9"
          xml:space="preserve"
          :style="options.eye[gatherd ? 'gatherd' : 'scatterd']"
        >
          <g>
            <path
              class="st1"
              d="M69.4,48.1l-3.5,0l-2.3-0.4l-1.3-0.6l-1.6-0.3l-1.5-1l-2.1-0.9l-1.4-1l-1.5-1.5l-1.8-1.1l-1.3-2.3l-1.9-3
		l-0.5-1.3l-1.1-2l-0.4-1.9l-0.9-3.3l-0.1-2.4l0.8-1.6l0.3-1.2l0.7-1.8l2.1-2.6l1.4-0.9l3.1-0.1l1.8,0.7l1.6,0.8l1.5,0.9l1.2,0.8
		l1.6,1.2l1.4,1.9l2.5,1.6l1.1,1.3l1.8,2l1.3,2.6l0.5,1.2l0.8,1.5l2.8,6.4l0.4,2.4L73.4,45L72,47L69.4,48.1L69.4,48.1z M66.3,45.1
		h2.5l1.2-0.5l0.9-1.2l0.9-1.7l-0.2-1.1l-1-2.2l-1.7-3.8l-0.8-1.5l-0.5-1.2l-1-2.1l-2.4-2.7l-2.6-1.7l-1.5-2l-1.2-0.9l-1-0.7
		L56.5,21l-1.4-0.7l-1-0.4l-1.7,0l-0.2,0.2L50.6,22l-0.5,1.2l-0.3,1.3l-0.5,1.1l0,1.5l0.8,2.8l0.4,1.6l1.1,2l0.4,1.2l1.7,2.7
		l0.9,1.7l1.7,1.1l1.5,1.6l0.9,0.6l2.1,0.9L62,44l1.5,0.3l1.3,0.5L66.3,45.1L66.3,45.1z"
            />
            <path
              class="st1"
              d="M22.4,54.6l-2.6,0l-2.7-0.6l-2.8-0.8l-1.6-0.6L11,50.8l-2.7-1.2l-1.7-1.7l-0.9-1.7l-1.2-1.4L3,42.6l-1.4-2.8
		l-1.5-2.4L0,34.3l0.2-2.7l1-2.2l1.6-1.6l2.1-1.2l3.2-0.1l1.8,0.3l1.2,1l1.7,1.2l2.6,2.2l0.8,1l1.7,2.1l2.5,1.6l1.6,1.9l0.8,1.9
		l1.5,2.2l2.6,6.2l-0.8,2.7l-1.3,1.4L24.1,53L22.4,54.6L22.4,54.6z M20.2,51.7l0.9,0l0.7-0.7l0.6-0.8l0.9-1l0.3-1l-2.1-5L20,41
		l-0.7-1.6l-1-1.2l-2.5-1.6l-2.7-3.3l-2.2-1.8l-1.7-1.2l-0.6-0.5l-0.9-0.1l-2.1,0.1l-1.1,0.6l-0.9,0.9l-0.5,1.2L3,34.4l0.1,2.2
		l1.1,1.9l1.4,2.7L6.9,43l1.4,1.7l0.8,1.5l1,1l2.7,1.2l1.6,1.7l0.9,0.3l2.6,0.8L20.2,51.7L20.2,51.7z"
            />
            <polygon
              class="st1"
              points="33.5,80.8 31.6,80.9 29.8,80.2 28,78.7 26.5,77.2 24.7,77.6 24,73.1 24,71.1 24.4,68.3 25.4,66.5 
		26,65.6 26.3,63.1 29.3,63.5 28.9,66.7 27.9,68.1 27.3,69.3 26.9,71.4 27,73 27.1,74 27.2,74 28.8,75.3 30.1,76.5 31.4,77.5 
		32.2,77.9 33.5,77.8 	"
            />
            <polygon
              class="st1"
              points="46.1,22.4 43.1,22.4 42.9,17.5 45.2,13.7 46.8,10.8 48,9.3 50.2,7.1 52.1,5.9 54.9,4.2 58.7,2.9 
		60.5,2.1 65.1,1.2 67.3,1.1 72,0.1 73.7,0 73.8,3 72.2,3 67.6,4.1 65.3,4.2 61.3,5 59.7,5.7 56.1,7 52,9.6 50.2,11.3 49.2,12.6 
		47.8,15.2 46,18.3 	"
            />
          </g>
          <polygon
            class="st1 eye-right"
            :class="{ 'on-tracking': !gatherd }"
            :style="
              !gatherd
                ? {
                    transform: `translate(${eyePosition.left - 6}%, 
                  ${eyePosition.top - 8.5}%)`,
                  }
                : {}
            "
            points="54.5,31.4 56.8,29.6 60.9,30.6 63.2,33.2 65.9,38.5 66.3,40.9 66.4,42.9 66.3,44.1 65.2,45 63.9,45.7 
	61.9,45.7 56.3,41.5 55.1,39.9 54.2,38 53,36.2 52.7,34.4 52.8,32.9 53.2,32.2 53.8,31.5 "
          />
          <polygon
            class="st1 eye-left"
            :class="{ 'on-tracking': !gatherd }"
            :style="
              !gatherd
                ? {
                    transform: `translate(${eyePosition.left - 7.5}%, 
                  ${eyePosition.top - 9.3}%)`,
                  }
                : {}
            "
            points="21.4,52.1 19.2,54.2 15.1,53.5 12.6,51.1 9.3,46.1 8.6,43.8 8.4,41.8 8.4,40.6 9.4,39.6 10.6,38.8 
	12.6,38.5 18.6,42.2 19.9,43.7 21.1,45.5 22.4,47.1 22.9,49 22.9,50.4 22.6,51.2 22.1,51.9 "
          />
        </svg>
      </router-link>
      <router-link to="/">
        <img
          class="logo text"
          :src="require('~/assets/text.svg')"
          alt="로고, Seoro-malgm Studio"
          :style="options.text[gatherd ? 'gatherd' : 'scatterd']"
        />
      </router-link>
      <!-- <router-link to="/"> -->
      <img
        class="logo right-hand"
        :src="require('~/assets/right-hand.svg')"
        alt="로고, 오른손"
        :style="options.rightHand[gatherd ? 'gatherd' : 'scatterd']"
      />
      <!-- </router-link> -->
      <!-- <router-link to="/"> -->
      <img
        class="logo left-hand"
        :src="require('~/assets/left-hand.svg')"
        alt="로고, 왼손"
        :style="options.leftHand[gatherd ? 'gatherd' : 'scatterd']"
      />
      <!-- </router-link> -->
    </client-only>
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
  mounted() {
    this.pageSize = {
      width: window?.innerWidth,
      height: window?.innerHeight,
    }
    // 마우스 핸들러
    window.addEventListener('mousemove', this.onMouseMove)
  },
  beforeDestroy() {
    // 마우스 핸들러 해제
    window.removeEventListener('mousemove', this.onMouseMove)
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
            width: '142px',
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
      pageSize: {
        width: 0,
        height: 0,
      },
      mousePosition: {
        x: 0,
        y: 0,
      },
    }
  },
  computed: {
    eyePosition() {
      const { x, y } = this.mousePosition
      const { width, height } = this.pageSize
      return {
        top: (y / height) * 10,
        left: (x / width) * 10,
      }
    },
  },
  methods: {
    onMouseMove(e) {
      // console.log('e:', e)
      this.mousePosition = {
        x: e.x,
        y: e.y,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.logo {
  height: auto;
  position: fixed;
  transition: all 0.4s;
  z-index: 2030;
  animation-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
  &.eye {
    width: 74px;
    // max-width: 10vw;
  }
  &.text {
    width: 88px;
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

.st1 {
  fill: #2f318e;
}
// .eye-left,
// .eye-right {
//   transition: all 0.1s;
// }
</style>
