var mensaje = document.getElementById('mensaje');
var formulario = document.getElementById('subscription_formulario');
var validadores = {
    nombre_completo: function(valor) {
        var sin_espacios_extremos = valor.trim();
        var tiene_espacio = sin_espacios_extremos.indexOf(' ') !== -1;
        var solo_letras = sin_espacios_extremos.replace(/\s/g, '');
        return solo_letras.length > 6 && tiene_espacio;
    },
    email: function(valor) {
        var expresion_email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return expresion_email.test(valor);
    },
    password: function(valor) {
        var tiene_letra = /[a-zA-Z]/.test(valor);
        var tiene_numero = /[0-9]/.test(valor);
        return valor.length >= 8 && tiene_letra && tiene_numero;
    },
    confirma_password: function(valor, datos_formulario) {
        var contrasena = document.getElementById('password').value;
        return valor === contrasena;
    },
    edad: function(valor) {
        var edad = parseInt(valor);
        return !isNaN(edad) && edad >= 18;
    },
    telefono: function(valor) {
        var solo_digitos = /^\d{7,}$/;
        return solo_digitos.test(valor);
    },
    direccion: function(valor) {
        var tiene_espacio = valor.indexOf(' ') !== -1;
        var tiene_letras = /[a-zA-Z]/.test(valor);
        var tiene_numeros = /[0-9]/.test(valor);
        return valor.length >= 5 && tiene_espacio && tiene_letras && tiene_numeros;
    },
    ciudad: function(valor) {
        return valor.trim().length >= 3;
    },
    codigo_postal: function(valor) {
        return valor.trim().length >= 3;
    },
    dni: function(valor) {
        var solo_digitos = /^\d+$/;
        return solo_digitos.test(valor) && (valor.length === 7 || valor.length === 8);
    }
};
function validar_campo(nombre_campo, valor, datos_formulario) {
    var validador = validadores[nombre_campo];
    if (validador) {
        return validador(valor, datos_formulario);
    }
    return true;
}
function mostrar_error(nombre_campo) {
    var input = document.getElementById(nombre_campo);
    var grupo_formulario = input.parentElement;
    grupo_formulario.classList.add('error');
}
function limpiar_error(nombre_campo) {
    var input = document.getElementById(nombre_campo);
    var grupo_formulario = input.parentElement;
    grupo_formulario.classList.remove('error');
}
var inputs = formulario.querySelectorAll('input');
for (var i = 0; i < inputs.length; i++) {
    (function(input) {
        input.addEventListener('blur', function() {
            var es_valido = validar_campo(input.name, input.value);
            if (es_valido) {
                limpiar_error(input.name);
            } else {
                mostrar_error(input.name);
            }
        });
        input.addEventListener('focus', function() {
            limpiar_error(input.name);
        });
    })(inputs[i]);
}
formulario.addEventListener('submit', function(e) {
    e.preventDefault();
    var es_valido = true;
    var errores = [];
    var datos_formulario = {};
    var grupos_formulario = formulario.querySelectorAll('.formulario_grupo');
    for (var i = 0; i < grupos_formulario.length; i++) {
        grupos_formulario[i].classList.remove('error');
    }
    for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        var nombre_campo = input.name;
        var valor = input.value;
        if (!validar_campo(nombre_campo, valor)) {
            mostrar_error(nombre_campo);
            es_valido = false;
            var etiqueta = input.previousElementSibling;
            if (etiqueta && etiqueta.tagName === 'LABEL') {
                errores.push(etiqueta.textContent.replace(' *', ''));
            }
        } else {
            datos_formulario[nombre_campo] = valor;
        }
    }
    if (es_valido) {
        enviar_datos_servidor(datos_formulario);
    } else {
        var primer_error = formulario.querySelector('.formulario_grupo.error');
        if (primer_error) {
            primer_error.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        var contenido = '<p>Por favor corrija los siguientes campos:</p>';
        contenido += '<ul class="lista_errores">';
        for (var i = 0; i < errores.length; i++) {
            contenido += '<li>' + errores[i] + '</li>';
        }
        contenido += '</ul>';
        mostrar_modal('Errores en el Formulario', contenido, false);
    }
});
var input_nombre_completo = document.getElementById('nombre_completo');
var titulo_formulario = document.querySelector('.formulario_contenedor h2');
input_nombre_completo.addEventListener('input', function() {
    var nombre = input_nombre_completo.value.trim();
    if (nombre) {
        titulo_formulario.textContent = 'HOLA ' + nombre.toUpperCase();
    } else {
        titulo_formulario.textContent = 'Formulario de Suscripción';
    }
});
input_nombre_completo.addEventListener('focus', function() {
    var nombre = input_nombre_completo.value.trim();
    if (nombre) {
        titulo_formulario.textContent = 'HOLA ' + nombre.toUpperCase();
    }
});
input_nombre_completo.addEventListener('blur', function() {
    if (!input_nombre_completo.value.trim()) {
        titulo_formulario.textContent = 'Formulario de Suscripción';
    }
});
function mostrar_modal(titulo, contenido, es_exito) {
    var modal = document.getElementById('modal_resultado');
    var modal_titulo = document.getElementById('modal_titulo');
    var modal_contenido = document.getElementById('modal_contenido');
    modal_titulo.textContent = titulo;
    modal_contenido.innerHTML = contenido;
    if (es_exito) {
        modal.classList.add('exito');
        modal.classList.remove('error');
    } else {
        modal.classList.add('error');
        modal.classList.remove('exito');
    }
    modal.style.display = 'flex';
}
function cerrar_modal() {
    var modal = document.getElementById('modal_resultado');
    modal.style.display = 'none';
}
function enviar_datos_servidor(datos_formulario) {
    var url = 'https://jsonplaceholder.typicode.com/posts?';
    var params = [];
    for (var campo in datos_formulario) {
        params.push(encodeURIComponent(campo) + '=' + encodeURIComponent(datos_formulario[campo]));
    }
    url += params.join('&');
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(function(response) {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error en la respuesta del servidor: ' + response.status);
        }
    })
    .then(function(data) {
        localStorage.setItem('datos_suscripcion', JSON.stringify(datos_formulario));
        localStorage.setItem('respuesta_servidor', JSON.stringify(data));
        var contenido = '<p>¡Tu suscripción ha sido procesada exitosamente!</p>';
        contenido += '<div class="datos_respuesta">';
        contenido += '<h3>Datos enviados:</h3>';
        contenido += '<p><strong>Nombre Completo:</strong> ' + datos_formulario.nombre_completo + '</p>';
        contenido += '<p><strong>Email:</strong> ' + datos_formulario.email + '</p>';
        contenido += '<p><strong>Contraseña:</strong> ' + datos_formulario.password + '</p>';
        contenido += '<p><strong>Edad:</strong> ' + datos_formulario.edad + ' años</p>';
        contenido += '<p><strong>Teléfono:</strong> ' + datos_formulario.telefono + '</p>';
        contenido += '<p><strong>Dirección:</strong> ' + datos_formulario.direccion + '</p>';
        contenido += '<p><strong>Ciudad:</strong> ' + datos_formulario.ciudad + '</p>';
        contenido += '<p><strong>Código Postal:</strong> ' + datos_formulario.codigo_postal + '</p>';
        contenido += '<p><strong>DNI:</strong> ' + datos_formulario.dni + '</p>';
        contenido += '</div>';
        mostrar_modal('¡Suscripción Exitosa!', contenido, true);
        formulario.reset();
    })
    .catch(function(error) {
        var contenido = '<p>Hubo un problema al procesar tu suscripción.</p>';
        contenido += '<p>Por favor, intenta nuevamente más tarde.</p>';
        
        mostrar_modal('Error en la Suscripción', contenido, false);
    });
}
window.addEventListener('load', function() {
    var datos_guardados = localStorage.getItem('datos_suscripcion');
    if (datos_guardados) {
        try {
            var datos = JSON.parse(datos_guardados);
            for (var campo in datos) {
                var input = document.getElementById(campo);
                if (input && campo !== 'password' && campo !== 'confirma_password') {
                    input.value = datos[campo];
                }
            }
            console.log('Datos cargados desde LocalStorage');
        } catch (error) {
            console.error('Error al cargar datos desde LocalStorage:', error);
        }
    }
});