<?php
//Skrevet av Patrick S. Lorentzen -151685
//I denne filen sjekker jeg om at en bruker er logget inn eller ikke. Å hvis den er det så skriver jeg ut session variablene den trenger
//for å identifesere bruker og skrive ut innloggings komponentene på siden. 
session_start();

$brukerVariabler = [];

if (isset($_SESSION['innlogget'])){
$brukerVariabler = [$_SESSION['innlogget'],$_SESSION['navn'],$_SESSION['Bnr']];
}else $brukerVariabler = [false,"",0];
echo json_encode($brukerVariabler);


?>