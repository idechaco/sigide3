<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');

    require_once '../db/config.php';

    $query = "SELECT id_capa_base, nombre, url, activo FROM capa_base ORDER BY orden";
    $stmt = $pdo->query($query);
    $capa_base = $stmt->fetchAll();

    // Devuelve los usuarios en formato JSON
    header('Content-Type: application/json');

    echo json_encode($capa_base);
?>

