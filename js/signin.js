import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js"
import { auth } from "./firebase.js";
const signinForm = document.querySelector('#login-form');

signinForm-addEventListener('submit', async e => {
    e.preventDefault()

    const email = signinForm['login-email'].value;
    const pass = signinForm['login-pass'].value;
try {
    const credentials = await signInWithEmailAndPassword(auth, email, pass)
    alert("Inicio de sesión con éxito")
} catch (error) {
    console.log(error)
    alert("Error al iniciar sesión")
}
});
