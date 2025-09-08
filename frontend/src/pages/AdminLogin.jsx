import React, { useState } from "react";
import api, { setAuthToken } from "../api";
import { useI18n } from "../i18n.jsx";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/login", { email, password });
      const token = res.data?.token;
      if (token) {
        setAuthToken(token);
        navigate("/admin", { replace: true });
      } else {
        setError("Unexpected response. Try again.");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow p-6">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-amber-600 text-white flex items-center justify-center mx-auto font-bold">ADM</div>
          <h1 className="mt-3 text-2xl font-serif font-bold text-stone-900">{t('adminLogin')}</h1>
          <p className="text-sm text-stone-600 mt-1">{t('signIn')} {t('menuItems').toLowerCase()}</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">{t('email')}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-stone-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">{t('password')}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-stone-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="text-sm text-red-600">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn btn-primary h-11 disabled:opacity-60"
          >
            {loading ? `${t('signIn')}...` : t('signIn')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;


