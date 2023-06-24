import { Producto } from "./Producto";

export interface Pedido{
    id: number;
    productos : Producto[];
    total: number;
}