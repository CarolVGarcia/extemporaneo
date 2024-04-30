import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js';
const firebaseConfig = {
  apiKey: "AIzaSyDTvukqC2z5Ln7IPrTvMRU49gXdUwq9Gr4",
  authDomain: "proyecto-final-carol-vazquez.firebaseapp.com",
  databaseURL: "https://proyecto-final-carol-vazquez-default-rtdb.firebaseio.com",
  projectId: "proyecto-final-carol-vazquez",
  storageBucket: "proyecto-final-carol-vazquez.appspot.com",
  messagingSenderId: "183115128765",
  appId: "1:183115128765:web:7706134d79ebbadc97fcd4"
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

      window.location.href = "/html/opcion.html";
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
