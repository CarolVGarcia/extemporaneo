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
const productosRef = ref(database, 'Producto');

// Obtiene la referencia al contenedor donde se agregarán las tarjetas
const tarjetasContainer = document.querySelector('#tarjetas-container');

// ...

// Observador para detectar cambios en la base de datos
onValue(productosRef, (snapshot) => {
    // Limpia el contenedor antes de agregar nuevas tarjetas
    tarjetasContainer.innerHTML = '';
  
    // Obtiene los datos de la base de datos
    const data = snapshot.val();
  
    // Verifica si hay datos
    if (data) {
      // Itera sobre cada producto en la base de datos
      Object.keys(data).forEach((productoKey) => {
        const producto = data[productoKey];
  
        // Crea una nueva tarjeta para cada producto
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.style.width = '18rem';
  
        cardElement.innerHTML = `
          <img src="${producto.Imagen}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${producto.Nombre}</h5>
            <p class="card-text">${producto.Descripcion}</p>
            <a href="#" class="btn btn-primary">Más Información</a>
            <a href="#" class="btn btn-primary logged-in eliminar-btn" data-producto-key="${productoKey}">Eliminar</a>
          </div>
        `;
  
        // Agrega la tarjeta al contenedor
        tarjetasContainer.appendChild(cardElement);
      });
    }
  
    // Agrega un evento de clic a los botones "Eliminar"
    document.querySelectorAll('.eliminar-btn').forEach((btn) => {
      btn.addEventListener('click', function () {
        const productoKey = this.dataset.productoKey;
        eliminarProducto(productoKey);
      });
    });
  });
  
  function eliminarProducto(productoKey) {
    if (confirm('¿Seguro que deseas eliminar este producto?')) {
        // Obtén la referencia específica del producto
        const productoRef = ref(database, `Producto/${productoKey}`);
    
        // Elimina el producto de la base de datos
        set(productoRef, null)
            .then(() => {
                console.log('Producto eliminado correctamente');
            })
            .catch((error) => {
                console.error('Error al eliminar el producto: ', error);
            });
    }
}


