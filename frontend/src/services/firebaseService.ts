import { initializeApp } from 'firebase/app'

const config = {
  apiKey: 'xxx',
  authDomain: 'xxx.firebaseapp.com',
  databaseURL: 'https://xxx.firebaseio.com',
  projectId: 'xxx',
  storageBucket: 'xxx.appspot.com',
  messagingSenderId: 'xxx',
  appId: 'xxx'
}

const firebaseApp = initializeApp(config)

export default firebaseApp
