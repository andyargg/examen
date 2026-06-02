var figuritas = [];
var filtradas = [];
var pagina = 1;
var idSeleccionado = null;

var banderas = {
    "Argentina": "🇦🇷",
    "Brasil": "🇧🇷",
    "Francia": "🇫🇷",
    "Alemania": "🇩🇪",
    "España": "🇪🇸",
    "Inglaterra": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    "Italia": "🇮🇹",
    "Portugal": "🇵🇹",
    "Uruguay": "🇺🇾",
    "Colombia": "🇨🇴"
};

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("#tab-formulario .card-footer .btn-success").addEventListener("click", guardar);
    document.querySelector("#tab-formulario .card-footer .btn-secondary").addEventListener("click", limpiar);
    document.getElementById("btnModificar").addEventListener("click", modificar);
    document.getElementById("btnEliminar").addEventListener("click", eliminar);
    document.getElementById("contenedorFiguritas").addEventListener("click", function(e) {
        if (!e.target.closest("button") && idSeleccionado) {
            limpiar();
        }
    });
    document.getElementById("fileImagen").addEventListener("change", preview);
    limpiar();
    obtenerFiguritas();
});

function obtenerFiguritas() {
    mostrarSpinner();
    fetch(URL_API)
        .then(function(res) { return res.json(); })
        .then(function(data) {
            figuritas = data.data;
            filtradas = data.data;
            mostrarFiguritas();
            actualizarBadge();
            ocultarSpinner();
        })
        .catch(function() {
            ocultarSpinner();
            alerta("Error al cargar figuritas", "danger");
        });
}

function mostrarFiguritas() {
    var totalPaginas = Math.ceil(filtradas.length / ITEMS_POR_PAGINA);
    if (totalPaginas === 0) totalPaginas = 1;
    var inicio = (pagina - 1) * ITEMS_POR_PAGINA;
    var fin = inicio + ITEMS_POR_PAGINA;
    var sublista = filtradas.slice(inicio, fin);
    var html = "";
    for (var i = 0; i < sublista.length; i++) {
        html += crearCard(sublista[i]);
    }
    document.getElementById("contenedorFiguritas").innerHTML = html;
    document.getElementById("infoPagina").textContent = "Página " + pagina + " de " + totalPaginas;
}
//profe te devuelve una ruta relativa 
function crearCard(fig) {
    var seleccionada = fig._id == idSeleccionado ? "border border-primary border-2" : "";
    var bandera = banderas[fig.pais] || "";
    return `
        <div class="col">
            <div class="card h-100 ${seleccionada}">
                <img src="https://figuritas-api.onrender.com/${fig.imagen}" class="card-img-top" style="height:180px;object-fit:cover">
                <div class="card-body">
                    <h6>${fig.nombre}</h6>
                    <p>${bandera} ${fig.pais}</p>
                    <p>$${fig.precio}</p>
                    <small class="text-muted">ID: ${fig._id}</small>
                </div>
                <div class="card-footer">
                    <button class="btn btn-primary btn-sm me-1" onclick="seleccionar('${fig._id}')"><i class="bi bi-pencil-square"></i> Seleccionar</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarDirecto('${fig._id}')"><i class="bi bi-trash"></i> Eliminar</button>
                </div>
            </div>
        </div>`;
}

function guardar() {
    if (!validar(true)) return;
    var formData = new FormData();
    formData.append("nombre", document.getElementById("txtNombre").value.trim());
    formData.append("pais", document.getElementById("selectPais").value);
    formData.append("precio", document.getElementById("txtPrecio").value);
    formData.append("imagen", document.getElementById("fileImagen").files[0]);
    mostrarSpinner();
    fetch(URL_API, { method: "POST", body: formData })
        .then(function(res) { return res.json(); })
        .then(function() {
            ocultarSpinner();
            alerta("Figurita guardada con éxito", "success");
            limpiar();
            obtenerFiguritas();
        })
        .catch(function() {
            ocultarSpinner();
            alerta("Error al guardar", "danger");
        });
    console.log("guardar")
}

function seleccionar(id) {
    var fig = null;
    for (var i = 0; i < figuritas.length; i++) {
        if (figuritas[i]._id == id) {
            fig = figuritas[i];
            break;
        }
    }
    idSeleccionado = id;
    document.getElementById("txtId").value = fig._id;
    document.getElementById("txtNombre").value = fig.nombre;
    document.getElementById("selectPais").value = fig.pais;
    document.getElementById("txtPrecio").value = fig.precio;
    document.getElementById("previewImagen").src = "https://figuritas-api.onrender.com/" + fig.imagen;
    document.getElementById("badgeModo").textContent = "Modo: Modificación";
    document.getElementById("requiredImg").style.display = "none";
    document.getElementById("btnModificar").disabled = false;
    document.getElementById("btnEliminar").disabled = false;
    mostrarFiguritas();
    var tabEl = document.querySelector('[data-bs-target="#tab-formulario"]');
    new bootstrap.Tab(tabEl).show();
}

function modificar() {
    if (!idSeleccionado) return;
    if (!validar(false)) return;
    var formData = new FormData();
    formData.append("nombre", document.getElementById("txtNombre").value.trim());
    formData.append("pais", document.getElementById("selectPais").value);
    formData.append("precio", document.getElementById("txtPrecio").value);
    var imagen = document.getElementById("fileImagen").files[0];
    if (imagen) formData.append("imagen", imagen);
    mostrarSpinner();
    fetch(URL_API + "/" + idSeleccionado, { method: "PUT", body: formData })
        .then(function(res) { return res.json(); })
        .then(function() {
            ocultarSpinner();
            alerta("Figurita modificada!!", "success");
            limpiar();
            obtenerFiguritas();
        })
        .catch(function() {
            ocultarSpinner();
            alerta("Error al quere modificar", "danger");
        });
}

