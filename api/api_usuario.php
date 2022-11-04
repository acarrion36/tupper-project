<?php

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