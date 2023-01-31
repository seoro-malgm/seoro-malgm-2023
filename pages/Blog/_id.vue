<template>
  <div class="pt-4 pb-5 writing-wrapper">
    <template v-if="currentWriting">
      <header
        class="writing-header"
        v-if="currentWriting.thumbnailURL"
        :style="{ backgroundImage: `url(${currentWriting.thumbnailURL})` }"
      ></header>

      <article class="writing-desc">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-12 col-md-10 col-lg-9 px-0">
              <div class="d-flex align-items-center mb-3">
                <router-link
                  class="writing-category d-inline-block"
                  :to="{
                    path: '/blog',
                    query: {
                      category: currentWriting.category,
                    },
                  }"
                >
                  {{ categoryToText(currentWriting.category) }}
                </router-link>
                <div
                  class="d-flex align-items-center ml-auto position-relative"
                  id="viewer"
                >
                  <img
                    src="~/assets/icons/icon-eye.svg"
                    alt="조회수"
                    class="icon icon-16 m-0"
                  />
                  <small class="text-12 text-light ml-1">
                    {{ ccurrentWriting?.viewer + 1 || 0 }}
                  </small>
                </div>
              </div>
              <h1 class="writing-title my-0">
                {{ currentWriting.title }}
              </h1>
              <span class="writing-subtitle text-16 text-md-18 text-light">
                {{ currentWriting.subtitle }}
              </span>
            </div>
          </div>
          <hr />
          <div class="row justify-content-center pt-3 pt-mobile-5">
            <div class="col-12 col-md-10 col-lg-9 px-0 writing-text">
              <div v-html="currentWriting.desc"></div>
            </div>
          </div>
        </div>
      </article>

      <b-btn
        variant="secondary btn-util btn-go-top d-inline-flex align-items-center shadow"
        :class="{ active }"
        @click="goTop"
        aria-label="맨 위로 이동 버튼"
        aria-description="스크롤을 맨 위로 이동시키는 버튼입니다"
      >
        <icon-arr-top />
      </b-btn>
      <b-btn
        variant="secondary btn-util btn-copy d-inline-flex align-items-center shadow"
        :class="{ active }"
        @click="copyText('https://seoro-malgm.studio' + path)"
        aria-label="링크 복사 버튼"
        aria-description="현재 링크를 복사하는 이동시키는 버튼입니다"
      >
        <icon-link />
      </b-btn>
    </template>
    <template v-else>
      <Loading />
    </template>
    <b-tooltip target="viewer" placement="bottom" trigger="hover">
      조회수 : {{ currentWriting?.viewer + 1 || 0 }}
    </b-tooltip>
  </div>
</template>

<script>
// import { getWriting } from '~/plugins/firebase.js'
// import firebase from '~/plugins/firebase'
import { copyText } from '~/plugins/commons.js'

import categories from '~/utils/categories.json'

export default {
  layout: 'Fixed',

  head() {
    return {
      title: `${this.currentWriting.title} | 서로맑음 스튜디오`,
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: `${this.currentWriting.title} | 서로맑음 스튜디오`,
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
            ? `https://seoro-malgm.studio/blog/${this.id}`
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
      categories,
    }
  },
  computed: {
    path() {
      return this.$route.fullPath
    },
  },
  beforeMount() {
    // 스크롤 핸들러
    window.addEventListener('scroll', this.handleScroll)
  },
  mounted() {
    this.$firebase().addViewer('writings', this.id)
  },
  beforeDestroy() {
    if (this.path !== 'index') return
    // 스크롤 핸들러 해제
    window.removeEventListener('scroll', this.handleScroll)
  },

  methods: {
    categoryToText(value) {
      return this.categories.find((c) => c.value === value).text
    },
    goTop() {
      window.scrollTo(0, 0)
    },
    handleScroll() {
      this.active = !!(window.scrollY > 180)
    },
    copyText,
  },
}
</script>

<style lang="scss" scoped>
$ratio: 67vh;
$ratio-md: 45%;
.writing-header {
  position: fixed;
  width: 100vw;
  padding-bottom: $ratio;
  @media (min-width: 768px) {
    padding-bottom: $ratio-md;
  }
  top: 0;
  left: 0;
  z-index: -1;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: top center;
  background-size: auto cover;
  @media (min-width: 768px) {
    background-position: center center;
    background-size: cover;
  }
  &::after {
    position: fixed;
    content: '';
    top: 0;
    left: 0;
    width: 100vw;
    padding-bottom: $ratio;
    @media (min-width: 768px) {
      padding-bottom: $ratio-md;
    }
    background-color: rgba($color: #000000, $alpha: 0.2);
    z-index: 1;
  }
}
.writing-category {
  font-size: 13px;
  padding: 4px 10px;
  border-radius: 25rem;
  border: 1px solid $primary;
  text-decoration: none;
  // display: block;
  color: $primary;
}
.writing-title {
  font-weight: 700;
  // color: $primary;
  margin-bottom: 12px;
  margin-top: 8px;
}
.writing-subtitle {
  font-weight: 400;
}

.writing-desc {
  // width: 100vw;
  margin: 0 -1.5rem 0;
  padding: 4rem 1.5rem 200px;
  background-color: white;
  // position: absolute;
  // top: 67vh;
  margin-top: calc($ratio - 140px);
  min-height: calc(100vh + 140px);
  @media (min-width: 768px) {
    margin: calc($ratio-md - 125px) 2rem 0;
    min-height: calc(100vh + 200px);
    box-shadow: 0 0 32px rgba($color: #000000, $alpha: 0.2);
  }
  // left: 50%;
  // transform: translateX(-50%);
  font-size: 16px;
  line-height: 1.9;
  letter-spacing: -0.2px;
  z-index: 1;
}
.writing-title {
  margin-bottom: 2rem;
  font-size: 3rem;
  font-weight: 900;
  // color: $primary;
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
.work-desc::v-deep iframe {
  width: 100%;
  height: 560px;
}
@media all and (max-width: 768px) {
  .work-desc::v-deep iframe {
    height: 360px;
  }
}
.writing-desc::v-deep img {
  width: 100%;
  margin-bottom: 24px;
}
.writing-text::v-deep * {
  margin-bottom: 0;
  font-size: 16px;
  line-height: 1.7;
  color: $gray;
  word-break: keep-all;
  @media (min-width: 1024px) {
    font-size: 18px;
    line-height: 1.9;
  }
}
.writing-text::v-deep h2 {
  strong {
    font-size: 20px;
    line-height: 1.8;
    color: $gray;
    font-weight: 700;
    @media (min-width: 1024px) {
      font-size: 22px;
      line-height: 2;
    }
  }
}

.writing-text::v-deep h3 {
  strong {
    font-size: 18px;
    line-height: 1.8;
    color: $gray;
    font-weight: 700;
    @media (min-width: 1024px) {
      font-size: 20x;
      line-height: 2;
    }
  }
}
.writing-text::v-deep a {
  color: $gray;
  text-decoration: underline;
}

.btn-util {
  padding: 8px 8px;
  border-radius: 50%;
  background-color: $secondary;
  border-color: $secondary;
  position: fixed;
  transition: 0.3s;
  right: 1rem;
  z-index: 2010;
  font-size: 16px;
  display: flex;
}
.btn-go-top {
  bottom: -4rem;
}
.btn-go-top.active {
  bottom: 2rem;
}

.btn-copy {
  bottom: -4rem;
}
.btn-copy.active {
  bottom: 7rem;
}
</style>
