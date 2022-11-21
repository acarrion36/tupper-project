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
        $method = $_SERVER['REQUEST_METHOD'];
        if ($method == "OPTIONS") {
            header('Access-Control-Allow-Origin: *');
            header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
            header("HTTP/1.1 200 OK");
            die();
        }
        header('HTTP/1.0 401 Unautorized');
        exit;
    }

    if($_SERVER['PHP_AUTH_USER'] == 'elika_waste' && $_SERVER['PHP_AUTH_PW'] == 'elika123'){
            // send some CORS headers so the API can be called from anywhere
        return true;
    }else{
        header('WWW-Authenticate: Basic reaml="MiSoap"');
        header('HTTP/1.0 401 Unautorized');
        exit;
    }
}