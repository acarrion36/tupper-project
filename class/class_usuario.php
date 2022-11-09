<?php
include("conexion.php");
$bd = new BaseDatos();
//------HOSTING ONLINE-----------
$conexion= $bd->conectar("u116520402_elikawaste");
//------LOCAL HOST-----------
//$conexion= $bd->conectar("elika_waste");

class usuario{

    private $id_usuario;
    private $nombre;
    private $apellido1;
    private $apellido2;
    private $nombre_usuario;
    private $email;
    private $pass;
    private $direccion;
    private $cp;


    public function __construct($id_usuario,$nombre,$apellido1,$apellido2,$nombre_usuario,$email,$pass,$direccion,$cp){

        $this->id_usuario=$id_usuario;
        $this->nombre=$nombre;
        $this->apellido1=$apellido1;
        $this->apellido2=$apellido2;
        $this->nombre_usuario=$nombre_usuario;
        $this->email=$email;
        $this->pass=$pass;
        $this->direccion=$direccion;
        $this->cp=$cp;
    }

    public function guardarUsuario(){
        global $bd;
        $sql = "INSERT INTO usuario (nombre,apellido1,apellido2,nombre_usuario,email,pass,direccion,cp) 
        VALUES ('$this->nombre','$this->apellido1','$this->apellido2','$this->nombre_usuario','$this->email','$this->pass','$this->direccion','$this->cp')";
        $bd->insertar($sql);
        $sql="SELECT * FROM usuario WHERE email = '$this->email'";
        $resultado=$bd->seleccionar($sql);

        while ($usu = mysqli_fetch_assoc($resultado)) {
             $data[]=$usu;
        }
        $var= json_encode($data);
        echo $var;
    }

    public static function obtenerUsuario($id){
        global $bd;
        $data=[];
        if($id==0){   
            //$sql="SELECT usuario.*, SUM(valoracion.puntos) as total FROM usuario, valoracion WHERE valoracion.id_usuario = usuario.id_usuario group by usuario.id_usuario ";
            $sql="SELECT * FROM usuario";
            $resultado=$bd->seleccionar($sql);
    
            while ($usu = mysqli_fetch_assoc($resultado)) {
                 $data[]=$usu;
            }
            $var= json_encode($data);
            echo $var;
        }else{
            $sql="SELECT usuario.*, group_concat(valoracion.puntos SEPARATOR '|') as puntos, group_concat(valoracion.texto SEPARATOR '|') as valoraciones FROM usuario inner join valoracion on usuario.id_usuario = valoracion.id_usuario where usuario.id_usuario='".$id."'";
            $resultado=$bd->seleccionar($sql);
            while ($usu = mysqli_fetch_assoc($resultado)) {
                $data[]=$usu;
           }
           $var= json_encode($data);
           echo $var;
        }
    }

    public static function modificarUsuario($id_usuario,$nombre,$apellido1,$apellido2,$nombre_usuario,$email,$pass,$direccion,$cp){
        global $bd;
        $sql="UPDATE usuario SET nombre='$nombre',apellido1='$apellido1',apellido2='$apellido2',nombre_usuario='$nombre_usuario',email='$email',pass='$pass',direccion='$direccion',cp='$cp' where id_usuario='".$id_usuario."'";
        $resultado=$bd->update($sql);
    }

    public static function eliminarUsuario($id){
        global $bd;
        $sql=" SET FOREIGN_KEY_CHECKS = 0";
        $bd->eliminar($sql);
        $sql="DELETE FROM valoracion where id_usuario='$id'";
        $bd->eliminar($sql);
        $sql="DELETE FROM usuario where id_usuario='$id'";
        $bd->eliminar($sql);
        $sql=" SET FOREIGN_KEY_CHECKS = 1";
        $bd->eliminar($sql);
    }

    public function getid_usuario() {
        return $this->id_usuario;
    }
    public function setid_usuario($id_usuario) {
       $this->id_usuario=$id_usuario;
    }

    public function getnombre() {
        return $this->nombre;
    }
    public function setnombre($nombre) {
       $this->nombre=$nombre;
    }

    public function getapellido1() {
        return $this->apellido1;
    }
    public function setapellido1($apellido1) {
       $this->apellido1=$apellido1;
    }

    public function getapellido2() {
        return $this->apellido2;
    }
    public function setapellido2($apellido2) {
       $this->apellido2=$apellido2;
    }

    public function getnombre_usuario() {
        return $this->nombre_usuario;
    }
    public function setnombre_usuario($nombre_usuario) {
       $this->nombre_usuario=$nombre_usuario;
    }
    public function getemail() {
        return $this->email;
    }
    public function setemail($email) {
       $this->email=$email;
    }
    public function getpass() {
        return $this->pass;
    }
    public function setpass($pass) {
       $this->pass=$pass;
    }

    public function getdireccion() {
        return $this->direccion;
    }
    public function setdireccion($direccion) {
       $this->direccion=$direccion;
    }

    public function getcp() {
        return $this->cp;
    }
    public function setcp($cp) {
       $this->cp=$cp;
    }
}