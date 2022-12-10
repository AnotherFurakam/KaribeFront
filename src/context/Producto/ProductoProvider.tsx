import { createContext, ReactNode, useReducer } from "react";
import { IOpcionProducto } from "../../models/opcion_producto.interface";
import { IProducto } from "../../models/producto.interface";
import opcion_productoService from "../../services/opcion_producto.service";
import productosService from "../../services/productos.service";
import ProductoReducer from "./ProductoReducer";

//? Definiendo la interfaz del estate del contexto
//* En caso de querer añadir mas estados debemos definirlos aquí primero
export interface ProductoContextState {
  productos: IProducto[] | null,
  selectedProducto: IProducto | null,
  selectedOpcionProducto: IOpcionProducto | null
}

//? Inicializando el estado del context
//* Si agregamos mas estados debemos inicializarlos aqui
const ProductoContextStateInitialValues: ProductoContextState = {
  productos: null,
  selectedProducto: null,
  selectedOpcionProducto: null
}

//? Definiendo la interfaz de lo que proveera el contexto
//* Aqui debemos definir los estado y funciones que proveeremos
//* a los componentes que usen el contexto
interface ProductoContextProvide {
  productos: IProducto[] | null,
  selectedProducto: IProducto | null,
  selectedOcionProducto: IOpcionProducto | null,
  getAllProductos: () => Promise<void>,
  postProducto: (producto: IProducto) => Promise<void>,
  putProducto: (id: number, producto: IProducto) => Promise<void>,
  getProductoById: (id: number) => Promise<void>,
  clearSelectedProducto: () => void,
  deleteProducto: (id: number) => Promise<void>,
  postOpcionProducto: (id: number, opcionProducto: IOpcionProducto) => Promise<void>,
  putOpcionProducto: (id: number, opcionProducto: IOpcionProducto) => Promise<void>,
  getOpcionProductoById: (idOpcionProducto: number) => Promise<void>,
  deleteOpcionProductoById: (idOpcionProducto: number) => Promise<void>,
  clearSelectedOpcionProducto: () => void
}

//? Creando el context con datos inicializados por defecto
//* Debemos inicializar tambien los estados y funciones que proveeremos
export const ProductoContext = createContext<ProductoContextProvide>({
  productos: null,
  selectedProducto: null,
  selectedOcionProducto: null,
  getAllProductos: async () => { },
  postProducto: async () => { },
  putProducto: async () => { },
  getProductoById: async () => { },
  clearSelectedProducto: () => { },
  deleteProducto: async () => { },
  postOpcionProducto: async () => { },
  putOpcionProducto: async () => { },
  getOpcionProductoById: async () => { },
  deleteOpcionProductoById: async () => { },
  clearSelectedOpcionProducto: () => { }
})

//*StateProvider
interface Props {
  children: ReactNode
}

const ProductState = ({ children }: Props) => {

  //* Haremos uso del reducer e indicaremos el objeto donde inicializamos el estado previamente definido
  const [state, dispatch] = useReducer(ProductoReducer, ProductoContextStateInitialValues)

  //* Función que obtiene la lista de todos los productos desde el bakend
  const getAllProductos = async () => {
    const response = await productosService.getAllProductos()
    if (response.success) {
      dispatch({
        type: "GET_ALL_PRODUCTOS",
        payload: response.payload
      })
    } else {
      throw new Error(response.message)
    }
  }

  //* Función para obtener los datos de un solo producto
  const getProductoById = async (id: number) => {
    const response = await productosService.getProductoById(id)
    if (response.success) {
      dispatch({
        type: "GET_PRODUCTO",
        payload: response.payload
      })
    } else {
      throw new Error(response.message)
    }
  }

  //* Función para limpiar el estado selectedProducto
  const clearSelectedProducto = () => {
    dispatch({
      type: 'CLEAR_SELECTED_PRODUCTO',
      payload: null
    })
  }

  //* Función para registrar un producto
  const postProducto = async (producto: IProducto) => {
    const response = await productosService.postProducto(producto)
    if (response.success) {
      dispatch({
        type: "POST_PRODUCTO",
        payload: response.payload
      })
    } else {
      throw new Error(response.message)
    }
  }

  //* Función para actualizar un registro
  const putProducto = async (id: number, producto: IProducto) => {
    const response = await productosService.putProducto(id, producto)
    if (response.success) {
      dispatch({
        type: "PUT_PRODUCTO",
        payload: response.payload
      })
    } else {
      throw new Error(response.message)
    }
  }

  //* FUncion para eliminar un registro
  const deleteProducto = async (id: number) => {
    const response = await productosService.deleteProductoById(id)
    if (response.success) {
      dispatch({
        type: "DELETE_PRODUCTO",
        payload: response.payload
      })
    } else {
      throw new Error(response.message)
    }
  }

  //* OPCIONES PRODUCTO
  const postOpcionProducto = async (idProducto: number, opcionProducto: IOpcionProducto) => {
    const response = await opcion_productoService.postOpcionProducto(idProducto, opcionProducto)
    if (response.success) {
      dispatch({
        type: "POST_OPCION_PRODUCTO",
        payload: response.payload
      })
    } else {
      throw new Error(response.message)
    }
  }

  const putOpcionProducto = async (idProducto: number, opcionProducto: IOpcionProducto) => {
    const response = await opcion_productoService.putOpcionProducto(idProducto, opcionProducto)
    if (response.success) {
      dispatch({
        type: "PUT_OPCION_PRODUCTO",
        payload: response.payload
      })
    } else {
      throw new Error(response.message)
    }
  }

  const getOpcionProductoById = async (idOpcionProducto: number) => {
    const response = await opcion_productoService.getOpcionProductoById(idOpcionProducto)
    if (response.success) {
      dispatch({
        type: "GET_OPCION_PRODUCTO",
        payload: response.payload
      })
    } else {
      throw new Error(response.message)
    }
  }

  const deleteOpcionProductoById = async (idOpcionProducto: number) => {
    const response = await opcion_productoService.deleteOpcionProductoById(idOpcionProducto)
    if (response.success) {
      dispatch({
        type: "DELETE_OPCION_PRODUCTO",
        payload: response.payload
      })
    } else {
      throw new Error(response.message)
    }
  }


  const clearSelectedOpcionProducto = () => {
    dispatch({
      type: "CLEAR_SELECTED_OPCION_PRODUCTO",
      payload: null
    })
  }


  return (
    <ProductoContext.Provider
      value={{
        productos: state.productos,
        selectedProducto: state.selectedProducto,
        selectedOcionProducto: state.selectedOpcionProducto,
        getAllProductos,
        getProductoById,
        postProducto,
        putProducto,
        clearSelectedProducto,
        deleteProducto,
        postOpcionProducto,
        putOpcionProducto,
        getOpcionProductoById,
        deleteOpcionProductoById,
        clearSelectedOpcionProducto
      }}
    >
      {children}
    </ProductoContext.Provider>
  )
}

export default ProductState