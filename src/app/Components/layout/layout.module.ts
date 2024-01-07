import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { UsuarioComponent } from './Pages/usuario/usuario.component';
import { ProductoComponent } from './Pages/producto/producto.component';
import { PedidoComponent } from './Pages/pedido/pedido.component';
import { ClienteComponent } from './Pages/cliente/cliente.component';
import { SharedModule } from 'src/app/Reutilizable/shared/shared.module';
import { ModalUsuarioComponent } from './Modales/modal-usuario/modal-usuario.component';
import { ModalProductoComponent } from './Modales/modal-producto/modal-producto.component';
import { ModalClienteComponent } from './Modales/modal-cliente/modal-cliente.component';
import { MatAutocomplete } from '@angular/material/autocomplete';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    UsuarioComponent,
    ProductoComponent,
    PedidoComponent,
    ClienteComponent,
    ModalUsuarioComponent,
    ModalProductoComponent,
    ModalClienteComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule,
    MatAutocompleteModule
  ]
})
export class LayoutModule { }
