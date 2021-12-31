"use strict";

const carrito = document.querySelector("#carrito");
const contCarrito = document.querySelector("#lista-carrito tbody");
const listaCursos = document.querySelector("#lista-cursos"); 
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
let articulosCarrito = [];

//Es usual crear una función que contenga todos los event listeners de la función que queremos implementar
cargarEventListenersCarrito();
function cargarEventListenersCarrito() {

    //Sincronizar carrito con LocalStorage
    document.addEventListener("DOMContentLoaded", sincronizarCarritoLC);

    //Cuando se le da click a algún elemento del div-litsa de cursos
    listaCursos.addEventListener("click", agregarCurso);
    //Cuando se presiona el botón para eliminar algo del carrito 
    carrito.addEventListener("click", eliminarCurso);
    //Cuando se presiona "vaciar carrito"
    vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
}


//Funciones particulares

function agregarCurso(e){
    e.preventDefault();
    //Con esto hacemos que no cualquier click en el div de lista de cursos
    // Sino solo los q tengan la clase agregar-carrito 
    //(osea los botones de eso)
    if (e.target.classList.contains("agregar-carrito")){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
    
   /*  contCarrito.appendChild(e); */
}

function eliminarCurso(e) {
    if (e.target.classList.contains("borrar-curso")){
        const cursoId = e.target.getAttribute("data-id");
        //Elimina artículo del artículoscarrito[] por su data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId );
        carritoHTML(); //Vuelve a iterar sobre el carrito y generar su html
    }
}

function vaciarCarrito(){
    articulosCarrito = [];
    localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
    limpiarCarritoHTML();
}

function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1
    };

    // Evalua si el elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id)
    if (existe) {
        //Aumentamos la cantidad en 1
        const cursos = articulosCarrito.map( curso => {
            if (curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; //retorna el objeto actualizado
            } else {
                return curso; //retorna los objetos no duplicados q ya existian
            }
        })
        articulosCarrito = [...cursos];
    } else {
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    carritoHTML();
    
}

function carritoHTML() {
    limpiarCarritoHTML();
    //Recorre el carrito y genera el html
    articulosCarrito.forEach(articulo => {
        const row = document.createElement("tr");
        row.innerHTML= `
        <td>
            <img src="${articulo.imagen}" width="100px">
        </td>
        <td>
            ${articulo.titulo}
        </td>
        <td>
            ${articulo.precio}
        </td>
        <td>
            ${articulo.cantidad}
        </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${articulo.id}">X</a>
        </td>
        `;
        contCarrito.appendChild(row);
        /* curso.cantidad += 1; */
        /* if(curso.cantidad > 1) {

        } */
    })

    localStorage.setItem("carrito",JSON.stringify(articulosCarrito));
}

function limpiarCarritoHTML(){
    //fORMA LENTA  de limpiar el html
    //contCarrito.innerHTML="";

    //Forma óptima de limpiar html
    while(contCarrito.firstChild){
        contCarrito.removeChild(contCarrito.firstChild);
    }
}

function sincronizarCarritoLC() {
    articulosCarrito = JSON.parse(localStorage.getItem("carrito"));
    carritoHTML();
}