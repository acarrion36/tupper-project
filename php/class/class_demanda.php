<?php
include("conexion.php");
$bd = new BaseDatos();
//------HOSTING ONLINE-----------
$conexion= $bd->conectar("u116520402_elikawaste");
//------LOCAL HOST-----------
//$conexion= $bd->conectar("elika_waste");

class demanda{

    private $id_demanda;
    private $id_usuario;
    private $id_oferta;
    private $n_raciones;
    private $donacion;
    private $cantidad_d;
    private $anotacion;

    public function __construct($id_demanda,$id_usuario,$id_oferta,$n_raciones,$donacion,$cantidad_d,$anotacion){

        $this->id_demanda=$id_demanda;
        $this->id_usuario=$id_usuario;
        $this->id_oferta=$id_oferta;
        $this->n_raciones=$n_raciones;
        $this->donacion=$donacion;
        $this->cantidad_d=$cantidad_d;
        $this->anotacion=$anotacion;

    }

    public static function guardarDemanda($id_usuario,$id_oferta,$n_raciones,$donacion,$cantidad_d,$anotacion){    

        global $bd;
        $sql = "INSERT INTO demanda (id_usuario,id_oferta,n_raciones,donacion,cantidad_d,anotacion) 
        VALUES ('$id_usuario','$id_oferta','$n_raciones','$donacion','$cantidad_d','$anotacion')";
        echo $sql;
        $bd->insertar($sql);

    }
    public static function obtenerDemanda($idd){
        global $bd;
        $data=[];
        if($idd==0){ 
            $sql="SELECT * FROM demanda";
            $resultado=$bd->seleccionar($sql);
                while ($ofer = mysqli_fetch_assoc($resultado)) {
                    $data[]=$ofer;
                }
            $var= json_encode($data);

            echo $var;
        }else{
                $sql="SELECT * FROM demanda WHERE id_demanda='".$idd."'";
                $resultado=$bd->seleccionar($sql);
                while ($dem = mysqli_fetch_assoc($resultado)) {
                        $data[]=$dem;
                    }
                $var= json_encode($data);
                echo $var;
            }
        }
        public static function eliminarDemanda($id){
            global $bd;
            $sql=" SET FOREIGN_KEY_CHECKS = 0";
            $bd->eliminar($sql);
            $sql="DELETE FROM demanda where id_demanda='$id'";
            $bd->eliminar($sql);
            $sql=" SET FOREIGN_KEY_CHECKS = 1";
            $bd->eliminar($sql);
        }
    

}
