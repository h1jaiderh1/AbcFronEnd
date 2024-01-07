import { Component,OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import { Cliente } from 'src/app/Interfaces/cliente';
import { ClienteService } from 'src/app/Services/cliente.service';
import { ClienteComponent } from '../../Pages/cliente/cliente.component';

@Component({
  selector: 'app-modal-cliente',
  templateUrl: './modal-cliente.component.html',
  styleUrls: ['./modal-cliente.component.css']
})
export class ModalClienteComponent implements OnInit{

  formularioCliente:FormGroup;
  ocultarPassword: boolean = true;
  tituloAccion: string = "Agregar";
  botonAccion: string = "Guardar";

  constructor(
    private modalActual: MatDialogRef<ModalClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public datosCliente: Cliente,
    private fb: FormBuilder,
    private _clienteServicio: ClienteService,
    private _utilidadServicio: UtilidadService
  ){

    this.formularioCliente = this.fb.group({
      tipo: ['',Validators.required],
      numeroDocumento: ['',Validators.required],
      correo: ['',Validators.required],
      telefono: ['',Validators.required],
      direccion: ['',Validators.required],
      departamento: ['',Validators.required],
      ciudad: ['',Validators.required],
      barrio: ['',Validators.required],
      fechaCreacion: ['',Validators.required],
      fechaActualizacion: ['',Validators.required],
      isActive: ['',Validators.required]
    });

    if(this.datosCliente != null){
      this.tituloAccion = "Editar";
      this.botonAccion = "Actualizar";
    }

  }
  ngOnInit(): void {
    if(this.datosCliente != null){
      
      this.formularioCliente.patchValue({
        tipo: this.datosCliente.tipo,
        numeroDocumento: this.datosCliente.numeroDocumento,
        correo: this.datosCliente.correo,
        telefono: this.datosCliente.telefono,
        direccion: this.datosCliente.direccion,
        departamento: this.datosCliente.departamento,
        ciudad: this.datosCliente.ciudad,
        barrio: this.datosCliente.barrio,
        fechaCreacion: this.datosCliente.fechaCreacion,
        fechaActualizacion: this.datosCliente.fechaActualizacion,
        isActive: this.datosCliente.isActive.toString(),
      })
    }
  }
    
  guardarEditar_Cliente(){
    debugger
    const _cliente: Cliente = {
      idCliente: this.datosCliente == null ? this.formularioCliente.value.idCliente: this.datosCliente.idCliente,
      numeroDocumento: this.datosCliente == null ? this.formularioCliente.value.numeroDocumento: this.datosCliente.numeroDocumento,
      tipo: this.formularioCliente.value.tipo,
      correo: this.formularioCliente.value.correo,
      telefono: this.formularioCliente.value.telefono,
      direccion: this.formularioCliente.value.direccion,
      departamento: this.formularioCliente.value.departamento,
      ciudad: this.formularioCliente.value.ciudad,
      barrio: this.formularioCliente.value.barrio,
      fechaActualizacion: this.formularioCliente.value.fechaActualizacion,
      fechaCreacion: this.formularioCliente.value.fechaCreacion,
      isActive: parseInt(this.formularioCliente.value.isActive),
      
    }
    if(this.datosCliente == null){
      this._clienteServicio.guardar(_cliente).subscribe({
        next: (data) =>{
          if(data.status){
            this._utilidadServicio.mostrarAlerta("El cliente fue registrado","Exito");
            this.modalActual.close("true")
          }else
            this._utilidadServicio.mostrarAlerta("No se pudo registrar el cliente","Error")
        },
        error:(e) => {}
      })
    }else{
      this._clienteServicio.editar(_cliente).subscribe({
        next: (data) =>{
          if(data.status){
            this._utilidadServicio.mostrarAlerta("El cliente fue editado","Exito");
            this.modalActual.close("true")
          }else
            this._utilidadServicio.mostrarAlerta("No se pudo editar el cliente","Error")
        },
        error:(e) => {}
      })
    }

  }

}
