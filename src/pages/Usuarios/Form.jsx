import { useEffect, useState } from "react";

const emptyForm = {
  idCliente: 0,
  username: "",
  password: "",
  rol: "ADMIN",
  estado: "ACTIVO",
};

export default function UsuarioForm({
  mode = "create",
  initialValues = null,
  submitting = false,
  onSubmit,
}) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (!initialValues) return;

    setForm({
      idCliente: initialValues.idCliente ?? 0,
      username: initialValues.username ?? "",
      password: "",
      rol: "ADMIN",
      estado: initialValues.estado ?? "ACTIVO",
    });
  }, [initialValues]);

  const onChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit({
      idCliente: Number(form.idCliente) || 0,
      username: form.username.trim(),
      password: form.password,
      rol: "ADMIN",
      estado: form.estado,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="idCliente" className="block text-sm font-medium text-gray-900">
            ID Cliente
          </label>

          <input
            id="idCliente"
            name="idCliente"
            type="number"
            min="0"
            value={form.idCliente}
            onChange={onChange}
            disabled={submitting}
            className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-800 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-900">
            Usuario
          </label>

          <input
            id="username"
            name="username"
            type="text"
            required
            value={form.username}
            onChange={onChange}
            disabled={submitting}
            className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-800 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-900">
            {mode === "edit" ? "Nueva contraseña" : "Contraseña"}
          </label>

          <input
            id="password"
            name="password"
            type="password"
            required
            value={form.password}
            onChange={onChange}
            disabled={submitting}
            className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-800 sm:text-sm"
          />

          {mode === "edit" && (
            <p className="mt-1 text-xs text-gray-500">
              Escribe la nueva contraseña para actualizarla.
            </p>
          )}
        </div>

        <div>
          <label htmlFor="rol" className="block text-sm font-medium text-gray-900">
            Rol
          </label>

          <select
            id="rol"
            name="rol"
            value={form.rol}
            onChange={onChange}
            disabled={submitting}
            className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-800 sm:text-sm"
          >
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>

        <div>
          <label htmlFor="estado" className="block text-sm font-medium text-gray-900">
            Estado
          </label>

          <select
            id="estado"
            name="estado"
            value={form.estado}
            onChange={onChange}
            disabled={submitting}
            className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-800 sm:text-sm"
          >
            <option value="ACTIVO">ACTIVO</option>
            <option value="INACTIVO">INACTIVO</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-blue-800 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-900 disabled:opacity-50"
        >
          {submitting ? "Guardando..." : "Guardar"}
        </button>
      </div>
    </form>
  );
}