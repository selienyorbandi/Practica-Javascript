"use strict";

//___________________Variables____________________________
const marcaBusq = document.querySelector("#marca"); 
const selectAños = document.querySelector("#year");
const minPrecioBusq = document.querySelector("#minimo"); 
const maxPrecioBusq = document.querySelector("#maximo"); 
const puertasBusq = document.querySelector("#puertas"); 
const transmisionBusq = document.querySelector("#transmision");
const colorBusq = document.querySelector("#color");

const resultadoBusqueda = document.querySelector("#resultado");

const anioActual = new Date().getFullYear();
const anioMinimo = anioActual - 11;

//Generamos un objeto con lo que buscamos
const datosBusqueda = {
    marca: "",
    anio: "",
    precioMin: "",
    precioMax: "",
    puertas: "",
    transmision: "",
    color: ""
};

//________________Eventos_____________________________
document.addEventListener("DOMContentLoaded", () => {
    mostrarAutos(autos);
    llenarSelectAños();
});

//Eventos para cada select
marcaBusq.addEventListener("change", e => {
    datosBusqueda["marca"] = e.target.value;
    filtrarAuto();
});
selectAños.addEventListener("change", e => {
    datosBusqueda.anio = parseInt(e.target.value);
    filtrarAuto();
});
minPrecioBusq.addEventListener("change", e => {
    datosBusqueda.precioMin = e.target.value;
    filtrarAuto();
});
maxPrecioBusq.addEventListener("change", e => {
    datosBusqueda.precioMax = e.target.value;
    filtrarAuto();
});
puertasBusq.addEventListener("change", e => {
    datosBusqueda.puertas= parseInt(e.target.value);
    filtrarAuto();
});
transmisionBusq.addEventListener("change", e => {
    datosBusqueda.transmision= e.target.value;
    filtrarAuto();
});
colorBusq.addEventListener("change", e => {
    datosBusqueda.color= e.target.value;
    filtrarAuto();
});



//_______________________Funciones________________________

function llenarSelectAños() {
    for (let i = anioMinimo; i <= anioActual; i++){
        let opcion = document.createElement("option");
        opcion.textContent = i;
        opcion.setAttribute("value",i);
        selectAños.appendChild(opcion);
    }
}

function mostrarAutos(autos) {
    limpiarHTMLresultados();
    
    autos.forEach( auto => {
        const autoHTML = document.createElement("p");
        const { marca, modelo, year, precio, puertas, color, transmision } = auto; //Destructuring
       
        autoHTML.textContent = `
            ${marca} ${modelo} ${year} | ${puertas} puertas | color ${color} | transmision ${transmision} | $${precio}
        `;
        
        resultadoBusqueda.appendChild(autoHTML);
    })

}

function limpiarHTMLresultados() {
    //resultadoBusqueda.innerHTML = "";
    while(resultadoBusqueda.firstChild){
        resultadoBusqueda.removeChild(resultadoBusqueda.firstChild);
    }
}

function filtrarAuto() {
    const resultadoFiltrado = autos.filter(filtrarMarca).filter(filtrarAnio).filter(filtrarPrecioMin)
    .filter(filtrarPrecioMax).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);

    if (resultadoFiltrado.length){
        mostrarAutos(resultadoFiltrado);
    } else {
        mostrarSinResultados();
    }

    
}

function filtrarMarca(auto) {
    if(datosBusqueda.marca) {
        return auto.marca === datosBusqueda.marca;
    } else {
        return auto;
    }
};

function filtrarAnio(auto){
    if(datosBusqueda.anio) {
        return auto.year === datosBusqueda.anio;
    } else {
        return auto;
    }
};

function filtrarPrecioMin(auto) {
    if(datosBusqueda.precioMin) {
        return auto.precio >= datosBusqueda.precioMin;
    } else {
        return auto;
    }
};

function filtrarPrecioMax(auto) {
    if(datosBusqueda.precioMax){
        return auto.precio <= datosBusqueda.precioMax;
    } else {
        return auto;
    }
};

function filtrarPuertas(auto) {
    if (datosBusqueda.puertas) {
        return datosBusqueda.puertas === auto.puertas;
    } else {
        return auto;
    }
}

function filtrarTransmision(auto){
    if (datosBusqueda.transmision) {
        return datosBusqueda.transmision === auto.transmision;
    } else {
        return auto;
    }
}

function filtrarColor(auto){
    if (datosBusqueda.color) {
        return datosBusqueda.color === auto.color;
    } else {
        return auto;
    }
}

function mostrarSinResultados () {
    limpiarHTMLresultados();
    const noResultados = document.createElement("div");
    noResultados.classList.add("alerta", "error");
    noResultados.textContent = "No hay vehículos que coincidan con los parámetros de búsqueda";

    resultadoBusqueda.appendChild(noResultados);

}