/* ---------- 1) Equivalencia de calificación ---------- */
function evaluarCalificacion(valor) {
  const x = Number(valor);

  if (Number.isNaN(x) || x < 0 || x > 10) {
    return { ok: false, mensaje: "❌ Error: la calificación debe estar entre 0 y 10." };
  }

  let eq;
  if (x === 10) eq = "LAP";
  else if (x >= 9) eq = "MB";
  else if (x >= 7.5) eq = "B";
  else if (x >= 6) eq = "S";
  else eq = "NA";

  return { ok: true, mensaje: `Calificación ${x} ⇒ Equivalencia: ${eq}` };
}

document.getElementById("gradeForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const grade = document.getElementById("gradeInput").value;
  const res = evaluarCalificacion(grade);
  const out = document.getElementById("gradeResult");
  out.textContent = res.mensaje;
});

/* ---------- 2) Factorial recursivo ---------- */
function factorial(n) {
  // Validaciones
  if (!Number.isInteger(n) || n < 0) {
    throw new Error("El factorial solo está definido para enteros ≥ 0.");
  }
  // Casos base
  if (n === 0 || n === 1) return 1;
  // Recursión
  return n * factorial(n - 1);
}

document.getElementById("factForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const raw = Number(document.getElementById("factInput").value);
  const out = document.getElementById("factResult");

  try {
    const f = factorial(raw);
    out.textContent = `${raw}! = ${f}`;
  } catch (err) {
    out.textContent = `❌ Error: ${err.message}`;
  }
});

/* ---------- 3) Recolección e impresión de formulario ---------- */
document.getElementById("infoForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const edad = Number(document.getElementById("edad").value);
  const genero = (document.querySelector('input[name="genero"]:checked') || {}).value || "";
  const nacimiento = document.getElementById("nacimiento").value;
  const color = document.getElementById("color").value;

  const resumen = [
    `Nombre: ${nombre}`,
    `Correo: ${correo}`,
    `Edad: ${edad}`,
    `Género: ${genero}`,
    `Fecha de nacimiento: ${nacimiento}`,
    `Color favorito: ${color}`
  ].join(" | ");

  document.getElementById("infoResult").textContent = resumen;
});
