import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js';
const firebaseConfig = {
  apiKey: "AIzaSyDQA-rCjEd2CE9z-jnDGXy2GHQJyaNiUeA",
  authDomain: "ferreteria-cartier.firebaseapp.com",
  databaseURL: "https://ferreteria-cartier-default-rtdb.firebaseio.com",
  projectId: "ferreteria-cartier",
  storageBucket: "ferreteria-cartier.appspot.com",
  messagingSenderId: "809512707438",
  appId: "1:809512707438:web:c3e04f5c756dc983f48d7f"
};
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
/*---------------------------------------------------------*/
const formulario = document.getElementById("formulario");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const signInButton = document.getElementById("button");
const errorMensaje = document.getElementById("errorMensaje");
/*---------------------------------------------------------*/
formulario.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {

      window.location.href = "/HTML/opciones.html";
    })
    .catch((error) => {

      console.log("Error al iniciar sesión:", error);

      errorMensaje.textContent = "Credenciales incorrectas. Por favor, intenta nuevamente.";
    });
});

emailInput.addEventListener("click", () => {
  errorMensaje.textContent = "";
});

passwordInput.addEventListener("click", () => {
  errorMensaje.textContent = "";
});
/*---------------------------------------------------------*/
