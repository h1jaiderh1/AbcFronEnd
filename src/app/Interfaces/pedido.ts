import { PedidoProducto } from "./pedido-producto";

export interface Pedido {
    idPedido?: number,
    fechaCreacion?: string,
    fechaActualizacion?: string,
    fechaCierre?: string,
    fechaFacturacion?: string,
    idCliente?: number,
    isActive?: number,
    total: string,
    pedidoProductos: PedidoProducto[]
}
