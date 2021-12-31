const container = document.querySelector(".container");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");

window.addEventListener("load", ()=> {
    formulario.addEventListener("submit", buscarClima);

})

function buscarClima(e) {
    e.preventDefault();
    console.log("Buscando el clima");

    //validar
    const ciudad = document.querySelector("#ciudad").value;
    const pais = document.querySelector("#pais").value;

    if (ciudad === "" || pais === "") {
        //error, campos vacios
        mostrarError("Ambos campos son obligatorios");
        return;
    
    }

    //Consultamos la API
    consultarAPI(ciudad,pais);



}


function mostrarError(mensaje){
    
    const alerta = document.querySelector(".bg-red-100");

    if(!alerta){
        const alerta = document.createElement("div");
        alerta.innerHTML = `
        <strong class="font-bold">Error</strong>
        <span class="block">${mensaje}</span>
        
        `;

        alerta.classList.add("bg-red-100", "border-red-400", "text-red-700",
            "px-4", "py-3", "rounded", "max-w-md", "mx-auto", "mt-6", 
            "text-center");
        
        container.appendChild(alerta);
        setTimeout(()=>{
            alerta.remove();
        }, 3500)
    }

}

function  consultarAPI(ciudad, pais){

    const appId = "0687e9249b1bddd9765cb68bba6ac7a4";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    console.log(url);

    fetch(url)
        .then( respuesta => respuesta.json() )
        .then( datos => {
            limpiarHTML();
            if(datos.cod === "404") {
                mostrarError("La ciudad no fue encontrada")
            } else {
                mostrarClima(datos);
                console.log(datos);
            }
        } )
  
};

function mostrarClima(datos){
    const {main: {temp,temp_max, temp_min}, name, weather} = datos;

    const tempCent = kelvinACentigrados(temp);
    const tempMax = kelvinACentigrados(temp_max);
    const tempMin = kelvinACentigrados(temp_min);

    const weatherIcon = weather[0].icon;

    const nombreCiudad = document.createElement("p");
    nombreCiudad.textContent = `Clima en ${name}`;
    nombreCiudad.classList.add("font-bold", "text-2xl")


    const actual = document.createElement("p");
    actual.innerHTML = `${tempCent.toFixed(1)} &#8451;`;
    actual.classList.add("font-bold", "text-6xl");

    const maxima = document.createElement("p");
    maxima.innerHTML = `Max: ${tempMax.toFixed(1)} &#8451;`;
    maxima.classList.add("text-xl");

    const minima = document.createElement("p");
    minima.innerHTML = `Min: ${tempMin.toFixed(1)} &#8451;`;
    minima.classList.add("text-xl");

    const resultadoDiv = document.createElement("div");
    resultadoDiv.classList.add("text-center", "text-white");
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual)
    resultadoDiv.appendChild(maxima);
    resultadoDiv.appendChild(minima);

    resultado.appendChild(resultadoDiv);
}

function kelvinACentigrados(grados){
    return grados - 273.15;
}

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.firstChild.remove();
    }
}