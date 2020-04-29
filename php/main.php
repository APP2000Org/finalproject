<?php

//Denne koden er skrevet av Patrick S. Lorentzen. -151685
//En samling av funskjoner som gjør ulike former for INSERT,DELETE,UPDATE og SELECT

$tabellen = $_GET['tabell'];
$kollonen = $_GET['kollonen']; 
$verdien = $_GET['verdien']; 
$where = $_GET['where']; 
$temp = $_GET['funksjonsnavn'];

//Lag en variablel som kobler mot en database.
$tilkobling = new mysqli("boeventerno01.mysql.domeneshop.no",
						"boeventerno01",
						"grebben-stolrad-Tadsjiker-5krigsgass",
					     "boeventerno01");


//Sjekker om tilkoblingen fungerer, hvis ikke lever feilmelding og avslutt
if($tilkobling->connect_error) {
 	die("Tilkobling til databasen feilet: " . $tilkobling->connect_error); 
}

$temp($tilkobling,$tabellen,$kollonen, $verdien, $where);



//Denne variablene søker etter rader som inneholder en spesefik søkeverdi
function søkEtter($tilkobling,$tabellen, $kollonen, $verdien){

$sendUt = []; //Resultatene til funksjonene lagres inni denne tabellen. 
	
 //Lag variabel som inneholder sql spørringen
	$sql = "SELECT * FROM " . $tabellen . " WHERE " . $kollonen . " = " .  $verdien; 
//$sql = "SELECT * FROM " . $tabellen; 


//Kjør sql spørringen mot databasen og få ut hele tabellen inn i variabelen resultat
$resultat = $tilkobling->query($sql);

//Del opp resultatet i rader via fetch assoc
 		while($rad = $resultat->fetch_assoc()){
 			array_push($sendUt, $rad); 
 		}
 		
 		echo json_encode($sendUt);

 		//Vi lukker koblingen
$resultat->close();
}

//Denne funksjonen skriver ut alle rader og kollonner fra en spesefik tabell
function skrivUtAlt($tilkobling,$tabellen){

$sendUt = []; //Resultatene til funksjonene lagres inni denne tabellen. 
	
 //Lag variabel som inneholder sql spørringen
	$sql = "SELECT ENr,ByNavn,Brukere_Bnr,Tittel,FraDato,Beskrivelse,Kategori,antallPåmeldte,TilDato,Adresse,Klokkeslett,lat,lng FROM " . $tabellen; 
//$sql = "SELECT * FROM " . $tabellen; 


//Kjør sql spørringen mot databasen og få ut hele tabellen inn i variabelen resultat
$resultat = $tilkobling->query($sql);

//Del opp resultatet i rader via fetch assoc
 		while($rad = $resultat->fetch_assoc()){
 			array_push($sendUt, $rad); 
 		}
 		
 		echo json_encode($sendUt);

 		//Vi lukker koblingen
$resultat->close();
}



//Denne funksjonen sletter en rad med en spesefik søkeverdi
function slettFra($tilkobling,$tabellen, $kollonen, $verdien){
	//Lag variabel som inneholder sql spørringen
$sql = "DELETE FROM " . $tabellen . " WHERE " . $kollonen . " = " .  $verdien; 

//Kjør sql spørringen mot databasen
if($tilkobling->query($sql)){
	echo $verdien . " har blitt slettet fra " . $tabellen; 
} else echo $sql; 

}

//Denne funksjonen oppdaterer en rad via en spesefik søkeverdi som har en kritere
function forandrePå($tilkobling,$tabellen, $kollonen, $verdien, $where){

$sql = "UPDATE " . $tabellen ." SET "  . $kollonen . " = " . $verdien . " WHERE " . $where; 

//Kjør sql spørringen mot databasen
if($tilkobling->query($sql)){
	echo $verdien . " har blitt skrevet inn i raden " . $kollonen; 
} else echo "Noe gikk feil! Enten har du skrevet noe feil i verdiene ellers så må du Kontakt Administrator!"; 
 
} ;	

//Denne variablene søker etter rader som inneholder en spesefik søkeverdi
function søkFeltSkriv($tilkobling,$tabellen, $kollonen, $verdien, $where){

$sendUt = []; //Resultatene til funksjonene lagres inni denne tabellen. 
	
 //Lag variabel som inneholder sql spørringen
	$sql = "SELECT * FROM arrangement WHERE (Tittel LIKE '%". $verdien . "%'OR Beskrivelse LIKE '%" .$verdien . "%')" . $where;

//Kjør sql spørringen mot databasen og få ut hele tabellen inn i variabelen resultat
$resultat = $tilkobling->query($sql);

//Del opp resultatet i rader via fetch assoc
 		while($rad = $resultat->fetch_assoc()){
 			array_push($sendUt, $rad); 
 		}
 		
 		echo json_encode($sendUt);

 		//Vi lukker koblingen
$resultat->close();
}	 

