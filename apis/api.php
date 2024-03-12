<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// usuarios_api.php
require_once '../db/config.php';
$pestania = $_GET['pestania'];



// Consulta para obtener todas las Categorias
$query1 = "SELECT id_categoria, nombre, parent_id FROM Categorias WHERE id_pestania = '$pestania' ORDER BY nombre ";
$stmt1 = $pdo->query($query1);
$categorias = $stmt1->fetchAll();

// Consulta para obtener todas las Pestania
$query2 = "SELECT id, nombre from pestanias";
$stmt2 = $pdo->query($query2);
$pestanias = $stmt2->fetchAll();

// Consulta para obtener todas las Capas
$query3 = "SELECT id_capa, titulo, id_categoria, id_pestania, tipo_capa FROM capas WHERE id_pestania = '$pestania' ORDER BY id_pestania";
$stmt3 = $pdo->query($query3);
$capas = $stmt3->fetchAll();

// Consulta para obtener todas las Capas
$query4 = "SELECT id_capa, titulo, tipo_capa FROM capas ORDER BY titulo";
$stmt4 = $pdo->query($query4);
$capas_todas = $stmt4->fetchAll();



// Devuelve los usuarios en formato JSON
header('Content-Type: application/json');

$response = array(
    'Categorias' => $categorias,
    'Pestanias' => $pestanias,
    'Capas' => $capas,
    'CapasTodas' => $capas_todas
);

echo json_encode($response);



?>
