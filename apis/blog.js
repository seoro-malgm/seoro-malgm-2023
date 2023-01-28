import { app } from '~/plugins/appConfig'

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

const db = getFirestore(app)

class blogAPI {
  // writing 전체 불러오기
  getAllWritings = async () => {
    try {
      const col = collection(db, 'writings')
      const snapshot = await getDocs(col)
      if (snapshot) {
        const writings = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          }
        })
        return writings.sort((a, b) => {
          return b.no - a.no
        })
      }
    } catch (error) {
      console.error('error::', error)
    }
  }

  // writing 디테일 불러오기
  getWriting = async (id) => {
    try {
      const col = doc(db, 'writings', id)
      const snapshot = await getDoc(col)
      if (snapshot) {
        return snapshot.data()
      }
    } catch (error) {
      console.error('error::', error)
    }
  }

  // writing 추가
  addWriting = async (data) => {
    const docRef = await addDoc(collection(db, 'writings'), data)
    console.log('docRef:', docRef)
    if (docRef?.id) {
      return docRef.id
    }
  }

  // writing 삭제
  removeWriting = async (id) => {
    if (!id) throw new Error('id가 없습니다')
    await deleteDoc(doc(db, 'writings', id))
    return true
  }

  // writing 수정
  updateWriting = async (id, data) => {
    await setDoc(doc(db, 'writings', id), data)
    return true
  }
}

export default new blogAPI()
