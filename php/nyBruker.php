<?php
//Kode laget av Patrick S. Lorentzen - 151685
//Denne koden tar imot ett utfyllingskjema, gjør en valideringsjekk og sender informasjonen til databasen. 
$sted = $_POST['sted'];
$navn = $_POST['fornavn']; 
$fodselsdato = $_POST['fodselsdato']; 
$email = $_POST['email'];
$passord = $_POST['passord'];


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
$sql = "INSERT INTO brukere(Sted_ByNavn,Fornavn,Fødselsdato,Email,Passord) VALUES(?,?,?,?,?)"; 


$statement = $tilkobling->prepare($sql);

$hash = password_hash($passord, PASSWORD_DEFAULT);

$statement->bind_param("sssss", 
$sted, $navn, $fodselsdato, $email, $hash
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