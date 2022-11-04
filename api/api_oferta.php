<?php
header ('Access-Control-Allow-Origin: *');
header("Content-Type: application/json; charset=utf-8");

include_once("../class/class_oferta.php"); //incluimos clase producto
include_once("../servicio.php"); 

//login();

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