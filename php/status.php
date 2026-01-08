<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once "dbConnect.php";

function fetchStatus() {
    $db = dbConnect();
    $sql = "SELECT * FROM status";
    $query = $db->query($sql);
    return $query->fetchAll(PDO::FETCH_ASSOC);
}

$status = fetchStatus();
echo json_encode($status);
?>