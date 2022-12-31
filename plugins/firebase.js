import { initializeApp, getApps } from 'firebase/app'
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
} from 'firebase/firestore'

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAyJHtWMjG-0UJsWiVCUrKSRLUeqwAzhxI',
  authDomain: 'seoro-malgm.firebaseapp.com',
  databaseURL: 'https://seoro-malgm.firebaseio.com',
  projectId: 'seoro-malgm',
  storageBucket: 'seoro-malgm.appspot.com',
  messagingSenderId: '158099597201',
  appId: '1:158099597201:web:4a9cd2142b89e1a301dc30',
  measurementId: 'G-R7FYNEMFH4',
}
// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

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

export { db, getAllWorks, getWork, login }
