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

window.addEventListener('DOMContentLoaded', (event) => {
    mostrarProductosHTML();
  });

  function mostrarProductosHTML() {
    const dbRef = ref(db, 'productos');
    const section = document.querySelector('.products-grid');
  
    onValue(dbRef, (snapshot) => {
      section.innerHTML = ''; // Limpiar contenido anterior
  
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const data = childSnapshot.val();
  
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
  
        const productImage = document.createElement('img');
        productImage.src = data.urlImg;
        productImage.alt = '';
        productDiv.appendChild(productImage);
  
        const productTitle = document.createElement('h3');
        productTitle.className = 'product-title';
        productTitle.textContent = data.nombre;
        productDiv.appendChild(productTitle);
  
        const productPrice = document.createElement('p');
        productPrice.className = 'product-price';
        productPrice.textContent = `$${data.precio}`;
        productDiv.appendChild(productPrice);
  
        const productStock = document.createElement('p');
        productStock.className = 'product-stock';
        productStock.textContent = `Disponible: ${data.cantidad} unidades`;
        productDiv.appendChild(productStock);
  
        const addToCartBtn = document.createElement('button');
        addToCartBtn.className = 'add-to-cart';
        addToCartBtn.textContent = 'Agregar al carrito';
        productDiv.appendChild(addToCartBtn);
  
        section.appendChild(productDiv);
      });
    }, { onlyOnce: true });
  }
