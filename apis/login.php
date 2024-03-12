<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// usuarios_api.php
require_once '../db/config.php';
$usuario = $_POST['usuario'];
$pass = $_POST['pass'];

$stmt = $pdo->query("SELECT id_usuario, apeynom, username, id_rol FROM usuarios WHERE username = '$usuario' AND password = '$pass'");
$login = $stmt->fetchAll();

//Luislar hOHIDyMG7LK16wDZEyzwXkhKDf421eQWuCxyMFoEAeVVivichw1Qkf1SeToTFPWJhtPp420XlRU/zgqSK6+sMw==
//Luislar2 17IvweElKRend0hPMKR95AF9vnAZBmoZaYDYbrRZhuhbmT1CCiZiPoqJIFKHU+V4fXVOb05Y0se65c8oMQ11zw==
$response = array(
    'Login' => $login,
    'Registro' => count($login)
);

// Devuelve los usuarios en formato JSON
header('Content-Type: application/json');

echo json_encode($response);



?>