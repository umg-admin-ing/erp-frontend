import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./routes/ProtectedRoute";

const Login = lazy(() => import("./pages/Login.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard/Index.jsx"));

const UsuariosIndex = lazy(() => import("./pages/Usuarios/Index.jsx"));
const UsuariosCreate = lazy(() => import("./pages/Usuarios/Create.jsx"));
const UsuariosEdit = lazy(() => import("./pages/Usuarios/Edit.jsx"));

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <Suspense fallback={null}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={null}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "usuarios",
        element: (
          <ProtectedRoute admin>
            <Suspense fallback={null}>
              <UsuariosIndex />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "usuarios/crear",
        element: (
          <ProtectedRoute admin>
            <Suspense fallback={null}>
              <UsuariosCreate />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "usuarios/:id/editar",
        element: (
          <ProtectedRoute admin>
            <Suspense fallback={null}>
              <UsuariosEdit />
            </Suspense>
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;