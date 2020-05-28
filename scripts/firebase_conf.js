var firebaseConfig = {
    apiKey: "AIzaSyDknvnKhcrcbG-1nM2G1Tg_v8XvwG7if1Y",
    authDomain: "fir-authentication-13718.firebaseapp.com",
    databaseURL: "https://fir-authentication-13718.firebaseio.com",
    projectId: "fir-authentication-13718",
    storageBucket: "fir-authentication-13718.appspot.com",
    messagingSenderId: "436449727822",
    appId: "1:436449727822:web:5e343abfdb4c1f3ef43a1f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig); // backend ile web arasındaki baglantiyi initilaze editor

//auth ve firestore referansları yaratılır.
const auth = firebase.auth(); // auth referansi yaratılfı ve bu referans ile auth işlemleri yapacagız
const  db = firebase.firestore(); // firestore referansi yaratılfı ve bu referans ile auth işlemleri yapacagız
const  functions = firebase.functions();
