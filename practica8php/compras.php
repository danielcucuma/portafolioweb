<?php
$host = "localhost";
$db   = "autos";
$user = "root";
$pass = "";
$charset = "utf8mb4";

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
  PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
  PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
  $pdo = new PDO($dsn, $user, $pass, $options);

  $sql = "
    SELECT 
      c.id AS id,
      m.nombre AS modelo,
      u.nombre AS usuario,
      c.folio AS folio
    FROM compra AS c
    INNER JOIN modelo   AS m ON c.idModelo  = m.id
    INNER JOIN usuarios AS u ON c.idUsuario = u.id
    ORDER BY c.id;
  ";
  $stmt = $pdo->query($sql);
  $compras = $stmt->fetchAll();
  
} catch (Throwable $e) {
  $compras = []; // evita romper la vista
}
