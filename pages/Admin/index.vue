<template>
  <div>
    <ul class="list-unstyled m-0 p-0">
      <li v-for="(work, i) in items" :key="i" class="work-item py-2 border-top">
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
              <b-btn
                variant="outline-gray-dark mb-1"
                @click="
                  $router.push({
                    path: '/admin/update',
                    query: {
                      id: work.id,
                    },
                  })
                "
                >수정</b-btn
              >
              <b-btn variant="outline-red" @click="remove(work.id)">삭제</b-btn>
            </div>
          </b-col>
        </b-row>
      </li>
    </ul>
  </div>
</template>

<script>
import { getAllWorks, removeWork } from '~/plugins/firebase.js'
export default {
  layout: 'Dashboard',
  async asyncData() {
    const items = await getAllWorks()
    const categories = [...new Set(items.map((r) => r.exp))]
    // console.log('items:', items)
    return {
      items,
      categories,
    }
  },
  data() {
    return {
      items: [],
      categories: [],
      loading: false,
    }
  },
  methods: {
    async getWork(category) {
      this.loading = true
      this.items = await getAllWorks()
      this.categories = [...new Set(this.items.map((r) => r.exp))]
      this.loading = false
    },
    async remove(id) {
      const bool = await window.confirm('정말로 삭제하시겠습니까?')
      if (bool) {
        try {
          const removed = await removeWork(id)
          if (removed) {
            window.toast('삭제에 성공했습니다.')
            await this.getWork()
          }
        } catch (error) {
          window.toast('삭제에 실패했습니다.')
          console.error('error:', error)
        }
      }
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
}
</style>
