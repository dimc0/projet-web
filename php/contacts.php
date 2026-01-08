<?php
// ==========================
// CONFIG & CORS
// ==========================
error_reporting(E_ALL);
ini_set('display_errors', 0); // empêche les warnings d’envoyer du HTML
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
function getContacts() {
    $db = dbConnect();
    $stmt = $db->query("SELECT * FROM contact");
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function addContact($data) {
    $db = dbConnect();
    $sql = "INSERT INTO contact (name, email, phone, source, note, id_status)
            VALUES (:name, :email, :phone, :source, :note, :id_status)";
    $stmt = $db->prepare($sql);
    $stmt->execute([
        "name" => $data['name'],
        "email" => $data['email'],
        "phone" => $data['phone'] ?? '',
        "source" => $data['source'] ?? '',
        "note" => $data['note'] ?? '',
        "id_status" => 1  // par défaut, nouveau prospect
    ]);
    return ["success" => true, "id" => $db->lastInsertId()];
}

function updateContact($id, $data) {
    $db = dbConnect();
    $sql = "UPDATE contact SET name=:name, email=:email, phone=:phone, source=:source, note=:note WHERE id=:id";
    $stmt = $db->prepare($sql);
    $stmt->execute([
        "id" => $id,
        "name" => $data['name'],
        "email" => $data['email'],
        "phone" => $data['phone'] ?? '',
        "source" => $data['source'] ?? '',
        "note" => $data['note'] ?? ''
    ]);
    return ["success" => true];
}

function deleteContact($id) {
    $db = dbConnect();
    $sql = "DELETE FROM contact WHERE id=:id";
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
        echo json_encode(getContacts());
        exit;
    }

    if ($method === 'POST') {
        if (!$inputData) throw new Exception("Aucune donnée reçue");
        echo json_encode(addContact($inputData));
        exit;
    }

    if ($method === 'PUT') {
        if (!$inputData || !isset($inputData['id'])) throw new Exception("ID requis pour update");
        $id = $inputData['id'];
        echo json_encode(updateContact($id, $inputData));
        exit;
    }

    if ($method === 'DELETE') {
        if (!$inputData || !isset($inputData['id'])) throw new Exception("ID requis pour delete");
        $id = $inputData['id'];
        echo json_encode(deleteContact($id));
        exit;
    }

    // Méthode non autorisée
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Méthode non autorisée"]);
    exit;

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
    exit;
}