function eliminar() {
    if (!idSeleccionado) return;
    if (!confirm("¿Quiere eliminar esta figurita?")) return;
    mostrarSpinner();
    fetch(URL_API + "/" + idSeleccionado, { method: "DELETE" })
        .then(function(res) { return res.json(); })
        .then(function() {
            ocultarSpinner();
            alerta("Figurita eliminada!!", "success");
            limpiar();
            obtenerFiguritas();
        })
        .catch(function() {
            ocultarSpinner();
            alerta("Error al eliminar la figurita", "danger");
        });
}

function eliminarDirecto(id) {
    if (!confirm("¿Quiere eliminar esta figurita?")) return;
    mostrarSpinner();
    fetch(URL_API + "/" + id, { method: "DELETE" })
        .then(function(res) { return res.json(); })
        .then(function() {
            ocultarSpinner();
            alerta("Figurita eliminada", "success");
            obtenerFiguritas();
        })
        .catch(function() {
            ocultarSpinner();
            alerta("Error al eliminar", "danger");
        });
}

function validar(esAlta) {
    var valido = true;
    var nombre = document.getElementById("txtNombre").value.trim();
    var pais = document.getElementById("selectPais").value;
    var precio = Number(document.getElementById("txtPrecio").value);
    var imagen = document.getElementById("fileImagen").files[0];

    if (nombre.length >= NOMBRE_MIN && nombre.length <= NOMBRE_MAX) {
        document.getElementById("txtNombre").classList.remove("is-invalid");
        document.getElementById("txtNombre").classList.add("is-valid");
    } else {
        document.getElementById("txtNombre").classList.remove("is-valid");
        document.getElementById("txtNombre").classList.add("is-invalid");
        valido = false;
    }

    if (pais) {
        document.getElementById("selectPais").classList.remove("is-invalid");
        document.getElementById("selectPais").classList.add("is-valid");
    } else {
        document.getElementById("selectPais").classList.remove("is-valid");
        document.getElementById("selectPais").classList.add("is-invalid");
        valido = false;
    }

    if (precio >= PRECIO_MIN && precio <= PRECIO_MAX) {
        document.getElementById("txtPrecio").classList.remove("is-invalid");
        document.getElementById("txtPrecio").classList.add("is-valid");
    } else {
        document.getElementById("txtPrecio").classList.remove("is-valid");
        document.getElementById("txtPrecio").classList.add("is-invalid");
        valido = false;
    }

    if (esAlta) {
        if (imagen && FORMATOS_IMAGEN.includes(imagen.type) && imagen.size <= MAX_IMAGEN_SIZE) {
            document.getElementById("fileImagen").classList.remove("is-invalid");
            document.getElementById("fileImagen").classList.add("is-valid");
        } else {
            document.getElementById("fileImagen").classList.remove("is-valid");
            document.getElementById("fileImagen").classList.add("is-invalid");
            valido = false;
        }
    }

    return valido;
}

function limpiar() {
    document.getElementById("formFigurita").reset();
    document.getElementById("txtId").value = "";
    document.getElementById("previewImagen").src = "./img/copa.jpg";
    document.getElementById("badgeModo").textContent = "Modo: Alta";
    document.getElementById("requiredImg").style.display = "";
    document.getElementById("btnModificar").disabled = true;
    document.getElementById("btnEliminar").disabled = true;
    idSeleccionado = null;
    var campos = ["txtNombre", "selectPais", "txtPrecio", "fileImagen"];
    for (var i = 0; i < campos.length; i++) {
        document.getElementById(campos[i]).classList.remove("is-valid", "is-invalid");
    }
}

function preview() {
    var archivo = document.getElementById("fileImagen").files[0];
    if (!archivo) return;
    if (!FORMATOS_IMAGEN.includes(archivo.type) || archivo.size > MAX_IMAGEN_SIZE) {
        document.getElementById("fileImagen").classList.add("is-invalid");
        document.getElementById("fileImagen").classList.remove("is-valid");
        return;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById("previewImagen").src = e.target.result;
    };
    reader.readAsDataURL(archivo);
    document.getElementById("fileImagen").classList.remove("is-invalid");
    document.getElementById("fileImagen").classList.add("is-valid");
}

function mostrarSpinner() {
    document.getElementById("spinner").style.display = "flex";
}

function ocultarSpinner() {
    document.getElementById("spinner").style.display = "none";
}

function filtrar() {
}

function limpiarFiltros() {
}

function ordenar() {
}

function promedio() {
}

function cambiarPagina(dir) {
}

function alerta(mensaje, tipo) {
    var div = document.createElement("div");
    div.className = "alert alert-" + tipo + " alert-dismissible fade show";
    div.innerHTML = mensaje + '<button type="button" class="btn-close" data-bs-dismiss="alert"></button>';
    document.getElementById("alertas").appendChild(div);
    setTimeout(function() { div.remove(); }, 4000);
}

function actualizarBadge() {
    document.getElementById("badgeTotal").textContent = figuritas.length + " figuritas";
}

function estadisticas() {
}

function exportarCSV() {
}

function toggleTema() {
}

function cargarTemaGuardado() {
}
