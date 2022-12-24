<template>
  <div>
    <!-- works -->
    <b-row tag="section" class="work-list">
      <b-col
        v-for="work in items"
        :key="work.no"
        cols="12"
        md="6"
        lg="4"
        class="work-item"
      >
        <figure class="work" @click="$router.push(`/work/${work.id}`)">
          <img :src="work.thumbnailURL" :alt="`${work.title}, 썸네일 이미지`" />
          <figcaption class="work-desc">
            <h6 class="mb-0">{{ work.title }}</h6>
            <span class="text-12 text-md-14">{{ work.exp }}</span>
          </figcaption>
        </figure>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { db, allWorks } from '~/plugins/firebase.js'

export default {
  layout: 'Default',
  async asyncData() {
    const items = await allWorks()
    const categories = [...new Set(items.map((r) => r.exp))]
    // console.log('items:', items)
    return {
      items,
      categories,
    }
  },
  data() {
    return {
      works: null,
      loading: true,
    }
  },
  async mounted() {
    await this.getWork()
  },
  methods: {
    async getWork(category) {
      this.loading = true
      if (category) {
        this.works = this.items.filter((r) => r.exp === category)
      } else {
        this.works = this.items
      }
      this.loading = false
    },
    getWorkLength(category) {
      return this.items.filter((r) => r.exp === category).length
    },
  },
}
</script>

<style lang="scss" scoped>
.work-list {
  .work-item {
    .work {
      width: 100%;
      position: relative;
      z-index: 1;
      img {
        width: 100%;
        height: auto;
        transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      .work-desc {
        // display: none;
        position: absolute;
        bottom: 8px;
        left: 8px;
        z-index: 10;
        padding: 16px;
        opacity: 0;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        color: #2f318e;
        background-color: #ededed;
        h6 {
          font-weight: 700;
          font-size: 18px;
        }

        @media (max-width: 1280px) {
          // display: block;
          padding: 8px;
          opacity: 1;
          bottom: unset;
          top: 8px;
          h6 {
            font-size: 14px;
          }
        }
      }
      &:hover {
        z-index: 2;
        cursor: pointer;
        img {
          transform: scale(1.08);
        }
        .work-desc {
          // display: block;
          opacity: 1;
        }
      }
    }
  }
}
</style>
