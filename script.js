//Variables
const carrito = document.getElementById("carrito");
const listaProductos = document.getElementById("lista-productos");
const contenedorCarrito = document.querySelector('.buy-card .lista_de_productos');
const vaciarCarritoBtn = document.querySelector('#vaciar_carrito');

let articulosCarrito = [];

registrarEventsListeners();

function registrarEventsListeners() {
    //Cuando yo le de click a "agregar al carrito de compras"
    listaProductos.addEventListener('click', agregarProducto);

    //Eliminar curso del carrito
    carrito.addEventListener('click', eliminarProducto);

    //Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', e => {
        articulosCarrito = [];
        limpiarHTML();
    });
}

function agregarProducto(e) {
    if (e.target.classList.contains("agregar-carrito")) {
        const productoSeleccionado = e.target.parentElement.parentElement;
        leerInfo(productoSeleccionado);
    }
}

//Elimina un curso del carrito
function eliminarProducto(e) {
    if(e.target.classList.contains("borrar-producto")){
        const productoId = e.target.getAttribute('data-id');

        //Eliminar del arreglo del articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId);

        carritoHTML();
    }
}

//Leer el contenido de nuestro HTML al que le dimos click y extrae la info del curso
function leerInfo(producto) {
    //Crear un objeto con el contenido del curso actual
    const infoProducto = {
        imagen : producto.querySelector('img').src,
        titulo: producto.querySelector('h3').textContent,
        precio: producto.querySelector('.descuento').textContent,
        id : producto.querySelector('button').getAttribute('data-id'),
        cantidad : 1
    };

    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(producto => producto.id === infoProducto.id);

    if (existe) {
        //Actualizar la cantidad
        articulosCarrito = articulosCarrito.map(producto => { // Corregido: se actualiza articulosCarrito
            if (producto.id === infoProducto.id) {
                producto.cantidad++;
                return producto;
            } else {
                return producto;
            }
        });
    } else {
        //Agregamos elementos al carrito de compras
        articulosCarrito = [...articulosCarrito, infoProducto];
    }
    carritoHTML();
}

//Muestra el carrito en el HTML

function carritoHTML() {
    limpiarHTML();
    //Recorre el carrito de compras y genera el HTML
    articulosCarrito.forEach(producto => {
        const fila = document.createElement('div');
        fila.innerHTML = `
            <img src="${producto.imagen}"></img>
            <p>${producto.titulo}</p>
            <p>${producto.precio}</p>
            <p>${producto.cantidad}</p>
            <p><span class="borrar-producto" data-id="${producto.id}">X</span></p>
        `;

        contenedorCarrito.appendChild(fila);
    });
}

//Elimina los cursos de la lista_de_productos
function limpiarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}