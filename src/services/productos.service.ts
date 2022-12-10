import { IProducto } from "../models/producto.interface";
import { Response } from "../models/response.interface";


const getAllProductos = async (): Promise<Response<IProducto[]>> => {
  const response = await fetch('http://localhost:3000/api/v1/productos')
  const data = await response.json()
  return data
}

const getProductoById = async (id: number): Promise<Response<IProducto>> => {
  const response = await fetch('http://localhost:3000/api/v1/productos/' + id)
  const data = await response.json()
  return data
}

const postProducto = async (producto: IProducto): Promise<Response<IProducto>> => {
  const response = await fetch('http://localhost:3000/api/v1/productos', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(producto)
  })
  const data = await response.json()
  return data
}

const putProducto = async (id: number, producto: IProducto): Promise<Response<IProducto>> => {
  const response = await fetch('http://localhost:3000/api/v1/productos/' + id, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(producto)
  })
  const data = await response.json()
  return data
}

const deleteProductoById = async (id: number): Promise<Response<IProducto>> => {
  const response = await fetch('http://localhost:3000/api/v1/productos/' + id,{
    method: 'DELETE'
  })
  const data = await response.json()
  return data
}

export default {
  getAllProductos,
  getProductoById,
  postProducto,
  putProducto,
  deleteProductoById
}