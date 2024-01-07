
import { Component,OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Producto } from 'src/app/Interfaces/producto';
import { ProductoService } from 'src/app/Services/producto.service'; 
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import { getLocaleDateFormat } from '@angular/common';

@Component({
  selector: 'app-modal-producto',
  templateUrl: './modal-producto.component.html',
  styleUrls: ['./modal-producto.component.css']
})
export class ModalProductoComponent implements OnInit{
  
  formularioProducto:FormGroup;
  tituloAccion: string = "Agregar";
  botonAccion: string = "Guardar";
  
  constructor(
    private modalActual: MatDialogRef<ModalProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public datosProducto: Producto,
    private fb: FormBuilder,
    private _productoServicio: ProductoService,
    private _utilidadServicio: UtilidadService
  ){
    
    this.formularioProducto = this.fb.group({
      nombre:['',Validators.required],
      cantidad:['',Validators.required],
      valorUnitario:['',Validators.required],
      isActive:['1',Validators.required],
      fechaActualizacion: ['',Validators.required]
    });
    if(this.datosProducto != null){
      this.tituloAccion = "Editar";
      this.botonAccion = "Actualizar";
    }

  }

  ngOnInit(): void {
    
    if(this.datosProducto != null){
      this.formularioProducto.patchValue({
        nombre: this.datosProducto.nombre,
        cantidad: this.datosProducto.cantidad,
        valorUnitario: this.datosProducto.valorUnitario,
        isActive: this.datosProducto.isActive.toString,
        fechaActualizacion: this.datosProducto.fechaActualizacion.toString
      })
    }
  }

  guardarEditar_Producto(){
    const _producto: Producto = {
      idProducto: this.datosProducto == null ? 0: this.datosProducto.idProducto,
      nombre: this.formularioProducto.value.nombre,
      cantidad: this.formularioProducto.value.cantidad,
      valorUnitario: this.formularioProducto.value.valorUnitario,
      isActive: parseInt(this.formularioProducto.value.isActive),
      fechaActualizacion: this.formularioProducto.value.fechaActualizacion
      
    }

    if(this.datosProducto == null){
      this._productoServicio.guardar(_producto).subscribe({
        next: (data) =>{
          if(data.status){
            this._utilidadServicio.mostrarAlerta("El producto fue registrado","Exito");
            this.modalActual.close("true")
          }else
            this._utilidadServicio.mostrarAlerta("No se pudo registrar el producto","Error")
        },
        error:(e) => {}
      })
    }else{
      
      this._productoServicio.editar(_producto).subscribe({
        next: (data) =>{
          if(data.status){
            this._utilidadServicio.mostrarAlerta("El producto fue editado","Exito");
            this.modalActual.close("true")
          }else
            this._utilidadServicio.mostrarAlerta("No se pudo editar el producto","Error")
        },
        error:(e) => {}
      })
    }

  }
}
