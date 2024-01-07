import { Component, Input, OnInit } from '@angular/core';
import { NgModule } from "@angular/core";

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { ProductoService } from 'src/app/Services/producto.service';
import { PedidoService } from 'src/app/Services/pedido.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import { Producto } from 'src/app/Interfaces/producto';
import { Pedido } from 'src/app/Interfaces/pedido';
import { PedidoProducto } from 'src/app/Interfaces/pedido-producto';


import Swal from 'sweetalert2';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css'],
  providers: [DatePipe]

})
export class PedidoComponent implements OnInit{

  myDate = new Date();


  listaProductos:Producto[]=[];
  listaProductosFiltro: Producto[]=[];


  listaProductosParaPedido: PedidoProducto[]=[];
  bloquearBotonRegistrar: boolean = false;

  productoSeleccionado!:Producto;
  totalPagar: number = 0;

  formularioPedidoProducto: FormGroup;
  columnasTabla: string[] = ['producto','cantidad','precio','total','accion',];
  datosPedidoProducto = new MatTableDataSource(this.listaProductosParaPedido);

  retornarProductosPorFiltro(busqueda:any):Producto[]{
    const valorBuscado = typeof busqueda === "string" ? busqueda.toLowerCase(): busqueda.nombres.toLowerCase();

    return this.listaProductos.filter(item => item.nombre.toLowerCase().includes(valorBuscado));
  }

  constructor(
    private fb:FormBuilder,
    private _productoServicio: ProductoService,
    private _pedidoServicio: PedidoService,
    private _utilidadServicio: UtilidadService
  ){
    
    this.formularioPedidoProducto = this.fb.group({
      producto:['',Validators.required],
      cantidad:['',Validators.required]
    })

    this._productoServicio.lista().subscribe({
      next:(data)=>{
        if(data.status){
          const lista = data.value as Producto[];
          this.listaProductos = lista.filter(p => p.isActive ==1 && p.cantidad > 0)
        }
      }
    })

    this.formularioPedidoProducto.get('producto')?.valueChanges.subscribe(value => {
      this.listaProductosFiltro = this.retornarProductosPorFiltro(value);
    })

  }

  ngOnInit(): void {
    
  }

  mostrarProducto(producto: Producto):string{

    return producto.nombre;
  }

  productoParaPedido(event: any){
    this.productoSeleccionado = event.option.value;

  }

  agregarProductoParaPedido(){
    const _nombre:string = this.productoSeleccionado.nombre;
    const _cantidad = Number = this.formularioPedidoProducto.value.cantidad;
    const _valorUnitario = parseFloat(this.productoSeleccionado.valorUnitario);
    const _total: number = _cantidad * _valorUnitario;
    this.totalPagar = this.totalPagar + _total;

    this.listaProductosParaPedido.push({
      idProducto: this.productoSeleccionado.idProducto,
      cantidad: _cantidad,
      precioUnitario: String(_valorUnitario.toFixed(2)),
      precioTotal: String(_total.toFixed(2))
    })

    this.datosPedidoProducto = new MatTableDataSource(this.listaProductosParaPedido);

    this.formularioPedidoProducto.patchValue({
      producto:'',
      cantidad:''
    })

  }


  eliminarProducto(detalle: PedidoProducto){
    this.totalPagar = this.totalPagar-parseFloat(detalle.precioTotal),
    this.listaProductosParaPedido = this.listaProductosParaPedido.filter(p=>p.idProducto != detalle.idProducto)

    this.datosPedidoProducto = new MatTableDataSource(this.listaProductosParaPedido);
  }

  registrarPedido(){
    debugger
    if(this.listaProductosParaPedido.length > 0){
      this.bloquearBotonRegistrar = true;
      const request: Pedido = {
        idPedido: 0,
        total: String(this.totalPagar.toFixed(2)),
        pedidoProductos: this.listaProductosParaPedido,
        fechaActualizacion: '12/12/2000',
        fechaCreacion:'12/12/2000',
        fechaCierre:'12/12/2000',
        isActive:1,
        fechaFacturacion:'12/12/2000',
        idCliente:0,
      }

      this._pedidoServicio.registrar(request).subscribe({
        next: (response) =>{
          if(response.status){
            this.totalPagar = 0.00;
            this.listaProductosParaPedido =[];
            this.datosPedidoProducto = new MatTableDataSource(this.listaProductosParaPedido);

            Swal.fire({
              icon:'success',
              title: "Pedido Registrado!",
            })
          }else{
            this._utilidadServicio.mostrarAlerta("No se pudo registrar el pedido","Lo sentimos");
          }
        },
        complete:()=>{
          this.bloquearBotonRegistrar = false;

        },
        error:(e)=>{}
      })


    }
  }


}
