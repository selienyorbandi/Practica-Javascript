//? Object Constructors

function Seguro(marca, year, tipo) {
    this.marca = marca,
    this.year = year,
    this.tipo = tipo
};

function UI() {};

UI.prototype.llenarOpciones = () =>{
    const max = new Date().getFullYear(),
          min = max - 20;
    const selectYear = document.querySelector("#year");

    for (let i = max; i > min; i--){
        const yearOption = document.createElement("option");
        yearOption.textContent = i;
        yearOption.value = i;
        selectYear.appendChild(yearOption);
    }

}


UI.prototype.mostrarMensaje = (mensaje, tipo) => {
    
    const div = document.createElement("div");

    if (tipo === "error") {
        div.classList.add("error");
    } else if (tipo === "correcto") {
        div.classList.add("correcto");
    }
    
    div.classList.add("mensaje", "mt-10");
    div.textContent = mensaje;

    const formulario = document.querySelector("#cotizar-seguro");
    formulario.insertBefore(div, document.querySelector("#resultado"));

    setTimeout(()=>{
        div.remove();
    }, 1000);

}

Seguro.prototype.cotizarSeguro = function () {
    //  valor base del seguro
    let seguro = 2000; 

    //  incremento según el tipo
    switch(this.marca) {
        case "1": // 1 = Americano 1.15
            seguro *= 1.15;
            break;
        case "2": // 2 = Asiático 1.05
            seguro *= 1.05;
            break;
        case "3": // 3 = Europeo 1.35
            seguro *= 1.35;
            break;
        default:
            break;
    }

    // reducción según la antiguedad --> 1,5% por cada año de antiguedad
    const diferencia = new Date().getFullYear() - this.year;
    seguro -= (diferencia * 1.5) * seguro / 100;
    

    // Incremento según el tipo de seguro
    if (this.tipo === "basico") {
        seguro *= 1.1; // un 10% más
    } else if (this.tipo === "completo") {
        seguro *= 1.25; // un 25% extra
    } else {
        ui.mostrarMensaje("Error en los datos que ingresó", "error");
    };
    return seguro;
};

UI.prototype.mostrarCotizacion = (totalPoliza, seguro) => {
    const div = document.createElement("div");
    div.classList.add("mt-10");
    let marcaStr = "";
    switch(seguro.marca){
        case "1":
            marcaStr = "Americano";
            break;
        case "2":
            marcaStr = "Asiático";
            break;
        case "3":
            marcaStr = "Europeo";
            break;
        default:
            break;
    }

    div.innerHTML = `
        <p class="header">Tu Resúmen</p>
        <p class="font-bold">Marca: <span class="font-normal">${marcaStr}</span></p>
        <p class="font-bold">Año: <span class="font-normal">${seguro.year}</span></p>
        <p class="font-bold">Tipo: <span class="font-normal">${seguro.tipo}</span></p>
        <p class="font-bold">Total: <span class="font-normal">${totalPoliza.toFixed(2)}</span></p>
    `;
    const resultadoDiv = document.querySelector("#resultado");
    setTimeout(()=>{
        resultadoDiv.appendChild(div);
    }, 1000);
}

UI.prototype.limpiarResultado = () => {
    const resultadoHtml = document.querySelector("#resultado");
    while(resultadoHtml.firstChild){
        resultadoHtml.lastChild.remove();
    }
}

const ui = new UI();


document.addEventListener("DOMContentLoaded", () => {
    ui.llenarOpciones();
})

//? Event listeners
eventListeners();
function eventListeners () {
    const formulario = document.querySelector("#cotizar-seguro");
    formulario.addEventListener("submit", cotizarSeguro);
}



//? Funciones

function cotizarSeguro(e){
    e.preventDefault();

    const marca = document.querySelector("#marca").value;
    const year = document.querySelector("#year").value;
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    
    if(marca === "" || year === "" || tipo === ""){
        ui.mostrarMensaje("Todos los campos son obligatorios", "error")
    } else {
        ui.limpiarResultado();
        ui.mostrarMensaje("Cotizando...", "correcto")
        const seguro = new Seguro(marca, year, tipo);
        const totalPoliza = seguro.cotizarSeguro();
        ui.mostrarCotizacion(totalPoliza, seguro);
    }

}
