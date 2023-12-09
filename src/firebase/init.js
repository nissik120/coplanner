import { initializeApp } from 'firebase/app'
import { getFirestore }  from 'firebase/firestore'
import { getAuth }  from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDRqp4eZ1sWDrERrcVmQ62qNV88ZarARgI",
  authDomain: "collabora-961fc.firebaseapp.com",
  projectId: "collabora-961fc",
  storageBucket: "collabora-961fc.appspot.com",
  messagingSenderId: "179367425509",
  appId: "1:179367425509:web:1a46be044305e4a425eb0c",
  measurementId: "G-CR2W3H400C"
}

// init firebase
const app = initializeApp(firebaseConfig)

// init & export firestore and authentication services
export const db = getFirestore(app)

export const auth = getAuth(app)

export default {db, auth}