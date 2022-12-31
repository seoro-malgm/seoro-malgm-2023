<template>
  <div class="px-4">
    <b-row>
      <b-col cols="4">
        <label for="thumbnail" class="input-thumbnail">
          <template v-if="pending.thumbnail">
            <b-spinner />
          </template>
          <template v-else-if="!pending.thumbnail">
            <template v-if="form.thumbnailURL">
              <img :src="form.thumbnailURL" alt="새 썸네일" />
            </template>
            <template v-else> 썸네일을 올려주세요 </template>
          </template>
        </label>
        <input
          type="file"
          id="thumbnail"
          @change="uploadThumbnail"
          accept=".png, .jpg, .jpeg, .gif"
          class="d-none"
        />
      </b-col>
      <b-col cols="8">
        <b-row class="mb-4">
          <b-col cols="2">
            <b-form-input type="number" v-model="form.no" />
          </b-col>
          <b-col cols="3">
            <b-form-select v-model="form.exp">
              <b-form-select-option :value="null" disabled>
                종류
              </b-form-select-option>
              <b-form-select-option
                v-for="(option, i) in categories"
                :key="i"
                :value="option"
              >
                {{ option }}
              </b-form-select-option>
            </b-form-select>
          </b-col>
          <b-col cols="3">
            <b-form-datepicker
              :date-format-options="{
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
              }"
              v-model="form.workDate"
            />
          </b-col>
          <b-col cols="4">
            <b-input-group>
              <b-input-group-append>
                <span class="py-2 px-3">작업자: </span>
              </b-input-group-append>
              <b-form-input
                type="text"
                v-model="form.party"
                placeholder="작업자를 입력하세요"
              />
            </b-input-group>
          </b-col>
          <b-col cols="12" class="mt-4">
            <b-input-group>
              <b-input-group-append>
                <span class="py-2 px-3">제목: </span>
              </b-input-group-append>
              <b-form-input
                v-model="form.title"
                placeholder="제목을 입력하세요"
              />
            </b-input-group>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <b-row class="mb-2">
      <b-col cols="3"> </b-col>
      <!-- <b-col cols="9">
        <b-input-group class="mb-4">
          <b-input-group-append>
            <span class="py-2 px-3">제목: </span>
          </b-input-group-append>
          <b-form-input v-model="form.title" placeholder="제목을 입력하세요" />
        </b-input-group>
      </b-col> -->
    </b-row>

    <b-row class="py-2">
      <b-col cols="5"> 왼쪽내용, form.desc </b-col>
      <b-col cols="7"> 오른쪽 내용, form.txt </b-col>
    </b-row>
    <hr />
    <b-row align-h="start" class="my-5 py-5">
      <b-col cols="12" md="3">
        <b-btn variant="outline-primary w-100">업로드</b-btn>
      </b-col>
    </b-row>
    <!-- <pre
      style="
        position: fixed;
        bottom: 0;
        right: 0;
        z-index: 3000;
        background-color: #ededed;
        padding: 0.5rem;
        width: 300px;
        height: 500px;
        overflow-y: scroll;
        font-size: 14px;
        line-height: 17px;
        color: #000;
        text-align: left;
      "
    >
    form: {{ form }}
    </pre> -->
  </div>
</template>

<script>
import { resize } from '~/plugins/commons.js'
import { getImageURL, deleteImage } from '~/plugins/firebase.js'
export default {
  layout: 'Dashboard',
  nmae: 'Create',
  data() {
    return {
      pending: {
        thumbnail: false,
      },
      form: {
        no: 0,
        exp: null,
        workDate: null,
        party: '이상준',
        thumbnailURL: null,
        title: null,
        desc: null,
        txt: null,
        createdAt: null,
      },
      categories: ['BX', 'UI/UX', 'POSTER', 'CALLIGRAPHY'],
      resize,
    }
  },
  mounted() {
    // console.log('onResize:', this.resize)
  },
  methods: {
    // 썸네일 업로드
    async uploadThumbnail(e) {
      const file = e.target.files[0]
      if (!file) return
      // 초기화
      this.form.thumbnailURL = null
      // pending 시작
      this.pending.thumbnail = true
      // 이미 올린 썸네일이 있으면 그건 삭제함
      if (this.form.thumbnail) {
        deleteImage(`thumbnail/${this.form.thumbnail}`)
      }
      const type = file?.type.split('/').at(-1)
      // todo : gif 이미지 업로드 테스트
      // if (type === 'gif') {
      //   try {
      //     const url = await getImageURL(file, 'thumbnail/')
      //     console.log('url:', url)
      //   } catch (error) {
      //     window.toast('파일업로드 실패')
      //   }
      // } else {
      // gif 이미지가 아닌 경우 파일 업로드
      // 가로 1200으로 리사이징하여 url 적용함
      this.resize.photo('w', file, 1200, 'object', async (result) => {
        const uploadedFile = await getImageURL(
          result.blob,
          result.blob.type,
          'thumbnail'
        )
        if (uploadedFile?.url) {
          this.form.thumbnail = uploadedFile.name
          this.form.thumbnailURL = uploadedFile.url
          this.pending.thumbnail = false
        }
      })
      // }
    },
  },
}
</script>

<style lang="scss" scoped>
.input-thumbnail {
  width: 100%;
  padding: 3rem 3rem 49%;
  border-radius: 14px;
  border: 1px solid #eee;
  background-color: #ededed;
  text-align: center;
  position: relative;
  img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
