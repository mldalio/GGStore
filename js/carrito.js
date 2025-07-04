document.addEventListener("DOMContentLoaded", () => {
const renderizarProductos = () => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    productosEnCarrito (carrito);

    let seccionProductos = document.getElementById("carrito-container");
    seccionProductos.innerHTML = ""; 
    
    if (!carrito.length) {
        let mensajeCarrito = document.createElement("p");
        mensajeCarrito.classList.add("mensaje-carrito");
        mensajeCarrito.textContent = "Tu carrito está vacío";

        seccionProductos.appendChild(mensajeCarrito);
    } else {
        carrito.forEach((elemento, index) => {
            let tarjetaProducto = document.createElement("div");
            tarjetaProducto.classList.add("tarjeta-producto");

            let img = document.createElement("img");
            img.src = elemento.thumbnail;
            img.alt = elemento.title;
            img.classList.add("imagen-producto");

            let tituloProducto = document.createElement("h3");
            tituloProducto.textContent = elemento.title;
            tituloProducto.classList.add("titulo-producto");

            let precio = document.createElement("p");
            precio.textContent = `$${elemento.price}`;

            let botonEliminar = document.createElement("button");
            botonEliminar.textContent = "Eliminar del Carrito";
            botonEliminar.classList.add("btn-secundario");

            botonEliminar.addEventListener("click", () => {
                eliminarProducto(index);
            });

            tarjetaProducto.appendChild(img);
            tarjetaProducto.appendChild(tituloProducto);
            tarjetaProducto.appendChild(precio);
            tarjetaProducto.appendChild(botonEliminar);

            seccionProductos.appendChild(tarjetaProducto);
        });        
    }

    renderizarBotones();
 };

 const renderizarBotones = () => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let divAcciones = document.getElementById("acciones-carrito");
    divAcciones.innerHTML = "";

    if (carrito.length) {
        let botonVaciar = document.createElement("button");
        botonVaciar.textContent = "Vaciar Carrito";
        botonVaciar.classList.add("btn-secundario");

        botonVaciar.addEventListener("click", () => {
            vaciarCarrito();
        });

let botonComprar = document.createElement("button");
        botonComprar.textContent = "Comprar";
        botonComprar.classList.add("btn-primario");

        botonComprar.addEventListener("click", () => {
            let confirmado = confirm("¿Estás seguro de que deseas comprar los productos en tu carrito?");
            if (confirmado) {
                alert("Compra realizada con éxito");
                localStorage.removeItem("carrito");
                window.location.href = "../index.html";
            }
        })

        divAcciones.appendChild(botonVaciar);
        divAcciones.appendChild(botonComprar);        
    }    
 }

 const productosEnCarrito = (carrito) => {
 let contadorCarrito = document.getElementById("contador-carrito");
    contadorCarrito.textContent = carrito.length;
 };

 const eliminarProducto = (index) => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1);

    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("Producto eliminado del carrito");
    renderizarProductos();  
 };

 const vaciarCarrito = () => {
    localStorage.removeItem("carrito");
    alert("Carrito vaciado");
    renderizarProductos();
 };

renderizarProductos();
});


















