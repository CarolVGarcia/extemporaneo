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
// Obtiene la referencia al formulario y la sección de productos en la base de datos
const productForm = document.getElementById('product-form');
const productosRef = ref(database, 'Producto');

// Variable para controlar si el formulario está siendo procesado
let formProcessing = false;

// Evento de submit del formulario
productForm.addEventListener('submit', function (p) {
    p.preventDefault();

    // Si el formulario ya está siendo procesado, no hacer nada
    if (formProcessing) {
        return;
    }
    // Activar el indicador de procesamiento
    formProcessing = true;

    // Obtiene los valores de los campos de entrada
    const imgUrl = document.getElementById('img-url').value;
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;

    // Añade un nuevo producto a la base de datos
    push(productosRef, {
        Imagen: imgUrl,
        Nombre: nombre,
        Descripcion: descripcion
    })
        .then(() => {
            // Limpia los campos del formulario después de agregar el producto
            document.getElementById('img-url').value = '';
            document.getElementById('nombre').value = '';
            document.getElementById('descripcion').value = '';

            // Cierra el modal
            const productModal = new bootstrap.Modal(document.getElementById('productModal'));
            productModal.hide();
        })
        .catch((error) => {
            console.error('Error al agregar el producto: ', error);
        })
        .finally(() => {
            // Desactivar el indicador de procesamiento
            formProcessing = false;
        });
});
