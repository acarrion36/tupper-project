<?php
header("Content-Type: application/json");
include_once("../class/class_oferta.php"); //incluimos clase producto
include_once("../servicio.php"); 
login();

$_POST=json_decode(file_get_contents('php://input'),true); //decodificar el json


switch($_SERVER['REQUEST_METHOD']){
    case 'POST':

         break;
    case 'GET':
            //todos
            oferta::obtenerOfertas();//ESTATICO  
        break;

    case 'PUT':
        break;

    case 'DELETE':
        break;

    }
?>