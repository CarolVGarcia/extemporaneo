// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYmXrAGXc9rgnJlQTFQlo8aEAh10VwwcY",
  authDomain: "extemporaneo-16e65.firebaseapp.com",
  projectId: "extemporaneo-16e65",
  storageBucket: "extemporaneo-16e65.appspot.com",
  messagingSenderId: "982016939361",
  appId: "1:982016939361:web:d1d07f6dc396fdc681a120",
  measurementId: "G-6JGCEHYQ70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const formulario = document.getElementById("formulario");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const signInButton = document.getElementById("button");
const errorMensaje = document.getElementById("errorMensaje");

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
  