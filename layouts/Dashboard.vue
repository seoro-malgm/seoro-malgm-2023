<template>
  <div id="app">
    <header>
      <!-- 로고 -->
      <Logo :gatherd="false" />
      <global-nav />
    </header>
    <main id="main" class="container-fluid">
      <template v-if="!auth">
        <div class="text-center my-5 py-5">
          <b-spinner variant="primary" large />
        </div>
      </template>
      <template v-else>
        <b-row
          align-v="stretch"
          :style="{ minHeight: '800px', maxHeight: '800px' }"
        >
          <b-col cols="2">
            <ul class="list-unstyled m-0 p-0">
              <li class="m-0" v-for="(tab, i) in tabs" :key="i">
                <template v-if="!tab.hidden">
                  <b-btn
                    :variant="tab.name === path ? 'primary' : 'secondary'"
                    class="p-3 w-100 text-left"
                    @click="changeTab(tab.url, tab.name)"
                  >
                    {{ tab.text }}
                  </b-btn>
                </template>
              </li>
            </ul>
          </b-col>
          <b-col cols="10">
            <section
              class="bg-white w-100 h-100 rounded-lg p-3 position-relative"
              :style="{ overflowY: 'auto', maxHeight: '800px' }"
            >
              <header
                class="bg-white p-3 position-absolute w-100"
                :style="{ top: '0', left: '0' }"
              >
                <h2 class="text-primary">
                  {{ currentTab.text }}
                </h2>
              </header>
              <article class="mt-5 py-5">
                <Nuxt />
              </article>
            </section>
          </b-col>
        </b-row>
      </template>
    </main>
  </div>
</template>

<script>
export default {
  layout: 'Fixed',
  name: 'Dashboard',
  data() {
    return {
      tabIndex: 'Admin',
      tabs: [
        {
          text: '프로젝트 목록',
          url: '',
          name: 'Admin',
        },
        {
          text: '프로젝트 수정',
          url: 'update',
          name: 'Admin-Update',
          hidden: true,
        },
        {
          text: '새 프로젝트',
          url: 'create',
          name: 'Admin-Create',
        },
      ],
    }
  },
  computed: {
    auth() {
      return this.$store.getters.getUser
    },
    path() {
      return this.$route.name
    },
    currentTab() {
      return this.tabs.find((t) => t.name === this.path)
    },
  },
  methods: {
    checkAuth() {
      if (!this.auth) {
        // 세션스토리지 재확인
        const token = sessionStorage.getItem('seoro-malgm-token')
        if (token) {
          // store에 저장
          this.$store.dispatch('setState', ['user', token])
        } else {
          this.$router.push('/admin/login')
        }
      }
    },
    changeTab(url, name) {
      this.$router.push(`/admin/${url}`)
      this.tabIndex = name
    },
    async toast(
      msg,
      opt = {
        id: 'toast',
        variant: 'primary',
        textVariant: 'white',
      }
    ) {
      const h = this.$createElement

      const bodyNode = h('div', {
        class: 'px-2',
        domProps: {
          innerHTML: `
          <div class="text-${opt.textVariant}">
            <span class="text-13 fw-500">${msg}</span>
          </div>
          `,
        },
      })

      this.$bvToast.toast(bodyNode, {
        solid: true,
        noCloseButton: true,
        headerClass: `bg-${opt.variant} p-0 border-0 text-white fw-600`,
        bodyClass: `bg-${opt.variant} py-3 border-0 rounded text-white fw-600`,
        toastClass: 'border-0  pt-0',
        toaster: 'b-toaster-bottom-center',
      })
    },
  },
  mounted() {
    this.checkAuth()
    window.toast = this.toast
  },
}
</script>

<style lang="scss" scoped>
#app {
  padding: 16px 0;
  #main {
    padding-top: 100px;
  }
}
</style>
