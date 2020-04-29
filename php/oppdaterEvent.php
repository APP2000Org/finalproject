<?php
//Laget av Patrick S. Lorentzen
//denne koden tar imot ett skjema som oppdaterer en eksisterende event. Gjør valideringsjekk.

$sted = $_POST['sted'];
$ENr = $_POST['ENr']; 
$tittel = $_POST['Tittel']; 
$fraDato = $_POST['FraDato'];
$tilDato = $_POST['TilDato'];
$beskrivelse = $_POST['Beskrivelse'];
$kategori = $_POST['Kategori'];
$adresse = $_POST['Adresse'];
$klokkeslett = $_POST['Klokkeslett'];
$bilde = $_POST['frontBildeAdresse'];


//Lag en variablel som kobler mot en database.
$tilkobling = new mysqli("boeventerno01.mysql.domeneshop.no",
            "boeventerno01",
            "grebben-stolrad-Tadsjiker-5krigsgass",
               "boeventerno01");


//Sjekker om tilkoblingen fungerer, hvis ikke lever feilmelding og avslutt
if($tilkobling->connect_error) {
 	die("Tilkobling til databasen feilet: " . $tilkobling->connect_error); 
}

 //Lag variabel som inneholder sql spørringen
$sql = "UPDATE arrangement
SET ByNavn = ?,
	Tittel = ?,
	FraDato = ?,
	Beskrivelse=?,
	Kategori=?,
	TilDato=?,
	Adresse=?,
	Klokkeslett=? 
	WHERE ENr = " . $ENr;


$statement = $tilkobling->prepare($sql);

$statement->bind_param("ssssssss", 
$sted, $tittel, $fraDato, $beskrivelse,$kategori,$tilDato,$adresse,$klokkeslett
);

if($statement->execute()){
	echo "";
} else{
	 echo "Noe feil har skjedd! "; 
	 printf("Error: %s.\n", mysqli_stmt_error($statement));
}


$statement->close();
$tilkobling->close(); 
?>