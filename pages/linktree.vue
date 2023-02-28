<template>
  <b-container fluid class="py-5">
    <header class="header">
      <h1 class="logo">
        <img :src="require('@/assets/logo-normal.svg')" alt="" />
      </h1>
    </header>
    <section>
      <ul class="link-list">
        <li v-for="(item, i) in links" :key="i" class="list-item">
          <a
            :href="item.url"
            target="_blank"
            class="btn btn-lightest text-primary py-3 w-100"
          >
            {{ item.text }}
          </a>
        </li>
        <li class="list-item">
          <div class="d-flex align-items-center">
            <span class="text-nowrap mr-2">Email :</span>
            <button
              class="btn btn-link p-0"
              @click="copyText($store.state.email, '이메일주소가')"
            >
              seoromalgm@gmail.com
            </button>
          </div>
        </li>
      </ul>
    </section>
  </b-container>
</template>

<script>
import { copyText, onResize } from '~/plugins/commons.js'
export default {
  layout: 'Empty',
  data() {
    return {
      links: [
        {
          text: '💻 포트폴리오 웹사이트',
          url: this.$store.state.website,
        },
        {
          text: '✏️ 브런치 블로그',
          url: this.$store.state.brunch,
        },
        {
          text: '🌌 인스타그램',
          url: this.$store.state.instagram,
        },
      ],
    }
  },
  methods: {
    copyText,
  },
}
</script>

<style lang="scss" scoped>
.header {
  text-align: center;
  .logo {
    width: 300px;
    max-width: 50vw;
    img {
      width: 100%;
    }
  }
}

.link-list {
  list-style: none;
  margin: 0;
  padding: 0 0 40px;
  .list-item {
    margin-bottom: 16px;
    .btn {
    }
  }
}
</style>
