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
    Listarproductos();
  });

  var btnAgregar = document.getElementById('btnAgregar');
  var btnBuscar = document.getElementById('btnBuscar');
  var btnActualizar = document.getElementById('btnActualizar');
  var btnBorrar = document.getElementById('btnBorrar');
  
  const imageInput = document.getElementById('imageInput');
  const uploadButton = document.getElementById('uploadButton');
  const progressDiv = document.getElementById('progress');
  const txtUrlInput = document.getElementById('txtUrl');
  
  var codigo = 0;
  var nombrePro = "";
  var precioPro = "";
  var cantidadPro = "";
  var urlImg = "";

  uploadButton.addEventListener('click', (event) => {
    event.preventDefault();
    const file = imageInput.files[0];
  
    if (file) {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        progressDiv.textContent = 'Progreso: ' + progress.toFixed(2) + '%';
      }, (error) => {
        console.error(error);
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          txtUrlInput.value = downloadURL; 
          setTimeout(() => {
            progressDiv.textContent = '';
          }, 500);
        }).catch((error) => {
          console.error(error);
        });
      });
    }
  });

  function leerInputs() {
    codigo = document.getElementById('txtCodigo').value;
    nombrePro = document.getElementById('txtNombre').value;
    precioPro = document.getElementById('txtPrecio').value;
    cantidadPro = document.getElementById('txtCantidad').value;
    urlImg = document.getElementById('txtUrl').value;
  }
  
  function mostrarMensaje(mensaje) {
    var mensajeElement = document.getElementById('mensaje');
    mensajeElement.textContent = mensaje;
    mensajeElement.style.display = 'block';
    setTimeout(() => {
      mensajeElement.style.display = 'none';
    }, 1000);
  }
  
  function insertarProducto() {
    leerInputs();
    if (codigo === "" || nombrePro === "" || precioPro === "" || cantidadPro === ""| urlImg === "") {
      mostrarMensaje("Favor de capturar toda la información.");
      return;
    }
    set(refS(db, 'productos/' + codigo), {
      codigo:codigo,
      nombre: nombrePro,
      precio: precioPro,
      cantidad: cantidadPro,
      urlImg: urlImg
    }).then(() => {
      mostrarMensaje("Se insertó con éxito.");
      limpiarInputs();
      Listarproductos();
    }).catch((error) => {
      mostrarMensaje("Ocurrió un error: " + error);
    });
  }

  function buscarProducto() {
    let codigo = document.getElementById('txtCodigo').value.trim();
    if (codigo === "") {
      mostrarMensaje("No se ingresó código.");
      return;
    }
  
    const dbref = refS(db);
    get(child(dbref, 'productos/' + codigo)).then((snapshot) => {
      if (snapshot.exists()) {
        nombrePro = snapshot.val().nombre;
        precioPro = snapshot.val().precio;
        cantidadPro = snapshot.val().cantidad;
        urlImg = snapshot.val().urlImg;
        escribirInputs();
      } else {
        limpiarInputs();
        mostrarMensaje("El producto con código " + codigo + " no existe.");
      }
    });
  }

  function escribirInputs() {
    document.getElementById('txtNombre').value = nombrePro;
    document.getElementById('txtPrecio').value = precioPro;
    document.getElementById('txtCantidad').value = cantidadPro;
    document.getElementById('txtUrl').value = urlImg;
  }
  
  function Listarproductos() {
    const dbRef = refS(db, 'productos');
    const tabla = document.getElementById('tablaProductos');
    const tbody = tabla.querySelector('tbody');
    tbody.innerHTML = '';
  
    onValue(dbRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const data = childSnapshot.val();
  
        var fila = document.createElement('tr');
  
        var celdaCodigo = document.createElement('td');
        celdaCodigo.textContent = childKey;
        fila.appendChild(celdaCodigo);
  
        var celdaNombre = document.createElement('td');
        celdaNombre.textContent = data.nombre;
        fila.appendChild(celdaNombre);
  
        var celdaPrecio = document.createElement('td');
        celdaPrecio.textContent = "$" + data.precio;
        fila.appendChild(celdaPrecio);
  
        var celdaCantidad = document.createElement('td');
        celdaCantidad.textContent = data.cantidad;
        fila.appendChild(celdaCantidad);
  
        var celdaImagen = document.createElement('td');
        var imagen = document.createElement('img');
        imagen.src = data.urlImg;
        imagen.width = 100;
        celdaImagen.appendChild(imagen);
        fila.appendChild(celdaImagen);
  
        tbody.appendChild(fila);
      });
    }, { onlyOnce: true });
  }

  function actualizarProducto() {
    leerInputs();
    if (codigo === "" || nombrePro === "" || precioPro === "" || cantidadPro === ""| urlImg === "") {
      mostrarMensaje("Favor de capturar toda la información.");
      return;
    }
  
    update(refS(db, 'productos/' + codigo), {
      codigo:codigo,
      precio: precioPro,
      nombre: nombrePro,
      cantidad: cantidadPro,
      urlImg: urlImg
    }).then(() => {
      mostrarMensaje("Se actualizó con éxito.");
      limpiarInputs();
      Listarproductos();
    }).catch((error) => {
      mostrarMensaje("Ocurrió un error: " + error);
    });
  }
  
  function eliminarProducto() {
    let codigo = document.getElementById('txtCodigo').value.trim();
    if (codigo === "") {
      mostrarMensaje("No se ingresó un Codigo válido.");
      return;
    }
    const dbref = refS(db);
    get(child(dbref, 'productos/' + codigo)).then((snapshot) => {
      if (snapshot.exists()) {
        remove(refS(db, 'productos/' + codigo))
          .then(() => {
            mostrarMensaje("Producto eliminado con éxito.");
            limpiarInputs();
            Listarproductos();
          })
          .catch((error) => {
            mostrarMensaje("Ocurrió un error al eliminar el producto: " + error);
          });
      } else {
        limpiarInputs();
        mostrarMensaje("El producto con ID " + codigo + " no existe.");
      }
    });
  }
  
  function limpiarInputs() {
    document.getElementById('txtCodigo').value = '';
    document.getElementById('txtNombre').value = '';
    document.getElementById('txtPrecio').value = '';
    document.getElementById('txtCantidad').value = '';
    document.getElementById('txtUrl').value = '';
  }
  
  function validarNumeros(event) {
    var charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  document.getElementById('txtCantidad').addEventListener('keypress', validarNumeros);
document.getElementById('txtCodigo').addEventListener('keypress', validarNumeros);
document.getElementById('txtPrecio').addEventListener('keypress', validarNumeros);

btnBorrar.addEventListener('click', eliminarProducto);
btnAgregar.addEventListener('click', insertarProducto);
btnActualizar.addEventListener('click', actualizarProducto);
btnBuscar.addEventListener('click', buscarProducto);
