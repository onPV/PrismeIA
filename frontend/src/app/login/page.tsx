// frontend/src/app/login/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Utiliser useRouter de next/navigation
import Link from "next/link"; // Utiliser Link de next/link
import { toast } from "sonner"; // Utiliser sonner pour les toasts

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Pour la redirection après connexion

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${baseUrl}/api/auth/login`, {
        // Chemin relatif pour le proxy Nginx
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token); // Stocker le token
        localStorage.setItem("refreshToken", data.refresh_token); // Stocker le refresh token
        localStorage.setItem("userEmail", email); // NOUVEAU : Stocke l'email de l'utilisateur
        toast.success("Connexion réussie !");
        router.push("/"); // Rediriger vers le tableau de bord ou la page d'accueil
      } else {
        toast.error(data.message || "Identifiants invalides.");
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
      toast.error("Impossible de se connecter au serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Connexion</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Mot de passe:
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between mt-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>
            <Link
              href="/auth/forgot-password"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Mot de passe oublié?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
