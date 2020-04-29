<?php
session_start();
//Denne koden er laget av Patrick S. Lorentzen - 151685
//Logger inn og sjekker om brukernavn og passord stemmer. Dersom de gjør det så skriver den ut SESSION variablene.


$_SESSION['innlogget'] = false;
	  $_SESSION['Bnr'] = 0; //DISSE FUNKER IKKE PGA TO FORSKJELLIGE SERVERE
	  $_SESSION['navn'] = "";

$innlogget = false;
$brukerInfo = []; 

//Lag en variablel som kobler mot en database.
$tilkobling = new mysqli("boeventerno01.mysql.domeneshop.no",
            "boeventerno01",
            "grebben-stolrad-Tadsjiker-5krigsgass",
               "boeventerno01");

if($tilkobling->connect_error) {
 	die("Tilkobling til databasen feilet: " . $tilkobling->connect_error); 
}

 $brukernavn = $tilkobling->real_escape_string($_GET['brukernavn']);
 $passord = $tilkobling->real_escape_string($_GET['passord']);

if (isset($brukernavn) && isset($passord)) {

 //Lag variabel som inneholder sql spørringen
$sql = "SELECT * FROM brukere WHERE Fornavn = " . $_GET['brukernavn'];  

//Kjør sql spørringen mot databasen og få ut hele tabellen inn i variabelen resultat
if ($result=$tilkobling->query($sql)){
  if (mysqli_num_rows($result) == 1) {
  	$bruker = $result->fetch_assoc();

//Vi lukker koblingen
		$result->close();
//echo $bruker['Fornavn'] . " " . $bruker['Passord'] . "\n" . $_GET['passord'];
  	if(password_verify($_GET['passord'], $bruker['Passord'])){
	  //$innlogget = true;
  	

//Fyller ut session variabler med innloggerens primær info siden innlogging er godkjent. 
	  $_SESSION['innlogget'] = true;
	  $_SESSION['Bnr'] = (int)$bruker['Bnr'];
	  $_SESSION['navn'] = $bruker['Fornavn'];

	  //array_push($brukerInfo, $innlogget, $bruker['Fornavn'], (int)$bruker['Bnr']); 
	  array_push($brukerInfo, $_SESSION['innlogget'], $_SESSION['navn'], (int)$_SESSION['Bnr']); 
	}else {
		array_push($brukerInfo, $innlogget,"",0); 
	}
 		}else{
 			array_push($brukerInfo, $innlogget,"",0); 
 		}
 	}else {
 		array_push($brukerInfo,$innlogget,"",0);
 	}

 		echo json_encode($brukerInfo);
	
 		
  }

//Vi lukker koblingen
mysqli_close($tilkobling); 
?>