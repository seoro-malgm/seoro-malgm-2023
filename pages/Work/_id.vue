<template>
  <div class="pt-4 pb-5 work-wrapper">
    <template v-if="currentWork">
      <header class="mb-2">
        <b-btn
          variant="text mb-0 p-0 d-flex d-md-none text-primary d-inline-flex align-items-center"
          to="/"
        >
          <icon-arr-back /> <span class="ml-2 fw-700">GO BACK</span>
        </b-btn>
      </header>
      <b-row tag="section" class="pb-5 pb-md-0">
        <b-col cols="12" md="8" order="2" order-md="1">
          <div class="work-desc" v-html="currentWork.desc" />
        </b-col>
        <b-col cols="12" md="4" order="1" order-md="2">
          <h1 class="work-title">
            {{ currentWork.title }}
          </h1>
          <div class="work-text" v-html="currentWork.txt" />
        </b-col>
      </b-row>
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
import { getWork } from '~/plugins/firebase.js'

export default {
  layout: 'Fixed',
  async asyncData({ params }) {
    const works = await getWork(params.id)

    return {
      id: params.id,
      works,
      currentWork: works,
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
      title: `${this.currentWork.title}`,
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: `${this.currentWork.title}`,
        },
        {
          hid: 'description',
          name: 'description',
          content: this.currentWork.exp,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: `${this.currentWork.title}`,
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: this.currentWork.thumbnailURL,
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.currentWork.txt,
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
            ? `https://seoro-malgm.studio/work/${this.id}`
            : 'https://seoro-malgm.studio',
        },
        {
          name: 'twitter:title',
          hid: 'twitter:title',
          content: `${this.currentWork.title}`,
        },
        {
          name: 'twitter:description',
          hid: 'twitter:description',
          content: this.currentWork.exp,
        },
        {
          name: 'twitter:image',
          hid: 'twitter:image',
          content: this.currentWork.thumbnailURL,
        },
      ],
    }
  },
}
</script>

<style scoped>
.work-title {
  margin-bottom: 2rem;
  font-size: 3rem;
  font-weight: 900;
  color: #2f318e !important;
}
@media all and (max-width: 768px) {
  .work-title {
    margin-bottom: 1.5rem;
    font-size: 2rem;
  }
  .work-desc {
    padding-top: 2rem;
    font-size: 2rem;
  }
}

.work-desc /deep/ p {
  margin: 0;
}
.work-desc /deep/ iframe {
  width: 100%;
  height: calc(62vw / 16 * 9);
}
@media all and (max-width: 768px) {
  .work-desc /deep/ iframe {
    height: 360px;
  }
}
.work-desc /deep/ img {
  width: 100%;
  margin-bottom: 24px;
}

.work-text /deep/ * {
  font-size: 15px;
  line-height: 1.8;
  color: #2f318e !important;
}
.work-text /deep/ a {
  color: #888 !important;
  text-decoration: underline;
}

.btn-go-top {
  padding: 8px 8px;
  border-radius: 50%;
  background-color: #ededed !important;
  border-color: #ededed !important;
  display: flex;
  position: fixed;
  transition: 0.3s;
  right: 1rem;
  z-index: 2010;
  font-size: 16px;
}

@media (max-width: 1280px) {
  .btn-go-top {
    top: -4rem;
  }
  .btn-go-top.active {
    top: 1rem;
  }
}
@media (min-width: 1280px) {
  .btn-go-top {
    bottom: -4rem;
  }
  .btn-go-top.active {
    bottom: 2rem;
  }
}
</style>
