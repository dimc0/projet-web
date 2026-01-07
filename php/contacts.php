<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once "db.php";

function fetchContacts(){
    $db = dbConnect();
    $sql = "SELECT * FROM contact";
    $query = $db->query($sql);
    return $query->fetchAll(PDO::FETCH_ASSOC);
}

$contacts = fetchContacts();

echo json_encode($contacts);
?>
