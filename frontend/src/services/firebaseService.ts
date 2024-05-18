import { initializeApp } from 'firebase/app'

const config = {
  apiKey: 'AIzaSyDM0KNoknrjqONxP75EJ1EACnFC7Ub0l-k',
  authDomain: 'teste-fcm-2022.firebaseapp.com',
  databaseURL: 'https://teste-fcm-2022.firebaseio.com',
  projectId: 'teste-fcm-2022',
  storageBucket: 'teste-fcm-2022.appspot.com',
  messagingSenderId: '813480984136',
  appId: '1:813480984136:web:c3461c9409f41ab342627d'
}

const firebaseApp = initializeApp(config)

export default firebaseApp
