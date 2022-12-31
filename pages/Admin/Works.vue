<template>
  <div @mouseout="hovered = null">
    <ul class="list-unstyled m-0 p-0">
      <li
        v-for="(work, i) in items"
        :key="i"
        class="work-item py-2 border-top"
        @mouseenter="hovered = i"
        :class="{ active: hovered === i }"
      >
        <b-row align-v="center">
          <b-col cols="1" class="text-center">{{ work.no }}</b-col>
          <b-col cols="2">
            <img
              class="work-thumbnail"
              :src="work.thumbnailURL"
              :alt="`${work.title}, 썸네일 이미지`"
            />
          </b-col>
          <b-col cols="7">
            {{ work.title }}
          </b-col>
          <b-col cols="2">
            <div class="d-flex flex-column px-4">
              <b-btn variant="outline-gray-dark mb-1">수정</b-btn>
              <b-btn variant="outline-red">삭제</b-btn>
            </div>
          </b-col>
        </b-row>
      </li>
    </ul>
  </div>
</template>

<script>
import { db, getAllWorks } from '~/plugins/firebase.js'
export default {
  layout: 'Dashboard',
  nmae: 'Works',
  async asyncData() {
    const items = await getAllWorks()
    const categories = [...new Set(items.map((r) => r.exp))]
    // console.log('items:', items)
    return {
      items,
      categories,
    }
  },
  async mounted() {
    await this.getWork()
  },
  data() {
    return {
      hovered: null,
    }
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
.work-item {
  img.work-thumbnail {
    width: 100%;
    height: auto;
  }
  &.active {
    background-color: #eee;
  }
}
</style>
