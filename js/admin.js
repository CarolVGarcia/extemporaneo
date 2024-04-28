import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getDatabase,ref, onValue } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyDQA-rCjEd2CE9z-jnDGXy2GHQJyaNiUeA",
  authDomain: "ferreteria-cartier.firebaseapp.com",
  databaseURL: "https://ferreteria-cartier-default-rtdb.firebaseio.com",
  projectId: "ferreteria-cartier",
  storageBucket: "ferreteria-cartier.appspot.com",
  messagingSenderId: "809512707438",
  appId: "1:809512707438:web:c3e04f5c756dc983f48d7f"
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