import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { getUsuarioById, updateUsuario } from "../../services/Usuarios";
import UsuarioForm from "./Form";

export default function UsuariosEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsuario = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getUsuarioById(id);
        setUsuario(data);
      } catch (err) {
        setError(err?.message || "No se pudo cargar el usuario");
      } finally {
        setLoading(false);
      }
    };

    loadUsuario();
  }, [id]);

  const onSubmit = async (payload) => {
    try {
      setSubmitting(true);
      setError(null);

      await updateUsuario(id, payload);

      navigate("/usuarios", { replace: true });
    } catch (err) {
      setError(err?.message || "No se pudo actualizar el usuario");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Editar usuario</h1>
          <p className="mt-1 text-sm text-gray-500">
            Actualiza la información del usuario seleccionado.
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
        {loading ? (
          <p className="text-sm text-gray-500">Cargando usuario...</p>
        ) : usuario ? (
          <UsuarioForm
            mode="edit"
            initialValues={usuario}
            onSubmit={onSubmit}
            submitting={submitting}
          />
        ) : (
          <p className="text-sm text-gray-500">No se encontró el usuario.</p>
        )}
      </div>
    </div>
  );
}