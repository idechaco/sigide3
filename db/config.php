<?php
// config.php
$dsn = "mysql:host=localhost;dbname=sigidesf2;port=3320;charset=utf8mb4";
$options = [
    PDO::ATTR_EMULATE_PREPARES => false,
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
    $pdo = new PDO($dsn, "root", "VDGM!2023!", $options);
} catch (Exception $e) {
    error_log($e->getMessage());
    exit('Algo salió mal');
}
?>

