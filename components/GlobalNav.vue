<template>
  <nav id="global-nav">
    <ul class="nav-list">
      <li class="list-item" v-for="(item, i) in links" :key="i">
        <template v-if="item.type === 'anchor'">
          <a class="nuxt-link" :href="item.url" target="_blank">
            {{ item.name }}</a
          >
        </template>
        <template v-else>
          <nuxt-link class="nuxt-link" :to="item.url" role="link">
            {{ item.name }}
          </nuxt-link>
        </template>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      links: [
        // {
        //   name: 'WORKS',
        //   url: '/work',
        // },
        {
          name: 'BLOG',
          url: 'https://brunch.co.kr/@seoro-malgm',
          type: 'anchor',
        },
        {
          name: 'PRODUCTS',
          url: 'https://marpple.shop/kr/seoro_malgm',
          type: 'anchor',
        },
        {
          name: 'CONTACT',
          url: '/contact',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
#global-nav {
  position: fixed;
  right: 0;
  z-index: 2000;
  @media (max-width: 1280px) {
    bottom: 0;
  }
  @media (min-width: 1280px) {
    top: 0;
  }

  padding: 16px;
  .nav-list {
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    list-style: none;
    .list-item {
      &:not(:last-child) {
        @media (max-width: 1280px) {
          margin-right: 8px;
        }
        @media (min-width: 1280px) {
          margin-right: 16px;
        }
      }
      .nuxt-link {
        background-color: #ededed;
        @media (max-width: 1280px) {
          font-size: 14px;
          padding: 2px 4px;
        }
        @media (min-width: 1280px) {
          font-size: 16px;
          padding: 4px 8px;
        }
        &.nuxt-link-exact-active,
        &.nuxt-link-active {
          background-color: #2f318e;
          color: #ededed;
          text-decoration: none;
        }
      }
    }
  }
}
</style>
