import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { deleteUsuario, getUsuarios } from "../../services/Usuarios";

function normalizeList(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.usuarios)) return data.usuarios;
  if (Array.isArray(data?.$values)) return data.$values;

  return [];
}

function getUsuarioId(usuario) {
  return usuario.idUsuario ?? usuario.id;
}

export default function UsuariosIndex() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState(null);

  const loadUsuarios = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getUsuarios();
      setUsuarios(normalizeList(data));
    } catch (err) {
      setError(err?.message || "No se pudieron cargar los usuarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsuarios();
  }, []);

  const onDelete = async (usuario) => {
    const id = getUsuarioId(usuario);

    const confirmed = window.confirm(
      `¿Seguro que deseas eliminar el usuario ${usuario.username}?`
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);
      setError(null);

      await deleteUsuario(id);
      await loadUsuarios();
    } catch (err) {
      setError(err?.message || "No se pudo eliminar el usuario");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Usuarios</h1>
          <p className="mt-1 text-sm text-gray-500">
            Administra los usuarios que acceden al sistema.
          </p>
        </div>

        <div className="mt-4 sm:mt-0">
          <Link
            to="/usuarios/crear"
            className="inline-flex items-center gap-2 rounded-md bg-blue-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-900"
          >
            <PlusIcon className="size-5" />
            Nuevo usuario
          </Link>
        </div>
      </div>

      {error && (
        <div className="mt-6 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="mt-6 overflow-x-auto rounded-lg bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                ID
              </th>

              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                ID Cliente
              </th>

              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                Usuario
              </th>

              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                Rol
              </th>

              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                Estado
              </th>

              <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wide text-gray-500">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {loading ? (
              <tr>
                <td colSpan="6" className="px-4 py-6 text-center text-sm text-gray-500">
                  Cargando usuarios...
                </td>
              </tr>
            ) : usuarios.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-6 text-center text-sm text-gray-500">
                  No hay usuarios registrados.
                </td>
              </tr>
            ) : (
              usuarios.map((usuario) => {
                const id = getUsuarioId(usuario);

                return (
                  <tr key={id}>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700">
                      {id}
                    </td>

                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700">
                      {usuario.idCliente ?? "Sin cliente"}
                    </td>

                    <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">
                      {usuario.username}
                    </td>

                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700">
                      {usuario.rol}
                    </td>

                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700">
                      <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                        {usuario.estado}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-4 py-3 text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <Link
                          to={`/usuarios/${id}/editar`}
                          className="inline-flex items-center rounded-md border border-gray-300 bg-white px-2 py-1 text-sm text-gray-700 hover:bg-gray-50"
                          title="Editar"
                        >
                          <PencilSquareIcon className="size-4" />
                        </Link>

                        <button
                          type="button"
                          onClick={() => onDelete(usuario)}
                          disabled={deletingId === id}
                          className="inline-flex items-center rounded-md border border-red-300 bg-white px-2 py-1 text-sm text-red-700 hover:bg-red-50 disabled:opacity-50"
                          title="Eliminar"
                        >
                          <TrashIcon className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}