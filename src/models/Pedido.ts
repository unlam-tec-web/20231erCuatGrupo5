import { product } from "./Producto";

export interface Pedido{
    id: number;
    productos : product;
    total: number;
}