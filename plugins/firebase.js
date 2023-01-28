import authAPI from '~/apis/auth'
import worksAPI from '~/apis/works'
import storageAPI from '~/apis/storage'
import blogAPI from '~/apis/blog'

// export default { ...authAPI, ...worksAPI, ...storageAPI, ...blogAPI }

export default ({ app }, inject) => {
  // Inject $hello(msg) in Vue, context and store.
  inject('firebase', () => {
    return {
      ...authAPI,
      ...worksAPI,
      ...storageAPI,
      ...blogAPI,
    }
  })
}
