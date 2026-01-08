<?php
// ==========================
// CONFIG & CORS
// ==========================
error_reporting(E_ALL);
ini_set('display_errors', 0);
header_remove('Access-Control-Allow-Origin');

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowed_origins = ['http://localhost:5173', 'http://localhost:5174'];

if ($origin && in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header("Access-Control-Allow-Origin: http://localhost:5174");
}
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once "dbConnect.php";

// ==========================
// FONCTIONS
// ==========================
function getRdv() {
    $db = dbConnect();
    $sql = "SELECT r.*, c.name as contact_name, c.email as contact_email, c.phone as contact_phone 
            FROM rdv r 
            LEFT JOIN contact c ON r.id_contact = c.id 
            ORDER BY r.schedule ASC";
    $stmt = $db->query($sql);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function addRdv($data) {
    $db = dbConnect();
    $sql = "INSERT INTO rdv (place, schedule, id_contact)
            VALUES (:place, :schedule, :id_contact)";
    $stmt = $db->prepare($sql);
    $stmt->execute([
        "place" => $data['place'],
        "schedule" => $data['schedule'],
        "id_contact" => $data['id_contact']
    ]);
    return ["success" => true, "id" => $db->lastInsertId()];
}

function updateRdv($id, $data) {
    $db = dbConnect();
    $sql = "UPDATE rdv SET place=:place, schedule=:schedule, id_contact=:id_contact WHERE id=:id";
    $stmt = $db->prepare($sql);
    $stmt->execute([
        "id" => $id,
        "place" => $data['place'],
        "schedule" => $data['schedule'],
        "id_contact" => $data['id_contact']
    ]);
    return ["success" => true];
}

function deleteRdv($id) {
    $db = dbConnect();
    $sql = "DELETE FROM rdv WHERE id=:id";
    $stmt = $db->prepare($sql);
    $stmt->execute(["id" => $id]);
    return ["success" => true];
}

// ==========================
// ROUTAGE
// ==========================
$method = $_SERVER['REQUEST_METHOD'];
$inputData = json_decode(file_get_contents("php://input"), true);

try {
    if ($method === 'GET') {
        echo json_encode(getRdv());
        exit;
    }

    if ($method === 'POST') {
        if (!$inputData) throw new Exception("Aucune donnée reçue");
        if (!isset($inputData['place']) || !isset($inputData['schedule']) || !isset($inputData['id_contact'])) {
            throw new Exception("Place, schedule et id_contact requis");
        }
        echo json_encode(addRdv($inputData));
        exit;
    }

    if ($method === 'PUT') {
        if (!$inputData || !isset($inputData['id'])) throw new Exception("ID requis pour update");
        $id = $inputData['id'];
        echo json_encode(updateRdv($id, $inputData));
        exit;
    }

    if ($method === 'DELETE') {
        if (!$inputData || !isset($inputData['id'])) throw new Exception("ID requis pour delete");
        $id = $inputData['id'];
        echo json_encode(deleteRdv($id));
        exit;
    }

    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Méthode non autorisée"]);
    exit;

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
    exit;
}
?>
