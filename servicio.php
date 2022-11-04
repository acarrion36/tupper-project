<?php
include_once 'libr/nusoap.php'; //incluyendo al proyecto a la libreria nusoap.
include_once 'class/conexion.php';//crear objeto de servicio


login();

$servicio= new soap_server();
$nombreespacio="urn:miserviciowsdl";
$servicio->configureWSDL("ElikaBD",$nombreespacio); //configurar servicio
$servicio->schemaTargetNamespace=$nombreespacio; //almacen el espacionombre de destino

function login(){
    

  
    if (!isset($_SERVER['PHP_AUTH_USER'])){
        header('WWW-Authenticate: Basic reaml="MiSoap"');
        header('HTTP/1.0 401 Unautorized');
        exit;
    }
    if($_SERVER['PHP_AUTH_USER'] == 'elika_waste' && $_SERVER['PHP_AUTH_PW'] == 'elika123'){
            // send some CORS headers so the API can be called from anywhere
        header("Access-Control-Allow-Origin: *");
        header("Content-Type: application/json; charset=UTF-8");
        header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
        header("Access-Control-Max-Age: 3600");
        header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
        header("HTTP/1.1 200 OK");
        return true;
    }else{
        header('WWW-Authenticate: Basic reaml="MiSoap"');
        header('HTTP/1.0 401 Unautorized');
        exit;
    }
}