const url = "http://localhost:3000/clientes";

export const nuevoCliente = async cliente => {
    try {
        await fetch(url, {
            method: "POST",
            body: JSON.stringify(cliente),
            headers: {
                "Content-Type": "application/json"
            }
        })
        window.location.href = "index.html";
    } catch(err){
        console.log(err);
    }
};

export const obtenerClientes  = async () => {
    try {
        const resultado = await fetch(url);
        const clientes = await resultado.json();
        return clientes;
    } catch(err){
        console.log(err);
    }
}

export const eliminarCliente = async id => {
    try {
        await fetch(`${url}/${id}`, {
            method: "DELETE"
        });
    } catch (err) {
        console.log(err);
    }
}

export const obtenerCliente = async id => {
    try {
        const resultado = await fetch(`${url}/${id}`);
        const cliente = await resultado.json();
        return cliente;
    } catch (err) {
        console.log(err);
    }
}

export const editarCliente = async cliente => {
    try {
        await fetch(`${url}/${cliente.id}`, {
            method: "PUT",
            body: JSON.stringify(cliente),
            headers: {
                "Content-Type": "application/json"
            }
        });
        window.location.href = "index.html";
    } catch(err) {
        console.log(err);
    }
}