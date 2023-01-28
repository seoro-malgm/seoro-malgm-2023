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
// import firebase from '~/plugins/firebase'

export default {
  layout: 'Default',

  async asyncData({ app, $firebase }) {
    const items = await $firebase().getAllWorks()
    const categories = [...new Set(items.map((r) => r.exp))]
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
        color: $primary;
        background-color: #ededed;
        box-shadow: 4px 4px 12px rgba($color: #000000, $alpha: 0.09);
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
