<?php
// pi.php
function aproximar_pi_tabla($n) {
    $suma = 0.0;
    $rows = [];
    for ($k = 0; $k <= $n; $k++) {
        $termino = ((($k % 2) === 0) ? 1 : -1) / (2*$k + 1);
        $suma += $termino;
        $aprox = 4 * $suma;
        $rows[] = ['n' => $k, 'x' => $aprox];
    }
    return $rows;
}

function leer_n() {
    if (!isset($_GET['n'])) return null;
    $raw = trim($_GET['n']);
    if ($raw === '') return null;
    if (!ctype_digit($raw)) return 'error_tipo';
    $n = intval($raw);
    if ($n <= 0) return 'error_rango';
    return $n;
}

$n = leer_n();
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Aproximación de π (pi)</title>
  <link rel="stylesheet" href="styles.css"/>
</head>
<body>
<header>
  <h1>Aproximación de π (pi)</h1>
  <nav>
    <a href="pi.php">π</a>
    <a href="e.php">e</a>
  </nav>
</header>

<main>
  <section class="card">
    <h2>Ingrese n (límite superior de la suma)</h2>
    <form method="get" action="pi.php" class="form">
      <label for="n">n (entero &gt; 0):</label>
      <input type="number" id="n" name="n" min="1" step="1" required
             value="<?php echo isset($_GET['n']) ? htmlspecialchars($_GET['n']) : '10'; ?>">
      <button type="submit">Calcular</button>
    </form>

    <?php if ($n === 'error_tipo'): ?>
      <p class="error">Error: n debe ser un número entero no negativo.</p>
    <?php elseif ($n === 'error_rango'): ?>
      <p class="error">Error: n debe ser mayor que cero.</p>
    <?php elseif (is_int($n)): 
        $tabla = aproximar_pi_tabla($n);
        $final = end($tabla)['x'];
    ?>
      <div class="resultado">
        <p><strong>Serie:</strong> π ≈ 4 * Σ<sub>k=0..n</sub> [ (-1)<sup>k</sup> / (2k+1) ]</p>
        <p><strong>n ingresado:</strong> <?php echo $n; ?></p>
        <p><strong>π aproximado:</strong> <?php echo number_format($final, 10); ?></p>
      </div>

      <table>
        <thead>
          <tr><th>n</th><th>x (aprox. π en la iteración)</th></tr>
        </thead>
        <tbody>
          <?php foreach ($tabla as $fila): ?>
            <tr>
              <td><?php echo $fila['n']; ?></td>
              <td><?php echo number_format($fila['x'], 10); ?></td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    <?php endif; ?>
  </section>
</main>

<footer>
  <small>Ejemplo académico · PHP + HTML + CSS</small>
</footer>
</body>
</html>
