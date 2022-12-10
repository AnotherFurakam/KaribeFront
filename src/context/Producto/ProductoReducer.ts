import { IOpcionProducto } from "../../models/opcion_producto.interface";
import { IProducto } from "../../models/producto.interface";
import { ProductoContextState } from "./ProductoProvider";

//? Definimos una interfaz para el action
/**
 * * De esta forma le podremos indicar con exactitud que ación queremos
 * * realizar, el payload puede ser any ya que enviaremos distintos tipos 
 * * de datos pero tambien podemos indicar el tipo de datos que puede 
 * * recibir sin ningún tipo de problema, sin embargo deberemos ser más
 * * específicos a la hora de retornar los estados como se ve en el ejemplo
 */
interface ProductReducerAction {
  type:
  'GET_ALL_PRODUCTOS' |
  'GET_PRODUCTO' |
  'POST_PRODUCTO' |
  'PUT_PRODUCTO' |
  'CLEAR_SELECTED_PRODUCTO' |
  'DELETE_PRODUCTO' |
  'POST_OPCION_PRODUCTO' |
  'PUT_OPCION_PRODUCTO' |
  'GET_OPCION_PRODUCTO' |
  'CLEAR_SELECTED_OPCION_PRODUCTO' |
  'DELETE_OPCION_PRODUCTO',
  payload: IProducto[] | IProducto | IOpcionProducto | IOpcionProducto[] | null
}

export default function (state: ProductoContextState, action: ProductReducerAction): ProductoContextState {
  const { type, payload } = action
  switch (type) {
    case "GET_ALL_PRODUCTOS":
      return { ...state, productos: payload as IProducto[] } //! Debemos indicarle que le payload se recive como tipo IProducto[]

    case "GET_PRODUCTO":
      return { ...state, selectedProducto: payload as IProducto } //! Seteando el producto obtenido por el id

    case "POST_PRODUCTO":
      //! Debemos especificarle el as IProducto[] porque en el estado inicial le indicamos que podia ser nulo
      return { ...state, productos: [...state.productos as IProducto[], payload] as IProducto[] }

    case "PUT_PRODUCTO":
      //! Debemos indicar que el payload es un producto
      const newArray = state.productos?.map(p => p.id !== (payload as IProducto).id ? p : payload) as IProducto[]
      return { ...state, productos: newArray };

    case "CLEAR_SELECTED_PRODUCTO":
      return { ...state, selectedProducto: payload as null }

    case "DELETE_PRODUCTO":
      //! Debemos indicar que el payload es un producto
      const filteredArray = state.productos?.filter(p => p.id !== (payload as IProducto).id) as IProducto[]
      return { ...state, productos: filteredArray }

    case "POST_OPCION_PRODUCTO":
      return {
        ...state,
        selectedProducto: {
          ...state.selectedProducto,
          opcion: [
            ...state.selectedProducto?.opcion as IOpcionProducto[],
            payload as IOpcionProducto[]
          ]
        } as IProducto
      }

    case "PUT_OPCION_PRODUCTO":
      const newOpcionArray = state.selectedProducto?.opcion?.map(op => op.id !== (payload as IOpcionProducto).id ? op : payload) as IOpcionProducto[]
      return {
        ...state,
        selectedProducto: {
          ...state.selectedProducto,
          opcion: newOpcionArray
        } as IProducto
      }

    case "GET_OPCION_PRODUCTO":
      return { ...state, selectedOpcionProducto: payload as IOpcionProducto }

    case "DELETE_OPCION_PRODUCTO":
      const filteredOpcionArray = state.selectedProducto?.opcion?.filter(op => op.id !== (payload as IOpcionProducto).id) as IOpcionProducto[]
      return {
        ...state,
        selectedProducto: {
          ...state.selectedProducto,
          opcion: filteredOpcionArray
        } as IProducto
      }

    case "CLEAR_SELECTED_OPCION_PRODUCTO":
      return { ...state, selectedOpcionProducto: payload as null }

    default:
      return state;
  }
}