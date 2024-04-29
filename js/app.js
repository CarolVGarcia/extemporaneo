import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js"
import './firebase.js'
import { auth } from './firebase.js'
import './logout.js'
import { loginCheck } from './logincheck.js'
import './signin.js'
import './añadir.js'
import './basededatos.js'

onAuthStateChanged(auth, async (user) => {
    if (user){
        loginCheck(user)
    } else {
        loginCheck(user)
    }
})


