export class Donation {

  constructor(
      public nombre:string,
      public descripcion:string,
      public alergenos:string,
      public notas:string,
      public id_usuario:string,
      public direccion:string,
      public cp:string,
      public anotacion:string,
      public raciones:number,
      public h_recogida:string,
      public f_recogida:string
  ){}

}
