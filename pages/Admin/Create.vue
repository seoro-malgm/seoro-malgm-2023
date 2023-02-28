<template>
  <div class="px-4">
    <b-row>
      <b-col cols="4">
        <label for="thumbnail" class="input-thumbnail">
          <template v-if="pending.thumbnail">
            <div class="label-text">
              <b-spinner />
            </div>
          </template>
          <template v-else-if="!pending.thumbnail">
            <template v-if="form.thumbnailURL">
              <img :src="form.thumbnailURL" alt="새 썸네일" />
            </template>
            <template v-else>
              <span class="label-text"> 썸네일을 올려주세요 </span>
            </template>
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
            <b-form-input type="number" v-model.number="form.no" />
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

    <b-row class="py-2">
      <b-col cols="5">
        <client-only>
          <vue-editor
            useCustomImageHandler
            @image-added="onImageAdded"
            v-model="form.desc"
            @image-removed="onImageRemoved"
            placeholder="이미지, 영상들을 추가하세요"
          />
        </client-only>
      </b-col>
      <b-col cols="7">
        <client-only>
          <vue-editor v-model="form.txt" placeholder="텍스트를 입력하세요" />
        </client-only>
      </b-col>
    </b-row>
    <hr />
    <div class="mt-5">
      <h6 class="text-primary">데이터 미리보기</h6>
      <article class="code-preview">
        <pre
          >{{ form }}
        </pre>
      </article>
    </div>
    <b-row align-h="start" class="mt-3">
      <b-col cols="12" md="3">
        <template v-if="id">
          <b-btn variant="outline-primary w-100" @click="update">수정</b-btn>
        </template>
        <template v-else>
          <b-btn variant="outline-primary w-100" @click="submit">업로드</b-btn>
        </template>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { resize } from '~/plugins/commons.js'
// import firebase from '~/plugins/firebase'
// import { getImageURL, this.$firebase().deleteImage, addWork } from '~/plugins/firebase.js'

export default {
  layout: 'Dashboard',
  name: 'create',
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
      categories: ['BX', 'UI/UX', 'GRAPHIC', 'CALLIGRAPHY'],
      resize,
    }
  },
  computed: {
    id() {
      return this.$route.query?.id
    },
  },
  async mounted() {
    if (this.id) {
      await this.init(this.id)
    }
  },
  methods: {
    async init(id) {
      this.pending.init = true
      if (!id) {
        window.toast('잘못된 접근입니다')
        this.$router.push('/admin')
        return
      } else {
        try {
          const loadWork = await this.$firebase().getWork(id)
          if (loadWork) {
            // ref를 찾은 뒤에 form에 적용함
            this.form = {
              ...loadWork,
            }
            // 완료
            this.pending.init = false
          }
        } catch (error) {
          window.toast('잘못된 접근입니다')
          console.error('error:', error)
          this.$router.push('/admin')
        }
      }
    },
    // form 리셋
    reset() {
      const defaultForm = {
        no: 0,
        exp: null,
        workDate: null,
        party: '이상준',
        thumbnailURL: null,
        title: null,
        desc: null,
        txt: null,
        createdAt: null,
      }
      this.form = defaultForm
    },
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
        this.$firebase().deleteImage(`thumbnail/${this.form.thumbnail}`)
      }
      const type = file?.type.split('/').at(-1)
      // console.log('type:', type)
      const fileName = `thumbnail_${new Date().valueOf()}.${type}`
      // gif 이미지 업로드
      if (type === 'gif') {
        try {
          const uploadedFile = await this.$firebase().getImageURL(
            file,
            'thumbnail/gif/'
          )
          this.form.thumbnail = uploadedFile.name
          this.form.thumbnailURL = uploadedFile.url
          this.pending.thumbnail = false
        } catch (error) {
          window.toast('파일업로드 실패')
        }
      } else {
        // gif 이미지가 아닌 경우 파일 업로드
        // 가로 1000으로 리사이징하여 url 적용함
        this.resize.photo('w', file, 1000, 'object', async (result) => {
          const uploadedFile = await this.$firebase().getImageURL(
            result.blob,
            result.blob.type,
            'thumbnail',
            fileName
          )
          if (uploadedFile?.url) {
            this.form.thumbnail = uploadedFile.name
            this.form.thumbnailURL = uploadedFile.url
            this.pending.thumbnail = false
          }
        })
      }
    },
    async onImageAdded(file, Editor, cursorLocation, resetUploader) {
      // Vue editor 에서 제공하는 이미지핸들러
      const type = file.name.split('.').at(-1) // split으로 .을 기준으로 두번째 배열인 것을 가져옴, 파일이름은 제외하고 뒤의 확장자만 가져온다
      const fileName = `image_${new Date().valueOf()}.${type}` // 학장자를 가져오고 그 앞에 초단위의 날짜를 입력하여 이름이 중복되지 않게 한다
      // gif 이미지 업로드
      if (type === 'gif') {
        try {
          const uploadedFile = await this.$firebase().getImageURL(file, 'gif/')
          if (uploadedFile?.url) {
            Editor.insertEmbed(cursorLocation, 'image', uploadedFile.url) //업로드한 이미지를 에디터 안(커서로케이션)에 나타나게 한다
            resetUploader()
          }
        } catch (error) {
          window.toast('파일업로드 실패')
        }
      } else {
        this.resize.photo('w', file, 1200, 'object', async (result) => {
          const uploadedFile = await this.$firebase().getImageURL(
            result.blob,
            result.blob.type,
            'images',
            fileName
          )
          if (uploadedFile?.url) {
            Editor.insertEmbed(cursorLocation, 'image', uploadedFile.url) //업로드한 이미지를 에디터 안(커서로케이션)에 나타나게 한다
            resetUploader()
          }
        })
      }
    },
    // 이미지가 제거되었을 때 file의 url을 불러옴
    onImageRemoved(url) {
      this.$firebase().deleteImage(url)
    },
    // 업로드
    async submit() {
      this.form.createdAt = new Date()
      try {
        const id = await this.$firebase().addWork(this.form)
        if (id) {
          window.toast('업로드에 성공했습니다.')
          // this.reset()
          this.$router.push('/admin')
        }
      } catch (error) {
        window.toast('업로드에 실패했습니다.')
        console.error('error:', error)
      }
    },
    // 업데이트
    async update() {
      this.form.createdAt = new Date()
      try {
        const updated = await this.$firebase().updateWork(this.id, this.form)
        // console.log('updated:', updated)
        if (updated) {
          window.toast('수정에 성공했습니다.')
          // this.reset()
          this.$router.push('/admin')
        }
      } catch (error) {
        window.toast('수정에 실패했습니다.')
        console.error('error:', error)
      }
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
  .label-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.code-preview {
  width: 100%;
  max-height: 300px;
  padding: 16px;
  overflow-y: auto;
  background-color: #ededed;
}
</style>
