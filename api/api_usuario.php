<?php
// Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    // should do a check here to match $_SERVER['HTTP_ORIGIN'] to a
    // whitelist of safe domains
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}
// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");         

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

}
header("Content-Type: application/json; charset=utf-8");
include_once("../class/class_usuario.php"); //incluimos clase producto
include_once("../servicio.php"); 
login();

$_POST=json_decode(file_get_contents('php://input'),true); //decodificar el json


switch($_SERVER['REQUEST_METHOD']){
    case 'POST':
        if (isset($_POST['nombre_usuario'])&&isset($_POST['pass'])&&isset($_POST['email'])){
            $usuario= new usuario(NULL,$_POST['nombre'],$_POST['apellido1'],$_POST['apellido2'],$_POST['nombre_usuario'],$_POST['email'],$_POST['pass'],$_POST['direccion'],$_POST['cp']);
            $usuario->guardarUsuario();
        }else{
            echo 'falta alguno de los datos básicos';
        }
         break;
    case 'GET':
            if (isset($_GET['id'])){
                usuario::obtenerUsuario($_GET['id']);  
            }else{
                usuario::obtenerUsuario(0);
            }
        break;

    case 'PUT':
        if (isset($_GET['id'])){
            usuario::modificarUsuario($_GET['id'],$_POST['nombre'],$_POST['apellido1'],$_POST['apellido2'],$_POST['nombre_usuario'],$_POST['email'],$_POST['pass'],$_POST['direccion'],$_POST['cp']);          
        }
        break;

    case 'DELETE':
        if (isset($_GET['id'])){
            usuario::eliminarUsuario($_GET['id']);    
        }
        break;

    }
?>