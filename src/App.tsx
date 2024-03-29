import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AdminOutlet } from "./components/AdminOutlet";
import { EmpleadoState } from "./context/Empleado/EmpleadoProvider";
import LocalState from "./context/Locales/LocalProvider";
import ProductState from "./context/Producto/ProductoProvider";
import { Empleados } from "./pages/AdminPages/Empleados";
import { Historial } from "./pages/AdminPages/Historial";
import { Home } from "./pages/AdminPages/Home";
import { Locales } from "./pages/AdminPages/Locales";
import { OpcionProducto } from "./pages/AdminPages/OpcionProducto";
import { Pagos } from "./pages/AdminPages/Pagos";
import { Productos } from "./pages/AdminPages/Productos";
import { LoginPage } from "./pages/LoginPage";
import PedidoState from "./context/Pedidos/PedidoProvider";
import { DetallePedido } from "./pages/AdminPages/DetallePedido";

function App() {
  const location = useLocation();

  return (
    <>
      <Routes>
        //*Public routes
        <Route path="/" element={<LoginPage />} />
        //*Private routes //? Redirigiendo la ruta admin a /admin/inicio
        <Route path="/admin" element={<Navigate to={"/admin/inicio"} />} />
        <Route path="/admin" element={<AdminOutlet />}>
          <Route path="inicio" element={<Home />} />
          <Route
            path="locales"
            element={
              <LocalState>
                <Locales />
              </LocalState>
            }
          />

          <Route path="empleados" element={
            <EmpleadoState>
              <Empleados />
            </EmpleadoState>
          } />

          <Route
            path="productos"
            element={
              <ProductState>
                <Productos />
              </ProductState>
            }
          />
          <Route
            path="productos/:id"
            element={
              <ProductState>
                <OpcionProducto />
              </ProductState>
            }
          />

          <Route path="cobrar" element={<Pagos />} />
          <Route
            path="pedidos"
            element={
              <PedidoState>
                <Historial />
              </PedidoState>
            }
          />
          <Route
            path="pedidos/:id"
            element={
              <PedidoState>
                <DetallePedido />
              </PedidoState>
            }
          />

          {/* <Route path="reportes" element={<Reportes />} />
          <Route path="estadisticas" element={<Estadisticas />} /> */}
          <Route path="*" element={<Navigate to={"inicio"} />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
