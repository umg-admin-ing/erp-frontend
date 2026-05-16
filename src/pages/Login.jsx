import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { login } from "../services/Auth/login";
import { setAuth } from "../utils/auth";

import Logo from "../../src/assets/nova/icon.png";
import Wallpaper from "../../src/assets/nova/wallpaper.jpeg";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const onChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      setError(null);

      const data = await login({
        username: form.username,
        password: form.password,
      });

      setAuth({
        token: data.token,
        user: data.usuario,
        role: data.role,
      });

      navigate(from, { replace: true });
    } catch (err) {
      setError(err?.message || "No se pudo iniciar sesión");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <img src={Logo} className="h-24 w-auto" alt="Logo" />

            <h2 className="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900">
              Inicia sesión
            </h2>
          </div>

          <div className="mt-10">
            <form onSubmit={onSubmit} className="space-y-6">
              {error && (
                <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                  Usuario
                </label>

                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    autoComplete="username"
                    value={form.username}
                    onChange={onChange}
                    disabled={submitting}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6 disabled:opacity-60"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Contraseña
                </label>

                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    value={form.password}
                    onChange={onChange}
                    disabled={submitting}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6 disabled:opacity-60"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full justify-center rounded-md bg-blue-800 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-gray-800 disabled:opacity-50"
                >
                  {submitting ? "Ingresando..." : "Ingresar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          alt=""
          src={Wallpaper}
          className="absolute inset-0 size-full object-cover"
        />
      </div>
    </div>
  );
}