function settInnRad($tilkobling,$tabellen, $kollonen, $verdien, $where){
	$sql = "INSERT INTO " .$tabellen."(" . $kollonen .")" . " VALUES ". "(" . $verdien . ")" . ";";

	if($tilkobling->query($sql)){
		echo "Rad er laget!"; 
	}else {
		echo "Sorry, noe gikk feil : ";
	}

}

//En statisk metode som har en spesefik jobb om å kombinere kommentar med en bruker.
function kommentarSinBruker($tilkobling, $tabellen){
	$sendUt = []; //Resultatene til funksjonene lagres inni denne tabellen. 


	$sql = "SELECT kommentar.*,brukere.Fornavn, brukere.Avatar FROM kommentar,brukere WHERE brukere.Bnr = kommentar.Brukere_Bnr AND kommentar.Arrangement_ENr =" . $tabellen;
																									
	//Kjør sql spørringen mot databasen og få ut hele tabellen inn i variabelen resultat
$resultat = $tilkobling->query($sql);

//Del opp resultatet i rader via fetch assoc
 		while($rad = $resultat->fetch_assoc()){
 			array_push($sendUt, $rad); 
 		}
 		
 		echo json_encode($sendUt);

 		//Vi lukker koblingen
$resultat->close();

}

//En statisk metode som har en spesefik jobb om å kombinere kommentar med en bruker.
function påmeldteSinArrangement($tilkobling, $tabellen){
	$sendUt = []; //Resultatene til funksjonene lagres inni denne tabellen. 


	$sql = "SELECT arrangement.* FROM arrangement,påmeldte WHERE arrangement.Enr = påmeldte.Arrangement_ENr AND påmeldte.Brukere_Bnr = " .$tabellen;
																									
	//Kjør sql spørringen mot databasen og få ut hele tabellen inn i variabelen resultat
$resultat = $tilkobling->query($sql);

//Del opp resultatet i rader via fetch assoc
 		while($rad = $resultat->fetch_assoc()){
 			array_push($sendUt, $rad); 
 		}
 		
 		echo json_encode($sendUt);

 		//Vi lukker koblingen
$resultat->close();

}

//En statisk metode som har en spesefik jobb om å kombinere kommentar med en bruker.
function arrangementSinBruker($tilkobling, $tabellen){
	$sendUt = []; //Resultatene til funksjonene lagres inni denne tabellen. 


	$sql = "SELECT brukere.Bnr,brukere.Fornavn FROM arrangement,brukere WHERE arrangement.Brukere_Bnr = brukere.Bnr AND arrangement.ENr =" . $tabellen;
																									
	//Kjør sql spørringen mot databasen og få ut hele tabellen inn i variabelen resultat
$resultat = $tilkobling->query($sql);

//Del opp resultatet i rader via fetch assoc
 		while($rad = $resultat->fetch_assoc()){
 			array_push($sendUt, $rad); 
 		}
 		
 		echo json_encode($sendUt);

 		//Vi lukker koblingen
$resultat->close();

}

//En statisk metode som har en spesefik jobb om å kombinere kommentar med en bruker.
function påmeldteSinBruker($tilkobling, $tabellen){
	$sendUt = []; //Resultatene til funksjonene lagres inni denne tabellen. 


	$sql = "SELECT brukere.Bnr, brukere.Fornavn, brukere.Avatar FROM brukere,påmeldte WHERE (brukere.Bnr = påmeldte.Brukere_Bnr) AND Arrangement_ENr = " . $tabellen;
																									
	//Kjør sql spørringen mot databasen og få ut hele tabellen inn i variabelen resultat
$resultat = $tilkobling->query($sql);

//Del opp resultatet i rader via fetch assoc
 		while($rad = $resultat->fetch_assoc()){
 			array_push($sendUt, $rad); 
 		}
 		
 		echo json_encode($sendUt);

 		//Vi lukker koblingen
$resultat->close();

}

//Vi ønsker å kombinere vennetabellen med bruker tabellen slik at jeg kan få skrivet ut informasjon om venner. 
function vennOgBruker($tilkobling, $tabellen,$kollonen, $verdien, $where){
	$sendUt = []; //Resultatene til funksjonene lagres inni denne tabellen. 


	$sql = "SELECT (CASE WHEN Brukere_Bnr =". $tabellen ." THEN Brukere_Bnr1 ELSE Brukere_Bnr END) AS 'VennBnr', brukere.Fornavn 
	FROM venn, brukere 
	WHERE (CASE WHEN venn.Brukere_Bnr = " .$tabellen ." THEN brukere.Bnr = Brukere_Bnr1 ELSE brukere.Bnr = Brukere_Bnr END) 
	AND (Brukere_Bnr = ".$tabellen. " or Brukere_Bnr1=" . $tabellen .")";
																									
	//Kjør sql spørringen mot databasen og få ut hele tabellen inn i variabelen resultat
$resultat = $tilkobling->query($sql);

//Del opp resultatet i rader via fetch assoc
 		while($rad = $resultat->fetch_assoc()){
 			array_push($sendUt, $rad); 
 		}
 		
 		echo json_encode($sendUt);

 		//Vi lukker koblingen
$resultat->close();

}

//Vi lukker koblingen
mysqli_close($tilkobling); 
?>