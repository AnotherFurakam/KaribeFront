import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AdminOutlet } from "./components/AdminOutlet";
import { LoginNavbar } from "./components/LoginNavbar";
import { Navbar } from "./components/Navbar";
import ProductState from "./context/Producto/ProductoProvider";
import { Empleados } from "./pages/AdminPages/Empleados";
import { Estadisticas } from "./pages/AdminPages/Estadisticas";
import { Historial } from "./pages/AdminPages/Historial";
import { Home } from "./pages/AdminPages/Home";
import { Locales } from "./pages/AdminPages/Locales";
import { OpcionProducto } from "./pages/AdminPages/OpcionProducto";
import { Pagos } from "./pages/AdminPages/Pagos";
import { Productos } from "./pages/AdminPages/Productos";
import { Reportes } from "./pages/AdminPages/Reportes";
import { LoginPage } from "./pages/LoginPage";

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
          <Route path="empleados" element={<Empleados />} />

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
          <Route path="pedidos" element={<Historial />} />
          {/* <Route path="reportes" element={<Reportes />} />
          <Route path="estadisticas" element={<Estadisticas />} /> */}
          <Route path="*" element={<Navigate to={"inicio"} />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
