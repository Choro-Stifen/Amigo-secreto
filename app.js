let amigos = [];
let asignaciones = {};

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
}

function agregarAmigo() {
    let nombre = document.getElementById('amigo').value.trim();
    if (nombre && !amigos.includes(nombre)) {
        amigos.push(nombre);
        actualizarLista();
        document.getElementById('amigo').value = '';
    } else {
        alert('Por favor, ingrese un nombre válido.');
    }
}

function actualizarLista() {
    let listaHTML = document.getElementById('listaAmigos');
    listaHTML.innerHTML = '';
    amigos.forEach(nombre => {
        let li = document.createElement('li');
        li.textContent = nombre;
        listaHTML.appendChild(li);
    });
}

function sortearAmigo() {
    if (amigos.length < 2) {
        alert('Debe haber al menos 2 participantes.');
        return;
    }
    
    let disponibles = [...amigos];
    asignaciones = {};
    
    amigos.forEach(participante => {
        let posibles = disponibles.filter(p => p !== participante);
        if (posibles.length === 0) {
            return sortearAmigo();
        }
        let elegido = posibles[Math.floor(Math.random() * posibles.length)];
        asignaciones[participante] = elegido;
        disponibles.splice(disponibles.indexOf(elegido), 1);
    });
    
    mostrarAsignaciones();
}

function mostrarAsignaciones() {
    let resultadoHTML = document.getElementById('resultado');
    resultadoHTML.innerHTML = '';
    Object.keys(asignaciones).forEach(participante => {
        let p = document.createElement('li');
        p.textContent = `${participante} → ${asignaciones[participante]}`;
        resultadoHTML.appendChild(p);
    });
}