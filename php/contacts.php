<?php 

function fetchContacts(){
    $db = dbConnect();
    $sql = "SELECT * FROM contact";
    $query= $db->query($sql);
    $contacts = $query->fetchAll();
    return $contacts;
}

?>