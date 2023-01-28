<template>
  <div class="container py-5">
    <header class="mb-4">
      <h1 class="fw-700 mb-2 mb-md-4 text-20 text-md-40 text-primary">BLOG</h1>
      <ul class="category-list">
        <client-only>
          <li class="category-item" v-for="(item, i) in categories">
            <router-link
              class="category-link"
              :to="{
                path: '/blog',
                query: {
                  category: item,
                },
              }"
            >
              {{ item }}
            </router-link>
          </li>
        </client-only>
      </ul>
    </header>
    <client-only>
      <ul class="list-unstyled m-0 p-0">
        <li
          v-for="(writing, i) in itemFilterd"
          :key="i"
          class="writing-item py-2 border-top"
          @click="$router.push(`/blog/${writing.id}`)"
        >
          <b-row align-v="start">
            <b-col cols="4" md="3" lg="2">
              <div class="bg-img ratio-90">
                <img
                  class="writing-thumbnail"
                  :src="writing.thumbnailURL"
                  :alt="`${writing.title}, 썸네일 이미지`"
                />
              </div>
            </b-col>
            <b-col cols="8" md="9" lg="10">
              <div class="writing-info my-2">
                <router-link
                  class="writing-category"
                  :to="{
                    path: '/blog',
                    query: {
                      category: writing.category,
                    },
                  }"
                >
                  {{ writing.category }}
                </router-link>
                <div class="title">
                  <h6 class="writing-title">
                    {{ writing.title }}
                  </h6>
                </div>

                <span class="writing-subtitle">
                  {{ writing.subtitle }}
                </span>

                <div class="writing-desc">
                  <p class="text-truncate line-2 mb-0" v-html="writing.desc" />
                </div>

                <div class="d-flex align-items-center mt-2">
                  <small class="text-light me-3">
                    {{ writing.date }}
                  </small>
                  <!-- <small class="text-light"> 조회수 {{ writing.date }} </small> -->
                </div>
              </div>
            </b-col>
          </b-row>
        </li>
      </ul>
    </client-only>
    <div class="pt-3 border-top">
      <b-btn
        variant="link p-0 text-16 mt-n1"
        href="https://brunch.co.kr/@seoro-malgm"
        target="_blank"
      >
        Brunch 블로그 </b-btn
      >에서도 글들을 볼 수 있습니다.
    </div>
  </div>
</template>

<script>
// import firebase from '~/plugins/firebase'

export default {
  layout: 'Fixed',
  name: 'writings',
  async asyncData({ app, $firebase }) {
    const items = await $firebase().getAllWritings()
    // const categories = [...new Set(items.map((r) => r.exp))]
    // console.log('items:', items)
    return {
      items,
      // categories,
    }
  },
  data() {
    return {
      items: [],
      categories: [
        '전체',
        '디자인과 개발 이야기',
        '지방으로 이주한 디자이너',
        '일상적 UX',
        '에세이',
        '기타',
      ],
      loading: false,
    }
  },
  computed: {
    categorySelected() {
      return this.$route.query?.category
    },
    itemFilterd() {
      return this.categorySelected
        ? this.items.filter((item) => item.category === this.categorySelected)
        : this.items
    },
  },
  methods: {
    async getWriting(category) {
      this.loading = true
      this.items = await this.$firebase().getAllWritings()
      // this.categories = [...new Set(this.items.map((r) => r.category))]
      this.loading = false
    },
  },
}
</script>

<style lang="scss" scoped>
.writing-item {
  img.writing-thumbnail {
    width: 100%;
    height: auto;
  }
  &:hover {
    cursor: pointer;
    .writing-title {
      // text-de
      &::after {
        width: 100%;
      }
    }
  }
}

.writing-info {
  .writing-category {
    font-size: 13px;
    padding: 4px 10px;
    border-radius: 25rem;
    border: 1px solid $primary;
    text-decoration: none;
    margin-bottom: 8px;
    display: inline-block;
    color: $primary;
  }
  .writing-title {
    font-weight: 700;
    font-size: 18px;
    color: $primary;
    margin-bottom: 8px;
    position: relative;
    display: inline-flex;
    &::after {
      position: absolute;
      content: '';
      top: 8px;
      left: 0;
      width: 0%;
      height: 14px;
      background-color: rgba($color: $primary, $alpha: 0.2);
      z-index: -1;
      transition: width 0.4s cubic-bezier(0.39, 0.575, 0.565, 1);
    }
  }
  .writing-subtitle {
    font-size: 15px;
    font-weight: 400;
  }

  .writing-desc::v-deep p {
    font-size: 14px;
    margin-top: 2px;
    color: $light;
  }
}

.category-list {
  list-style: none;
  display: inline-flex;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
  .category-item {
    margin-right: 16px;
    font-size: 13px;
    margin-bottom: 8px;
    display: inline-block;
    width: nowrap;
    .category-link {
      border-radius: 25rem;
      padding: 4px 10px;
      border: 1px solid $primary;
      color: $primary;
      text-decoration: none;
      &.nuxt-link-exact-active {
        background-color: $primary;
        color: white;
      }
    }
  }
}
</style>
