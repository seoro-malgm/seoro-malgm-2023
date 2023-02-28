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
  query,
  orderBy,
  updateDoc,
  increment,
} from 'firebase/firestore'

const db = getFirestore(app)

class worksAPI {
  // work 전체 불러오기
  getAllWorks = async () => {
    try {
      const col = collection(db, 'works')
      const q = query(col, orderBy('no', 'desc'))
      const snapshot = await getDocs(q)
      if (snapshot) {
        const works = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          }
        })
        return works
      }
    } catch (error) {
      console.error('error::', error)
    }
  }

  // work 디테일 불러오기
  getWork = async (id) => {
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

  // work 추가
  addWork = async (data) => {
    const docRef = await addDoc(collection(db, 'works'), data)
    // console.log('docRef:', docRef)
    if (docRef?.id) {
      return docRef.id
    }
  }

  // work 삭제
  removeWork = async (id) => {
    if (!id) throw new Error('id가 없습니다')
    await deleteDoc(doc(db, 'works', id))
    return true
  }

  // work 수정
  updateWork = async (id, data) => {
    await setDoc(doc(db, 'works', id), data)
    return true
  }

  // 조회수 추가
  addViewer = async (collection, id) => {
    const ref = doc(db, collection, id)
    const e = await updateDoc(ref, {
      viewer: increment(1),
    })
    // console.log('e:', e)
  }
}

export default new worksAPI()
