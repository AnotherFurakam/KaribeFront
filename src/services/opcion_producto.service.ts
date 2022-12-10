import { IOpcionProducto } from "../models/opcion_producto.interface"
import { Response } from "../models/response.interface"

const getOpcionProductoById = async (idOpcionProducto: number): Promise<Response<IOpcionProducto[]>> => {
  const response = await fetch('http://localhost:3000/api/v1/opciones-productos/' + idOpcionProducto)
  const data = await response.json()
  return data
}

const postOpcionProducto = async (idProducto: number, opcionProducto: IOpcionProducto): Promise<Response<IOpcionProducto>> => {
  const response = await fetch('http://localhost:3000/api/v1/opciones-productos/productos/' + idProducto, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(opcionProducto)
  })
  const data = await response.json()
  return data
}

const putOpcionProducto = async (idProducto: number, opcionProducto: IOpcionProducto): Promise<Response<IOpcionProducto>> => {
  const response = await fetch('http://localhost:3000/api/v1/opciones-productos/' + idProducto, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(opcionProducto)
  })
  const data = await response.json()
  return data
}

const deleteOpcionProductoById = async (idOpcionProducto: number): Promise<Response<IOpcionProducto[]>> => {
  const response = await fetch('http://localhost:3000/api/v1/opciones-productos/' + idOpcionProducto,{
    method: 'DELETE'
  })
  const data = await response.json()
  return data
}



export default {
  getOpcionProductoById,
  postOpcionProducto,
  putOpcionProducto,
  deleteOpcionProductoById
}