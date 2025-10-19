# TP2 - Flexbox:
# Portal de Noticias Responsive:
Proyecto práctico para **Introducción a la Programación Web**.  
El objetivo fue crear la **portada de un diario digital** con un diseño propio, aplicando **Responsive Design** con **Flexbox** y **media queries** bajo el enfoque **Mobile First**
# Características:
**Diseño Mobile First:** pensado primero para celulares y luego adaptado a tablet y escritorio con media queries.
**Flexbox + Grid:** para crear un layout flexible y organizado.
**Menú de navegación adaptable:**  
En **desktop**: barra horizontal con links.  
En **mobile**: ícono hamburguesa ☰.
**Noticias principales con imagen y descripción.**
**Noticias secundarias con títulos y autores.**
**Sección “Lo más visto”.**
 Uso de un **normalizador de CSS** (`normalize.css`) para consistencia entre navegadores.

# Link del noticias:
<https://elpais.com/argentina/>
# link de GitHub Pages:
<https://francocorbalan09.github.io/portal_de_noticia/>

# Clase_9:
# Descripción del Trabajo:
Página de suscripción para el diario online con validación completa de formularios usando JavaScript. El formulario mantiene la estética del sitio y cuenta con diseño responsive.
# Características:
Debe estar ubicado en un archivo nuevo: `subscription.html`
 Mantener la cabecera y pie de página del diario original.
 El formulario debe contener los siguientes campos:
 Nombre completo
 Email
 Contraseña
 Repetir contraseña
 Edad
 Teléfono
 Dirección
 Ciudad
 Código postal
 DNI
 Un botón **"Enviar"**, centrado al final del formulario.
 Agregar un título dinámico al formulario:
 Mostrar un título `HOLA [Nombre completo]`, que se actualiza **en tiempo real** mientras el usuario escribe en el campo "Nombre completo".
 Usar eventos `keydown` y `focus` sobre el campo. 
 El título debe ir cambiando mientras se escribe.
# Diseño responsive
**En móvil:** los campos deben mostrarse uno debajo del otro.
**En escritorio:** los campos deben estar distribuidos en **dos columnas**, con el botón “Enviar” **centrado horizontalmente** debajo.

# Clase_10:
# Descripción del Trabajo
Página de suscripción para el diario online con validación completa de formularios usando JavaScript. El formulario mantiene la estética del sitio y cuenta con diseño responsive. Se extiende la funcionalidad de la Semana 08 incorporando envío HTTP GET con query params, modal de resultados y persistencia en LocalStorage.
# Características
Ubicado en un archivo nuevo: subscription.html.
Mantiene cabecera y pie de página del diario original.
Campos del formulario:
Nombre completo
Email
Contraseña
Repetir contraseña
Edad
Teléfono
Dirección
Ciudad
Código postal
DNI
Un botón “Enviar”, centrado al final del formulario.
Título dinámico del formulario:
Mostrar HOLA [Nombre completo] y actualizarlo en tiempo real mientras el usuario escribe.
Usar eventos keydown, input y focus sobre el campo Nombre completo.
El título debe reflejar el texto ingresado y volver al título por defecto cuando el campo queda vacío.
# Validación
Validación en cliente por campo (on blur) y al enviar:
Nombre completo: mínimo 7 caracteres y debe contener un espacio.
Email: formato usuario@dominio.tld.
Contraseña: ≥ 8 caracteres, al menos una letra y un número.
Repetir contraseña: debe coincidir con la anterior.
Edad: número entero ≥ 18.
Teléfono: solo dígitos, mínimo 7.
Dirección: mínimo 5 caracteres, debe incluir letras, números y un espacio.
Ciudad / Código Postal: mínimo 3 caracteres.
DNI: 7 u 8 dígitos.
Visualización de errores por campo (clase error) y listado agregado al abrir el modal cuando la validación general falla.
En el primer error del formulario, se realiza scrollIntoView al grupo con error.
# Envío de datos 
Al presionar “Enviar”, si la validación es correcta:
Se recolectan todos los datos del formulario (inputs, selects, textareas).
Se envían mediante método GET a https://jsonplaceholder.typicode.com/posts usando query params.
Se verifica la respuesta con response.ok y response.status.
Éxito: se muestra un modal con el mensaje de confirmación y los datos devueltos por el servidor.

# Link del noticias:
<https://elpais.com/argentina/>

# link de GitHub Pages:
<https://francocorbalan09.github.io/portal_de_noticia/>
