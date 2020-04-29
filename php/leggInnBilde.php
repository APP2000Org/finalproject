<?php


$frontBildeAdresse = addslashes(file_get_contents($_FILES['frontBildeAdresse']['tmp_name']));


$Enr = $_POST['Enr'];


$db = mysqli_connect("boeventerno01.mysql.domeneshop.no",
            "boeventerno01",
            "grebben-stolrad-Tadsjiker-5krigsgass",
               "boeventerno01"); //keep your db name
$image = addslashes(file_get_contents($_FILES['frontBildeAdresse']['tmp_name']));
//you keep your column name setting for insertion. I keep image type Blob.
$query = "INSERT INTO arrangementbilder(ENr,frontBildeAdresse) VALUES('$Enr','$frontBildeAdresse')";  
$qry = mysqli_query($db, $query);




//Sjekker om tilkoblingen fungerer, hvis ikke lever feilmelding og avslutt
if($db->connect_error) {
 	die("Tilkobling til databasen feilet: " . $tilkobling->connect_error); 
}


?>