<template>
  <div>
    <b-row class="mb-4">
      <b-col cols="1">
        <b-form-input type="number" v-model="form.no" />
      </b-col>
      <b-col cols="2">
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
        <b-form-datepicker id="example-i18n-picker" v-model="form.workDate" />
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
    </b-row>
    <b-row class="mb-4">
      <b-col cols="3">
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
      <b-col cols="9">
        <b-input-group>
          <b-input-group-append>
            <span class="py-2 px-3">제목: </span>
          </b-input-group-append>
          <b-form-input v-model="form.title" placeholder="제목을 입력하세요" />
        </b-input-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="4"> 왼쪽내용, form.desc </b-col>
      <b-col cols="8"> 오른쪽 내용, form.txt </b-col>
    </b-row>
  </div>
</template>

<script>
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
    }
  },
  methods: {
    // 썸네일 업로드
    uploadThumbnail(e) {
      // 초기화
      this.form.thumbnailURL = null
      // pending 시작
      this.pending.thumbnail = true
      const file = e.target.files[0]
      this.getImageURL(file)
    },
    // 이미지 업로드하여 url 얻기
    getImageURL(file) {
      console.log('file:', file)
      const url = 'asd'
      return url
    },
  },
}
</script>

<style lang="scss" scoped>
.input-thumbnail {
  width: 100%;
  padding: 3rem;
  border-radius: 14px;
  border: 1px solid #eee;
  background-color: #ededed;
  text-align: center;
}
</style>
