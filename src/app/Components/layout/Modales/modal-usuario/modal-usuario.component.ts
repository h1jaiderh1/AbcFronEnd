import { Component,OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from 'src/app/Interfaces/usuario';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';

@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styleUrls: ['./modal-usuario.component.css']
})
export class ModalUsuarioComponent implements OnInit{

  formularioUsuario:FormGroup;
  ocultarPassword: boolean = true;
  tituloAccion: string = "Agregar";
  botonAccion: string = "Guardar";
  
  constructor(
    private modalActual: MatDialogRef<ModalUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public datosUsuario: Usuario,
    private fb: FormBuilder,
    private _usuarioServicio: UsuarioService,
    private _utilidadServicio: UtilidadService
  ){
    this.formularioUsuario = this.fb.group({
      nombres: ['',Validators.required],
      apellidos: ['',Validators.required],
      usuario1: ['',Validators.required],
      contrasena: ['',Validators.required],
      isActive: ['',Validators.required],
      identificacionCiudadania: ['',Validators.required],
    });
    if(this.datosUsuario != null){
      this.tituloAccion = "Editar";
      this.botonAccion = "Actualizar";

    }

  }

  ngOnInit(): void {
    if(this.datosUsuario != null){
      this.formularioUsuario.patchValue({
      nombres: this.datosUsuario.nombres,
      apellidos: this.datosUsuario.apellidos,
      identificacionCiudadania: this.datosUsuario.identificacionCiudadania,
      usuario1: this.datosUsuario.usuario1,
      contrasena: this.datosUsuario.contrasena,
      isActive: this.datosUsuario.isActive.toString()
      })

    }
  }


  guardarEditar_Usuario(){
    const _usuario: Usuario = {
      idUsuario: this.datosUsuario == null ? 0: this.datosUsuario.idUsuario,
      nombres: this.formularioUsuario.value.nombres,
      apellidos: this.formularioUsuario.value.apellidos,
      identificacionCiudadania: this.formularioUsuario.value.identificacionCiudadania,
      usuario1: this.formularioUsuario.value.usuario1,
      contrasena: this.formularioUsuario.value.contrasena,
      isActive: parseInt(this.formularioUsuario.value.isActive),
    }

    if(this.datosUsuario == null){
      this._usuarioServicio.guardar(_usuario).subscribe({
        next:(data)=>{
          if(data.status){
            this._utilidadServicio.mostrarAlerta("El usuario fue registrado!", "Exito");
            this.modalActual.close("true")
          }else{
            this._utilidadServicio.mostrarAlerta("No se pudo registrar el usuario","Error");
          }
        },
        error:(e)=>{}
      })
    }else{
      this._usuarioServicio.editar(_usuario).subscribe({
        next:(data)=>{
          if(data.status){
            this._utilidadServicio.mostrarAlerta("El usuario fue editado!", "Exito");
            this.modalActual.close("true")
          }else{
            this._utilidadServicio.mostrarAlerta("No se pudo editar el usuario","Error");
          }
        },
        error:(e)=>{}
      })
    }
  }
  

}
