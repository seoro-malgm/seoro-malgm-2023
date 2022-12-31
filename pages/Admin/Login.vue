<template>
  <div class="min-vh-100">
    <b-container
      fluid
      class="min-vh-100 w-100 d-flex flex-column align-items-center justify-content-center"
    >
      <b-row align-h="center" class="w-100">
        <b-col cols="12" md="7" xl="4">
          <b-card class="bg-white w-100">
            <b-card-header
              header-bg-variant="white"
              header-border-variant="white"
              header-tag="header"
            >
              <b-card-title title-tag="h1" class="text-center">
                로그인
              </b-card-title>
            </b-card-header>
            <b-card-body>
              <b-form @submit.prevent="getAuth(form.email, form.password)">
                <b-form-group
                  label="이메일:"
                  label-for="email"
                  label-cols-sm="2"
                  label-align-sm="left"
                >
                  <b-form-input
                    id="email"
                    type="email"
                    v-model="form.email"
                    placeholder="이메일을 입력하세요"
                  />
                </b-form-group>
                <b-form-group
                  label="비밀번호:"
                  label-for="password"
                  label-cols-sm="2"
                  label-align-sm="left"
                >
                  <b-form-input
                    id="password"
                    v-model="form.password"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    autocomplete="on"
                  />
                </b-form-group>
                <b-row class="mt-5">
                  <b-col cols="12">
                    <b-btn
                      variant="primary w-100"
                      :disabled="
                        !form.email ||
                        form.email === '' ||
                        !form.password ||
                        form.password === ''
                      "
                      type="submit"
                      >로그인</b-btn
                    >
                  </b-col>
                </b-row>
              </b-form>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { login } from '~/plugins/firebase.js'

export default {
  layout: 'Fixed',
  data() {
    return {
      form: {
        email: null,
        password: null,
      },
    }
  },
  methods: {
    async getAuth(email, password) {
      try {
        const token = await login(email, password)
        if (token) {
          // 세션스토리지에 저장
          sessionStorage.setItem('seoro-malgm-token', token)
          // store에 저장
          this.$store.dispatch('setState', ['user', token])
          this.$router.push('/admin')
        }
      } catch (error) {
        console.error('error:', error)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
