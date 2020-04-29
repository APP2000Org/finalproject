
<?php

//Kode laget av Sondre Kristoffer Reinholdtsen StudNr: 225274

$temp = $_GET['funksjonsnavn'];
$tabellen = $_GET['tabellen'];
$kollonen = $_GET['kollonen'];
$verdien = $_GET['verdien'];

//Lag en variablel som kobler mot en database.
$tilkobling = new mysqli("boeventerno01.mysql.domeneshop.no",
            "boeventerno01",
            "grebben-stolrad-Tadsjiker-5krigsgass",
               "boeventerno01");


//Sjekker om tilkoblingen fungerer, hvis ikke lever feilmelding og avslutt
if($tilkobling->connect_error) {
 	die("Tilkobling til databasen feilet: " . $tilkobling->connect_error); 
}

$temp($tilkobling,$tabellen,$kollonen,$verdien);


function hentBilde($tilkobling,$tabellen,$kollonen,$verdien){

$sql = "SELECT frontBildeAdresse FROM " . $tabellen . " WHERE " . $kollonen . " = " .  $verdien;
$sth = $tilkobling->query($sql);
$result=mysqli_fetch_array($sth);

//Konverterer blob dataen til base64 encoded data slik at det blir lettere å rendre i react
$image = base64_encode( $result['frontBildeAdresse'] );

echo $image;
}
?>