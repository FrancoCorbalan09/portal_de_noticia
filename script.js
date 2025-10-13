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
        }
    }
    if (es_valido) {
        mensaje.style.display = 'block';
        formulario.reset();
        setTimeout(function() {
            mensaje.style.display = 'none';
        }, 5000);
    } else {
        var primer_error = formulario.querySelector('.formulario_grupo.error');
        if (primer_error) {
            primer_error.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        alert('Por favor corrija los siguientes campos:\n- ' + errores.join('\n- '));
    }
});
var input_nombre_completo = document.getElementById('fullName');
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