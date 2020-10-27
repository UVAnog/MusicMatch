import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import AuthNavigator from './screens/AuthNavigator';
import HomeScreen from './screens/HomeScreen.js';

var firebaseConfig = {
  apiKey: "AIzaSyBt2sokQm6wedZP0-xuD5K-kmWfXpku6HU",
  authDomain: "musicmatch-5b8a8.firebaseapp.com",
  databaseURL: "https://musicmatch-5b8a8.firebaseio.com",
  projectId: "musicmatch-5b8a8",
  storageBucket: "musicmatch-5b8a8.appspot.com",
  messagingSenderId: "828147726051",
  appId: "1:828147726051:web:f5c680dca35e2ef9f2f7d6",
  measurementId: "G-MG7HXMF3LX"
};
// Initialize Firebase
if(firebase.apps.length == 0){
  firebase.initializeApp(firebaseConfig);
}



export default createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthNavigator,
      App: HomeScreen,
    },
    {
      initialRouteName: 'Auth'
    }
  )
);