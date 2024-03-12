<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// usuarios_api.php
require_once '../db/config.php';

// Consulta para obtener todas las Categorias
$query1 = "SELECT id_categoria, nombre, id_pestania, parent_id FROM categorias WHERE id_espacio = 1 ORDER BY parent_id, nombre ";
$stmt1 = $pdo->query($query1);
$categorias = $stmt1->fetchAll();

// Consulta para obtener todas las Pestania
$query2 = "SELECT id, nombre from pestanias WHERE id_espacio = 1";
$stmt2 = $pdo->query($query2);
$pestanias = $stmt2->fetchAll();

// Consulta para obtener todas las Capas
$query3 = "SELECT id_capa, titulo, id_categoria, id_pestania, tipo_capa FROM capas ORDER BY titulo ";
$stmt3 = $pdo->query($query3);
$capas = $stmt3->fetchAll();

// Consulta para obtener todas las Capas
$query4 = "SELECT id_recurso, titulo, archivo, id_categoria, tipo, id_pestania FROM recursos ORDER BY titulo ";
$stmt4 = $pdo->query($query4);
$recursos = $stmt4->fetchAll();



// Devuelve los usuarios en formato JSON
header('Content-Type: application/json');

$response = array(
    'Categorias' => $categorias,
    'Pestanias' => $pestanias,
    'Capas' => $capas,
    'Recursos' => $recursos  
);

echo json_encode($response);



?>
