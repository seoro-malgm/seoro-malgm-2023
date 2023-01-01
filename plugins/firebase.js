import { initializeApp, getApps } from 'firebase/app'
// auth
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
// firestore
import {
  getFirestore,
  doc,
  addDoc,
  getDoc,
  setDoc,
  getDocs,
  deleteDoc,
  collection,
} from 'firebase/firestore'
// storage
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'
const firebaseConfig = {
  apiKey: process?.env?.API_KEY,
  authDomain: process?.env?.AUTH_DOMAIN,
  databaseURL: process?.env?.DATABASE_URL,
  projectId: process?.env?.PROJECT_ID,
  storageBucket: process?.env?.STORAGE_BUCKET,
  messagingSenderId: process?.env?.MESSAGING_SENDER_ID,
  appId: process?.env?.APP_ID,
  measurementId: process?.env?.MEASUREMENT_ID || '',
}
// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((response) => {
      const user = response?.user
      if (user) {
        const { accessToken: token } = user
        // 리턴
        return token
      }
    })
    .catch((error) => {
      const errorCode = error.code
      console.log('errorCode:', errorCode)
      const errorMessage = error.message
      switch (errorCode) {
        case 'auth/user-not-found':
          window.toast(`존재하지 않는 계정입니다`, {
            toaster: 'b-toaster-bottom-center',
          })
          // window.alert('')
          break
        case 'auth/wrong-password':
          window.toast(`비밀번호를 다시 확인해주세요.`, {
            toaster: 'b-toaster-bottom-center',
          })
          break
        default:
          window.alert(`${errorCode} ::`, errorMessage)
          break
      }
      return
    })
}

const getImageURL = (file, type, path, fileName) => {
  // Upload file and metadata to the object 'images/mountains.jpg'
  const storage = getStorage()
  const storageRef = ref(storage, `${path}/${fileName}`, {
    contentType: type,
  })

  // 'file' comes from the Blob or File API
  return uploadBytes(storageRef, file).then((snapshot) => {
    console.log('snapshot.ref:', snapshot.ref)
    return getDownloadURL(snapshot.ref).then((url) => {
      return { name: snapshot.ref.name, url }
    })
  })
}
const deleteImage = (path) => {
  const storage = getStorage()
  let desertRef = ref(storage, path)
  deleteObject(desertRef)
}

const getAllWorks = async () => {
  try {
    const col = collection(db, 'works')
    const snapshot = await getDocs(col)
    if (snapshot) {
      const works = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        }
      })
      return works.sort((a, b) => {
        return b.createdAt - a.createdAt
      })
    }
  } catch (error) {
    console.error('error::', error)
  }
}

const getWork = async (id) => {
  try {
    const col = doc(db, 'works', id)
    const snapshot = await getDoc(col)
    if (snapshot) {
      return snapshot.data()
    }
  } catch (error) {
    console.error('error::', error)
  }
}

const addWork = async (data) => {
  const docRef = await addDoc(collection(db, 'works'), data)
  console.log('docRef:', docRef)
  if (docRef?.id) {
    return docRef.id
  }
}
const removeWork = async (id) => {
  if (!id) throw new Error('id가 없습니다')
  await deleteDoc(doc(db, 'works', id))
  return true
}

const updateWork = async (id, data) => {
  await setDoc(doc(db, 'works', id), data)
  return true
}

export {
  login,
  getImageURL,
  deleteImage,
  getAllWorks,
  getWork,
  addWork,
  removeWork,
  updateWork,
}
