<?php include 'obtener_compras.php'; ?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Compras</title>
  <link rel="stylesheet" href="tabla.css">
</head>
<body>
  <h1>Tabla de Compras</h1>

  <table class="tabla">
    <thead>
      <tr>
        <th>ID</th>
        <th>Modelo</th>
        <th>Usuario</th>
        <th>Folio</th>
      </tr>
    </thead>
    <tbody>
      <?php if (empty($compras)): ?>
        <tr><td colspan="4" class="vacio">No hay registros</td></tr>
      <?php else: ?>
        <?php foreach ($compras as $c): ?>
          <tr>
            <td><?= $c['id'] ?></td>
            <td><?= $c['modelo'] ?></td>
            <td><?= $c['usuario'] ?></td>
            <td><?= $c['folio'] ?></td>
          </tr>
        <?php endforeach; ?>
      <?php endif; ?>
    </tbody>
  </table>
</body>
</html>
