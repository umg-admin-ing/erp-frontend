import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { createUsuario } from "../../services/Usuarios";
import UsuarioForm from "./Form";

export default function UsuariosCreate() {
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (payload) => {
    try {
      setSubmitting(true);
      setError(null);

      await createUsuario(payload);

      navigate("/usuarios", { replace: true });
    } catch (err) {
      setError(err?.message || "No se pudo crear el usuario");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Nuevo usuario</h1>
          <p className="mt-1 text-sm text-gray-500">
            Crea un nuevo usuario con rol ADMIN.
          </p>
        </div>

        <Link
          to="/usuarios"
          className="text-sm font-semibold text-blue-800 hover:text-blue-900"
        >
          Volver
        </Link>
      </div>

      {error && (
        <div className="mb-6 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="rounded-lg bg-white p-6 shadow-sm">
        <UsuarioForm
          mode="create"
          onSubmit={onSubmit}
          submitting={submitting}
        />
      </div>
    </div>
  );
}