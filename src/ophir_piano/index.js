import './index.css';
import * as firebase from 'firebase';

//import PianoWithRecording from './PianoWithRecording';

const firebaseConfig = {
    apiKey: "AIzaSyCjiORuncMb-6-T1lwLqH7C2vaNZJJ4rlg",
    authDomain: "compstation-a6859.firebaseapp.com",
    databaseURL: "https://compstation-a6859.firebaseio.com",
    projectId: "compstation-a6859",
    storageBucket: "compstation-a6859.appspot.com",
    messagingSenderId: "905141170857",
    appId: "1:905141170857:web:5981cdeaf1d13b159aefb8",
    measurementId: "G-8WFBX5QRGW"
};

firebase.initializeApp(firebaseConfig);
