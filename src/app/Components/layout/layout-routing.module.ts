import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './Pages/usuario/usuario.component';
import { LayoutComponent } from './layout.component';
import { ClienteComponent } from './Pages/cliente/cliente.component';
import { ProductoComponent } from './Pages/producto/producto.component';
import { PedidoComponent } from './Pages/pedido/pedido.component';
const routes: Routes = [{
  path:'',
  component:LayoutComponent,
  children:[
    {path:'usuarios',component:UsuarioComponent},
    {path:'Cliente',component:ClienteComponent},
    {path:'productos',component:ProductoComponent},
    {path:'pedido',component:PedidoComponent},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
