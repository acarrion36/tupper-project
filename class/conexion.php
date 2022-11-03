<?php
ini_set("display_errors", 'off');
ini_set("error_reporting",E_ALL);  

class BaseDatos{
    private $conexion;
    private $user ;
    private $host;
    private $pass ;
    private $db;
    
    public function __construct()
    {
        //------HOSTING ONLINE-----------
        $this->user = "u116520402_elikawaste";
        $this->host = "learnhowto.space";
        $this->pass = "12345678Ac";
    }
    public function conectar($selec){
        //$this->conexion =(new mysqli("127.0.0.1", "root", "", "login"))  or die (mysql_error());
          $this->conexion = new mysqli($this->host,$this->user,$this->pass,$selec);    
           if ($this->conexion->connect_errno) {
                printf("Connect failed: %s\n", $mysqli->connect_error);
                exit();
            }
            else{
               return $this->conexion;
            }       
     
    }

    public function seleccionar($query){
        $resultado=$this->conexion->query($query);
        if (!$resultado) {
            echo 'Hubo un error en la conexión con la base de datos.';
            exit;
        }
        return $resultado;
    }

    public function insertar($query) {
        $resultado=$this->conexion->query($query);
        if (!$resultado) {
            echo "Los datos no pudieron ser enviados a la base de datos. <br>";
            //echo mysql_error();  Muestra el error a la hora de acceder a la BD
        } 
    }

    public function eliminar($query) {
        $resultado=$this->conexion->query($query);
        if (!$resultado) {
            echo "Los datos no pudieron ser enviados a la base de datos. <br>";
            //echo mysql_error();  Muestra el error a la hora de acceder a la BD
        } 
    }
    public function update($query) {
        $resultado=$this->conexion->query($query);
        if (!$resultado) {
            echo "Los datos no pudieron ser enviados a la base de datos. <br>";
            //echo mysql_error();  Muestra el error a la hora de acceder a la BD
        } 
    }

}

