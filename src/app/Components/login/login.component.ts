import { Component } from '@angular/core';

import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/Interfaces/login';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formularioLogin:FormGroup;
  ocultarPassword:boolean = true;
  mostrarLoading:boolean = false;

  constructor(
    private fb:FormBuilder,
    private router: Router,
    private _usuarioServicio: UsuarioService,
    private _utilidadServicio: UtilidadService
  ){

    this.formularioLogin = this.fb.group({
      usuario:['',Validators.required],
      contrasena:['',Validators.required]
    });
  }

  ngOnInit():void{

  }

  iniciarSesion(){
    this.mostrarLoading=true;
    const request:Login ={
      usuario:this.formularioLogin.value.usuario,
      contrasena: this.formularioLogin.value.contrasena
    }

    this._usuarioServicio.iniciarSesion(request).subscribe({
      next:(data)=>{
        if(data.status){
          this._utilidadServicio.guardarSesionUsuario(data.value);
          this.router.navigate(["pages"])
        }else{
          this._utilidadServicio.mostrarAlerta("No se encontraron coincidencias","Lo sentimos")
        }
      },
      complete:()=>{
        this.mostrarLoading = false;
      },
      error:()=>{
        this._utilidadServicio.mostrarAlerta("Error durante el proceso","Lo sentimos")

      }
    })
  }

}
