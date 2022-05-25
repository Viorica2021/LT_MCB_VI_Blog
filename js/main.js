const firebaseConfig = {
    apiKey: "AIzaSyC0RmSC_T5C4szwDUY3VAJxvZ5dDdU6dD0",
    authDomain: "blog-scoala-aca63.firebaseapp.com",
    projectId: "blog-scoala-aca63",
    storageBucket: "blog-scoala-aca63.appspot.com",
    messagingSenderId: "610276837445",
    appId: "1:610276837445:web:b22c7d3d4193e7d859bb2c",
    measurementId: "G-1C8EZN5W4K"
  };
function mobileMenu() {
    var x = document.getElementById("navbar");
    if (x.className === "") {
        x.className = "mobile";
    } else {
        x.className = "";
    }
}


const yearElement = document.getElementById('year');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const postareBtn = document.getElementById('postare-btn');
const salutare = document.getElementById("username");

let user = null;
let admins = ["ArMxzV6lglQbDLKi8AL6VOBicLs2"]

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const db = firebase.firestore();

const postariDb = db.collection("postari");

const provider = new firebase.auth.GoogleAuthProvider();

loginBtn.onclick = function() {
    console.log("logare...");
    auth.signInWithPopup(provider).then(function() {window.location.reload();});
}
logoutBtn.onclick = function() {
    auth.signOut();
    window.location.reload();
}

function isAdmin() {
    let admin;
    if (user == null)
    return false;

    admin = admins.includes(user.uid);

    return admin;

}

function formatDate(time) {
    let date = new Date(time);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    let result = day + "-"+ month + "-" + year;
    return result;


}

auth.onAuthStateChanged(function(fuser) {
    user = fuser;
    console.log(user);
    if (user !=null) {
        logoutBtn.style.display = "block";
        loginBtn.style.display = "none";
        salutare.innerHTML = "Salutare," +  user.displayName;

        if (isAdmin() == true) {
            postareBtn.style.display = "block";

        }
        else {
            postareBtn.style.display = "none";
        }

    }
    else {
        logoutBtn.style.display = "none";
        loginBtn.style.display = "block";
        postareBtn.style.display = "none";
        
    }

    document.querySelector('body').style.display = "block";

})

if (yearElement) {
    let date = new Date();
    
    yearElement.innerHTML = date.getFullYear() + " ©";
}



