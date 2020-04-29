<?php
//Kode laget av Patrick S. Lorentzen - 151685
//Denne kode sørger for å skrive inn ett nytt arrangement i databasen etter at en bruker har sendt inn ett utfyllingskjema. 
$sted = $_POST['sted'];
$profilNr = $_POST['bnr']; 
$tittel = $_POST['Tittel']; 
$fraDato = $_POST['FraDato'];
$tilDato = $_POST['TilDato'];
$beskrivelse = $_POST['Beskrivelse'];
$kategori = $_POST['Kategori'];
$klokkeslett = $_POST['Klokkeslett'];
$lat = $_POST['lat'];
$lng = $_POST['lng'];


//Lag en variablel som kobler mot en database.
$tilkobling = new mysqli("boeventerno01.mysql.domeneshop.no",
            "boeventerno01",
            "grebben-stolrad-Tadsjiker-5krigsgass",
               "boeventerno01");

//Sjekker om tilkoblingen fungerer, hvis ikke lever feilmelding og avslutt
if($tilkobling->connect_error) {
 	die("Tilkobling til databasen feilet: " . $tilkobling->connect_error); 
}

//Deler opp Addressen som kommer fra Google API opp i by og addresse
$tabellSted = explode(",",$sted,3);
$verdi1 = 0;
$verdi2 = 1; 

//Fjerner postNr som følger med Google API adressen. 
$By = substr($tabellSted[$verdi2], 6);

//Sjekker om at det ikke bare er returnert 2 adresse verdier, fordi da blir verdi 2 lik Norge. 
if(sizeof($tabellSted) == 2){
$verdi2 = 0; 
$By = $tabellSted[$verdi2];
}

 //Lag variabel som inneholder sql spørringen
$sql = "INSERT INTO arrangement(ByNavn,Brukere_Bnr,Tittel,FraDato,Beskrivelse,Kategori,TilDato,Adresse,Klokkeslett, lat, lng) VALUES(?," . $profilNr . ",?,?,?,?,?,?,?," . $lng .", " . $lat . ")"; 

//Passer på at ingen skriver noen ulovlige verdier inn input feltene
$statement = $tilkobling->prepare($sql);


$statement->bind_param("ssssssss", 
$By, $tittel, $fraDato, $beskrivelse, $kategori,$tilDato,$tabellSted[$verdi1], $klokkeslett
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