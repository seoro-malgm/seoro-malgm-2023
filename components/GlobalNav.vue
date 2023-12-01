<template>
  <nav id="global-nav">
    <client-only>
      <ul class="nav-list">
        <li
          class="list-item"
          v-for="(item, i) in links"
          :key="i"
          v-if="item.requireAuth ? auth : true"
        >
          <template v-if="item.type === 'anchor'">
            <a class="nuxt-link" :href="item.url" target="_blank">
              {{ item.name }}
              <div class="alarm-dot" v-if="item.isNew">new</div>
            </a>
          </template>
          <template v-else>
            <nuxt-link class="nuxt-link" :to="item.url" role="link">
              {{ item.name }}
              <div class="alarm-dot" v-if="item.isNew">new</div>
            </nuxt-link>
          </template>
        </li>
      </ul>
    </client-only>
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
          url: '/blog?category',
          // type: 'anchor',
        },
        {
          name: 'PRODUCTS',
          url: 'https://marpple.shop/kr/seoro_malgm',
          type: 'anchor',
          isNew: true,
        },
        {
          name: 'CONTACT',
          url: '/contact',
        },
        {
          name: 'LOGOUT',
          url: '/logout',
          requireAuth: true,
        },
      ],
    }
  },
  computed: {
    auth() {
      return this.$store.getters.getUser
    },
  },
}
</script>

<style lang="scss" scoped>
#global-nav {
  position: fixed;
  right: -1px;
  z-index: 2000;
  // @media (max-width: 1280px) {
  //   bottom: 0;
  // }
  // @media (min-width: 1280px) {
  top: 0;
  // }

  padding: 16px;
  .nav-list {
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    list-style: none;
    @media (max-width: 1280px) {
      padding-top: 4px;
      flex-direction: column;
      align-items: flex-end;
      .list-item {
        margin-bottom: 0.5rem;
      }
    }
    .list-item {
      &:not(:last-child) {
        @media (min-width: 1280px) {
          margin-right: 16px;
        }
      }
      .nuxt-link {
        background-color: transparent;
        position: relative;
        @media (max-width: 1280px) {
          font-size: 18px;
          padding: 4px 10px;
        }
        @media (min-width: 1280px) {
          font-size: 30px;
          padding: 8px 12px;
        }
        &.nuxt-link-exact-active,
        &.nuxt-link-active {
          background-color: $primary;
          color: #ededed;
          text-decoration: none;
        }
      }
    }
  }
}
.alarm-dot {
  top: -6px;
  right: -10px;
  @media (min-width: 1280px) {
    top: 2px;
    right: -8px;
  }
}
</style>
