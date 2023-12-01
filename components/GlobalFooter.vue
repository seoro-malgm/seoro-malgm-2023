<template>
  <footer id="gnf">
    <div class="footer-container">
      <client-only>
        <h1 class="fw-700 mb-2 text-20 text-primary">CONTACT US</h1>
        <ul class="list-unstyled m-0 p-0">
          <li class="mb-2">
            <span class="text-14 text-md-16 text-primary"
              >Email:
              <a
                role="button"
                @click="copyText($store.state.email, '이메일주소가')"
                >{{ $store.state.email }}
              </a>
            </span>
          </li>
          <!-- <li class="mb-2">
            <span class="text-14 text-md-16 text-primary"
              >Address:
              <a
                role="button"
                @click="
                  copyText('대한민국 서울시 마포구 성산로 4길 54-11 ', '주소')
                "
                >서울시 마포구 성산로 4길 54-11
              </a>
            </span>
          </li> -->
          <li class="mb-2">
            <b-btn
              variant="link p-0 text-14 text-md-16"
              :href="$store.state.instagram"
              target="_blank"
              >Instagram</b-btn
            >
          </li>
          <li class="mb-2">
            <b-btn
              variant="link  p-0 text-14 text-md-16"
              :href="$store.state.brunch"
              target="_blank"
              >Brunch</b-btn
            >
          </li>
        </ul>
      </client-only>
    </div>
  </footer>
</template>

<script>
import { copyText } from '~/plugins/commons.js'
export default {
  methods: {
    copyText,
  },
}
</script>

<style lang="scss" scoped>
#gnf {
  padding-top: 320px;
  padding: 16px 32px 0;
  .footer-container {
    background-color: $secondary;
    min-width: 320px;
    padding: 1rem;
    width: 320px;
    max-width: 90vw;
    box-shadow: 0px 0px 10px rgba($color: #000000, $alpha: 0.2);
    border-radius: 1rem;
    // left: 24px;
    // bottom: 16px;
  }
}
</style>
