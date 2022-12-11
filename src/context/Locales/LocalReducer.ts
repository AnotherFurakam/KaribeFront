import { ILocal } from "../../models/local.interface";
import { LocalContextState } from "./LocalProvider";

//? Definimos una interfaz para el action
/**
 * * De esta forma le podremos indicar con exactitud que ación queremos
 * * realizar, el payload puede ser any ya que enviaremos distintos tipos
 * * de datos pero tambien podemos indicar el tipo de datos que puede
 * * recibir sin ningún tipo de problema, sin embargo deberemos ser más
 * * específicos a la hora de retornar los estados como se ve en el ejemplo
 */
interface LocalReducerAction {
  type:
    | "GET_ALL_LOCALES"
    | "GET_LOCAL"
    | "POST_LOCAL"
    | "PUT_LOCAL"
    | "DELETE_LOCAL"
    | "CLEAR_SELECTED_LOCAL";
  payload: ILocal[] | ILocal | null;
}

export default function (
  state: LocalContextState,
  action: LocalReducerAction
): LocalContextState {
  const { type, payload } = action;

  switch (type) {
    case "GET_ALL_LOCALES":
      return { ...state, locales: payload as ILocal[] }; //! Indicarle que le payload es de tipo ILocal[]

    case "GET_LOCAL":
      return { ...state, selectedLocal: payload as ILocal };

    case "POST_LOCAL":
      //! Debemos especificarle el as ILocal[] porque en el estado inicial le indicamos que podia ser nulo
      return {
        ...state,
        locales: [...(state.locales as ILocal[]), payload] as ILocal[],
      };

    case "PUT_LOCAL":
      //! Debemos indicar que el payload es un local
      const newArray = state.locales?.map((p) =>
        p.id !== (payload as ILocal).id ? p : payload
      ) as ILocal[];

      return { ...state, locales: newArray };

    case "DELETE_LOCAL":
      //! Debemos indicar que el payload es un local
      const filteredArray = state.locales?.filter(
        (p) => p.id !== (payload as ILocal).id
      ) as ILocal[];
      return { ...state, locales: filteredArray };

    case "CLEAR_SELECTED_LOCAL":
      return { ...state, selectedLocal: payload as null };

    default:
      return state;
  }
}
