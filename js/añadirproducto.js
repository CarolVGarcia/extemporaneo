import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getDatabase,ref, onValue } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyDTvukqC2z5Ln7IPrTvMRU49gXdUwq9Gr4",
  authDomain: "proyecto-final-carol-vazquez.firebaseapp.com",
  databaseURL: "https://proyecto-final-carol-vazquez-default-rtdb.firebaseio.com",
  projectId: "proyecto-final-carol-vazquez",
  storageBucket: "proyecto-final-carol-vazquez.appspot.com",
  messagingSenderId: "183115128765",
  appId: "1:183115128765:web:7706134d79ebbadc97fcd4"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
/*--------------------------------------------------- */

window.addEventListener('DOMContentLoaded', (event) => {
  mostrarProductosHTML();
});

/*--------------------------------------------------- */

function mostrarProductosHTML() {
    const dbRef = ref(db, 'productos');
    const section = document.querySelector('.products-grid');
  
    onValue(dbRef, (snapshot) => {
      section.innerHTML = '';
  
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const data = childSnapshot.val();
  
  
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
  
        const productImage = document.createElement('img');
        productImage.src = data.urlImg;
        productImage.alt = data.nombre; // Mejora de accesibilidad
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
    }, (error) => {
      console.error("Error al recuperar los datos:", error);
    }, { onlyOnce: true });
  }
