<?php
    $res = $app->response;

    $res->headers->set('Content-Type', 'application/json');
    $res->headers->set('Access-Control-Allow-Origin', '*');
    $res->headers->set('Access-Control-Allow-Credentials', 'true');
    $res->headers->set('Access-Control-Max-Age', '60');
    $res->headers->set('Access-Control-Allow-Headers', 'AccountKey,x-requested-with, Content-Type, origin, authorization, accept, client-security-token, host, date, cookie, cookie2');
    $res->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    if ( ! $req->isOptions()) {
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
    } else {
        //stops the app, and sends the response
        return $res;
    }
?>