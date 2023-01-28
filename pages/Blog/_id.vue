<template>
  <div class="pt-4 pb-5 writing-wrapper">
    <template v-if="currentWriting">
      <header class="writing-header">
        <div
          class="background-image"
          :style="{ backgroundImage: `url(${currentWriting.thumbnailURL})` }"
        />
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-12 col-md-10">
              <router-link
                class="writing-category"
                :to="{
                  path: '/blog',
                  query: {
                    category: currentWriting.category,
                  },
                }"
              >
                {{ currentWriting.category }}
              </router-link>
              <h1 class="writing-title">
                {{ currentWriting.title }}
              </h1>
              <span class="writing-subtitle">
                {{ currentWriting.subtitle }}
              </span>
            </div>
          </div>
        </div>
      </header>
      <!-- 
      <header class="mb-2">
       
      </header> -->
      <article class="writing-desc">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-12 col-md-10 writing-text">
              <div v-html="currentWriting.desc"></div>
            </div>
          </div>
        </div>
      </article>

      <b-btn
        variant="secondary btn-go-top d-inline-flex align-items-center shadow"
        :class="{ active }"
        @click="goTop"
        aria-label="맨 위로 이동 버튼"
        aria-description="스크롤을 맨 위로 이동시키는 버튼입니다"
      >
        <icon-arr-top />
      </b-btn>
    </template>
    <template v-else>
      <Loading />
    </template>
  </div>
</template>

<script>
// import { getWriting } from '~/plugins/firebase.js'
// import firebase from '~/plugins/firebase'

export default {
  layout: 'Fixed',
  async asyncData({ params, $firebase }) {
    const writings = await $firebase().getWriting(params.id)

    return {
      id: params.id,
      writings,
      currentWriting: writings,
    }
  },

  data() {
    return {
      active: false,
    }
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
    goTop() {
      window.scrollTo(0, 0)
    },
    handleScroll() {
      this.active = !!(window.scrollY > 180)
    },
  },

  head() {
    return {
      title: `${this.currentWriting.title}`,
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: `${this.currentWriting.title}`,
        },
        {
          hid: 'description',
          name: 'description',
          content: this.currentWriting.exp,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: `${this.currentWriting.title}`,
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: this.currentWriting.thumbnailURL,
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.currentWriting.txt,
        },
        {
          name: 'twitter:card',
          hid: 'twitter:card',
          content: '/og-image-221227-1.png',
        },
        {
          property: 'twitter:url',
          hid: 'twitter:url',
          content: this.id
            ? `https://seoro-malgm.studio/writing/${this.id}`
            : 'https://seoro-malgm.studio',
        },
        {
          name: 'twitter:title',
          hid: 'twitter:title',
          content: `${this.currentWriting.title}`,
        },
        {
          name: 'twitter:description',
          hid: 'twitter:description',
          content: this.currentWriting.exp,
        },
        {
          name: 'twitter:image',
          hid: 'twitter:image',
          content: this.currentWriting.thumbnailURL,
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.writing-header {
  position: relative;
  width: 100vw;
  height: 100vh;
  padding-bottom: 2rem;
  &::after {
    position: fixed;
    content: '';
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba($color: #000000, $alpha: 0.2);
    z-index: 1;
  }
  .background-image {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: -1;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
  }
  > .container {
    margin-top: 65vh;
    position: relative;
    z-index: 2;
  }

  .writing-category {
    font-size: 13px;
    padding: 4px 10px;
    border-radius: 25rem;
    border: 1px solid $primary;
    text-decoration: none;
    margin-bottom: 12px;
    // display: block;
  }
  .writing-title {
    font-weight: 700;
    color: $primary;
    margin-bottom: 12px;
    margin-top: 8px;
  }
  .writing-subtitle {
    font-weight: 400;
  }
}

.writing-desc {
  width: 100vw;
  padding: 4rem 1.5rem 200px;
  background-color: white;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  line-height: 1.9;
  letter-spacing: -0.2px;
  z-index: 10;
}
.writing-title {
  margin-bottom: 2rem;
  font-size: 3rem;
  font-weight: 900;
  color: $primary;
}
@media all and (max-width: 768px) {
  .writing-title {
    margin-bottom: 1.5rem;
    font-size: 2rem;
  }
  .writing-desc {
    padding-top: 2rem;
    font-size: 2rem;
  }
}

.writing-desc::v-deep p {
  margin: 0;
}
.writing-desc::v-deep iframe {
  width: 100%;
  height: calc(62vw / 16 * 9);
}
@media all and (max-width: 768px) {
  .writing-desc::v-deep iframe {
    height: 360px;
  }
}
.writing-desc::v-deep img {
  width: 100%;
  margin-bottom: 24px;
}
.writing-text::v-deep * {
  font-size: 15px;
  line-height: 1.8;
  color: $gray;
}
.writing-text::v-deep a {
  color: $gray;
  text-decoration: underline;
}

.btn-go-top {
  padding: 8px 8px;
  border-radius: 50%;
  background-color: $secondary;
  border-color: $secondary;
  display: flex;
  position: fixed;
  transition: 0.3s;
  right: 1rem;
  z-index: 2010;
  font-size: 16px;
}

.btn-go-top {
  bottom: -4rem;
}
.btn-go-top.active {
  bottom: 2rem;
}
</style>
