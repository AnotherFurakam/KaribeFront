export interface IPedidoResponse {
  id: number;
  cliente: string;
  finalizado: boolean;
  orden: Orden;
  empleado: Empleado;
  mesa: Mesa;
  createAt: string;
}

interface Mesa {
  id: number;
  nro_mesa: string;
}

interface Empleado {
  nombre: string;
  ape_paterno: string;
}

interface Orden {
  id: number;
  precio_total: string;
  Detalle_orden: IDetPedidoResponse[];
}

export interface IDetPedidoResponse {
  id: number;
  cantidad: number;
  precio: string;
  precio_total: string;
  estado_detorden: Estadodetorden;
  opproducto_local: Opproductolocal;
}

interface Opproductolocal {
  id: number;
  precio: string;
  opcion: Opcion;
}

interface Opcion {
  id: number;
  titulo: string;
  url: string;
  producto: Producto;
}

interface Producto {
  id: number;
  titulo: string;
  descripcion: string;
}

interface Estadodetorden {
  id: number;
  titulo: string;
}
