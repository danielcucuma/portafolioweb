// Actualiza el <output> del range en vivo
const nivelInput = document.getElementById('nivel');
const nivelOut = document.getElementById('nivelOut');
if (nivelInput && nivelOut) {
  nivelInput.addEventListener('input', () => {
    nivelOut.value = nivelInput.value;
  });
}

// Función llamada por el botón (requerimiento)
function handleSubmit(evt) {
  // Si el botón estuviera dentro de un <form> con type="submit", previene envío:
  if (evt && typeof evt.preventDefault === 'function') evt.preventDefault();

  const form = document.getElementById('dataForm');
  const errorsBox = document.getElementById('errors');

  const nombre = document.getElementById('nombre').value.trim();
  const correoEl = document.getElementById('correo');
  const correo = correoEl.value.trim();

  const checkboxes = Array.from(document.querySelectorAll('input[name="intereses"]:checked'));
  const radios = document.querySelector('input[name="preferencia"]:checked');

  const cita = document.getElementById('cita').value;
  const color = document.getElementById('color').value;
  const nivel = document.getElementById('nivel').value;

  // Validaciones (indicando qué campo falta)
  const faltantes = [];

  if (!nombre) faltantes.push('Nombre');
  if (!correo) {
    faltantes.push('Correo');
  } else if (!correoEl.checkValidity()) {
    faltantes.push('Correo (formato inválido)');
  }

  if (checkboxes.length === 0) faltantes.push('Intereses (selecciona al menos uno)');
  if (!radios) faltantes.push('Preferencia (elige una)');
  if (!cita) faltantes.push('Fecha y hora');
  if (!color) faltantes.push('Color');
  // El range siempre tiene algún valor, así que solo verificamos presencia (opc.).
  if (nivel === '' || nivel === null || typeof nivel === 'undefined') {
    faltantes.push('Nivel');
  }

  if (faltantes.length > 0) {
    errorsBox.style.display = 'block';
    errorsBox.innerHTML = `<ul>${faltantes.map(f => `<li>${f}</li>`).join('')}</ul>`;
    return;
  } else {
    errorsBox.style.display = 'none';
    errorsBox.innerHTML = '';
  }

  // Si todo está OK, agregar a la tabla
  const interesesTexto = checkboxes.map(cb => cb.value).join(', ');
  const preferenciaTexto = radios ? radios.value : '';

  // Formatear datetime-local a "YYYY-MM-DD HH:mm"
  const fechaMostrada = cita.replace('T', ' ');

  const tbody = document.getElementById('dataTableBody');
  const tr = document.createElement('tr');

  const celdas = [
    nombre,
    correo,
    interesesTexto,
    preferenciaTexto,
    fechaMostrada,
    null, // color (lo mostraremos como swatch + hex)
    nivel
  ];

  celdas.forEach((valor, idx) => {
    const td = document.createElement('td');
    if (idx === 5) {
      // Color: dibujar muestra + texto hex
      const swatch = document.createElement('span');
      swatch.className = 'color-swatch';
      swatch.style.backgroundColor = color;
      td.appendChild(swatch);
      td.appendChild(document.createTextNode(color));
    } else {
      td.textContent = valor;
    }
    tr.appendChild(td);
  });

  tbody.appendChild(tr);

  // Limpiar formulario
  form.reset();
  // Restablecer valores visibles del range y output
  document.getElementById('nivel').value = 50;
  document.getElementById('nivelOut').value = 50;
}
