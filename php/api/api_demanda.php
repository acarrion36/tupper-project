<?php
// send some CORS headers so the API can be called from anywhere
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
      

include_once("../class/class_demanda.php"); //incluimos clase producto
include_once("../servicio.php"); 
login();

$_POST=json_decode(file_get_contents('php://input'),true); //decodificar el json


switch($_SERVER['REQUEST_METHOD']){
    case 'POST':
            if (isset($_POST['id_usuario'])&&isset($_POST['id_oferta'])&&isset($_POST['n_raciones'])&&isset($_POST['donacion'])){
                demanda::guardarDemanda($_POST['id_usuario'],$_POST['id_oferta'],$_POST['n_raciones'],$_POST['donacion'],$_POST['cantidad_d'],$_POST['anotacion']);
            }else{
                echo 'faltan datos basicos';
            }
         break;
    case 'GET':  
          if (isset($_GET['ido'])){
               demanda::obtenerDemandaO($_GET['ido']);
          } else if (isset($_GET['idu'])){
               demanda::obtenerDemandaUsuario($_GET['idu']);
          } else if (isset($_GET['rido'])){
               demanda::obtenerRacionesDemandaO($_GET['rido']);
          } else{
               if (isset($_GET['idd'])){
                    demanda::obtenerDemanda($_GET['idd']);  
               }else{
                    demanda::obtenerDemanda(0);
               }
          }
         break;

    case 'PUT':
        
         break;

    case 'DELETE':
          if (isset($_GET['id'])){
               demanda::eliminarDemanda($_GET['id']);    
          }
         break;
    }
?>
