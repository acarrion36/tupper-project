<?php
include("conexion.php");
$bd = new BaseDatos();
//------HOSTING ONLINE-----------
$conexion= $bd->conectar("u116520402_elikawaste");
class oferta{

    private $id_oferta;
    private $id_usuario;
    private $id_menu;
    private $direccion;
    private $cp;
    private $anotacion;
    private $raciones;
    private $h_recogida;
    private $f_recogida;
    private $estado;


    public function __construct($id_oferta,$id_usuario,$id_menu,$direccion,$cp,$anotacion,$raciones,$h_recogida,$f_recogida,$estado){

        $this->id_oferta=$id_oferta;
        $this->id_usuario=$id_usuario;
        $this->id_menu=$id_menu;
        $this->direccion=$direccion;
        $this->cp=$cp;
        $this->anotacion=$anotacion;
        $this->raciones=$raciones;
        $this->h_recogida=$h_recogida;
        $this->f_recogida=$f_recogida;
        $this->estado=$estado;

    }


    public static function obtenerOfertas(){

        global $bd;
        $data=[];
        $sql="SELECT * FROM oferta";
        $resultado=$bd->seleccionar($sql);

        while ($ofer = mysqli_fetch_assoc($resultado)) {
             $data[]=$ofer;
        }
        $var= json_encode($data);

        echo $var;

    }

}