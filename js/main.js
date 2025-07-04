document.addEventListener("DOMContentLoaded", () => {
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const categorias = ["laptops", "smartphones", "mobile-accessories"];
const containerPrincipal = document.getElementById("destacados-container");

const renderizarProductosPorCategoria =  async() => {
    for (const categoria of categorias) {
        try {
            const response = await fetch(`https://dummyjson.com/products/category/${categoria}`);
            const data = await response.json();

            //Sección para mostrar productos destacados

            const seccion = document.createElement("section");
            seccion.classList.add("seccion-categoria");

            //Título de la sección
            const cabecera = document.createElement("div");
            cabecera.classList.add("cabecera-categoria");

            const titulo = document.createElement("h2");
            titulo.textContent = categoria.charAt(0).toUpperCase() + categoria.slice(1);
            titulo.classList.add("titulo-categoria");

            const btnVerMas = document.createElement("button");
            btnVerMas.textContent = "Ver más";
            btnVerMas.classList.add("btn-secundario");

            cabecera.appendChild(titulo);
            cabecera.appendChild(btnVerMas);
            seccion.appendChild(cabecera);

            //Grid

            const grid = document.createElement("div");
            grid.classList.add("grid-productos");

            //Limitar productos a 4 por categoría

            data.products.forEach((producto, index) => {
                const tarjetaProducto = document.createElement("div");
                tarjetaProducto.classList.add("tarjeta-producto");
                if (index >3) {
                    tarjetaProducto.classList.add("oculto");
                }

                const img = document.createElement("img");
                img.src = producto.thumbnail;
                img.alt = producto.title;
                img.classList.add("imagen-producto");

                const tituloProducto = document.createElement("h3");
                tituloProducto.textContent = producto.title;
                tituloProducto.classList.add("titulo-producto");

                const precio = document.createElement("p");
                precio.textContent = `$${producto.price}`;

                const boton = document.createElement("button");
                boton.textContent = "Agregar al Carrito";
                boton.classList.add("boton-agregar");

                boton.addEventListener("click", () => {
                    alert(`Producto ${producto.title} agregado al carrito`);
                    agregarProducto(producto);
                    actualizarAgregados();
                }
                );

                tarjetaProducto.appendChild(img);
                tarjetaProducto.appendChild(tituloProducto);
                tarjetaProducto.appendChild(precio);
                tarjetaProducto.appendChild(boton);
                grid.appendChild(tarjetaProducto);
            });

            seccion.appendChild(grid);
            containerPrincipal.appendChild(seccion);

            // Botón "Ver Más"
            btnVerMas.addEventListener("click", () => {
                const tarjetas = grid.querySelectorAll(".tarjeta-producto");
                const ocultas =Array.from (tarjetas).filter(tarjeta => tarjeta.classList.contains("oculto"));
                if (ocultas.length > 0) {
                    // Mostrar más productos
                    tarjetas.forEach(card => card.classList.remove("oculto"));
                btnVerMas.textContent = "Ver menos";
                } else {
                    // Ocultar
                    tarjetas.forEach((card, i) => {
                        if (i > 3) card.classList.add("oculto");
                    });
                    btnVerMas.textContent = "Ver más";
                    seccion.scrollIntoView({ behavior: "smooth" });
                }
            });

        } catch (error) {
            console.error(`Error al cargar productos de ${categoria}:`, error);
        }
    }

};

        const agregarProducto = (producto) => {
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

        const actualizarAgregados = () => {
    const contadorCarrito = document.getElementById("contador-carrito");
    if (contadorCarrito) {
        contadorCarrito.textContent = carrito.length;
    }
};

// Menú hamburguesa
    const Hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if (Hamburger && navMenu) {
        Hamburger.addEventListener("click", () => {
            navMenu.classList.toggle("open");
            Hamburger.classList.toggle("open");
        });
    }

    renderizarProductosPorCategoria();
    actualizarAgregados();
});
