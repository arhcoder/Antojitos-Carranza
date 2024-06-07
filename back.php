<?php
// Configuración de la Base de Datos:
$servername = "localhost";
$username = "user";
$password = "password";
$dbname = "database_name";

// Crea la conexión:
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica la conexión:
if ($conn->connect_error) {
  die("Conexión fallida: " . $conn->connect_error);
}

// Se limpia el string de comentario para evitar inyección de SQL:
$comentario = $conn->real_escape_string($_POST['comentario']);

// Se prepara la consulta SQL:
$sql = "INSERT INTO comentarios (comentario) VALUES (?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $comentario);

// Se ejecuta la consulta:
if ($stmt->execute()) {
  echo "Comentario guardado correctamente ;3";
} else {
  echo "Error al guardar el comentario :c " . $stmt->error;
}

// Se cierra conexión:
$stmt->close();
$conn->close();
?>