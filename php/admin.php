<?php
// Configuration CORS pour développement
// Supprimer tout header CORS existant
header_remove('Access-Control-Allow-Origin');

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowed_origins = ['http://localhost:5173', 'http://localhost:5174'];

// Toujours définir le header CORS
if ($origin && in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    // Par défaut, autoriser le port 5174
    header("Access-Control-Allow-Origin: http://localhost:5174");
}
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once "dbConnect.php";

function fetchAdmins() {
    $db = dbConnect();
    $sql = "SELECT * FROM admin";
    $query = $db->query($sql);
    return $query->fetchAll(PDO::FETCH_ASSOC);
}

$admins = fetchAdmins();
echo json_encode($admins);
?>