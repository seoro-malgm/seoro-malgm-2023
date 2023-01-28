<template>
  <div>
    <ul class="list-unstyled m-0 p-0">
      <li
        v-for="(writing, i) in items"
        :key="i"
        class="writing-item py-2 border-top"
      >
        <b-row align-v="center">
          <b-col cols="1" class="text-center">{{ writing.no }}</b-col>
          <b-col cols="2">
            <img
              class="writing-thumbnail"
              :src="writing.thumbnailURL"
              :alt="`${writing.title}, 썸네일 이미지`"
            />
          </b-col>
          <b-col cols="7">
            {{ writing?.title }}
          </b-col>
          <b-col cols="2">
            <div class="d-flex flex-column px-4">
              <b-btn
                variant="outline-gray-dark mb-1"
                @click="
                  $router.push({
                    path: '/admin/write',
                    query: {
                      id: writing.id,
                    },
                  })
                "
                >수정</b-btn
              >
              <b-btn variant="outline-red" @click="remove(writing.id)"
                >삭제</b-btn
              >
            </div>
          </b-col>
        </b-row>
      </li>
    </ul>
  </div>
</template>

<script>
// import firebase from '~/plugins/firebase'

export default {
  layout: 'Dashboard',
  name: 'writings',
  async asyncData({ $firebase }) {
    const items = await $firebase().getAllWritings()
    // const categories = [...new Set(items.map((r) => r.category))]
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
    async getWriting(category) {
      this.loading = true
      this.items = await this.$firebase().getAllWritings()
      // this.categories = [...new Set(this.items.map((r) => r.category))]
      this.loading = false
    },
    async remove(id) {
      const bool = await window.confirm('정말로 삭제하시겠습니까?')
      if (bool) {
        try {
          const removed = await this.$firebase().removeWriting(id)
          if (removed) {
            window.toast('삭제에 성공했습니다.')
            await this.getWriting()
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
.writing-item {
  img.writing-thumbnail {
    width: 100%;
    height: auto;
  }
}
</style>
