import { signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js"
const logout = document.getElementById('logout')
import { auth } from './firebase.js'

logout.addEventListener('click', async () =>{
    await signOut(auth)
    alert("Fuera de sesión")
});
