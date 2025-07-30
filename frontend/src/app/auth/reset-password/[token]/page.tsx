// frontend/src/app/auth/reset-password/[token]/page.tsx
"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation"; // Utiliser useRouter de next/navigation
import { toast } from "sonner"; // Utiliser sonner pour les toasts

export default function ResetPasswordPage() {
  const params = useParams(); // Récupère les paramètres de l'URL
  const token = params.token as string; // Le token est le paramètre dynamique
  const router = useRouter(); // Pour la redirection
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);

    try {
      // Utilisation du chemin relatif qui sera proxyfié par Nginx
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${baseUrl}/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(
          data.message || "Votre mot de passe a été réinitialisé avec succès."
        );
        router.push("/login"); // Rediriger vers la page de connexion
      } else {
        toast.error(
          data.message ||
            "Le lien de réinitialisation est invalide ou a expiré."
        );
      }
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Impossible de se connecter au serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Réinitialiser le mot de passe
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Nouveau mot de passe:
            </label>
            <input
              type="password"
              id="newPassword"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Confirmer le mot de passe:
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            disabled={loading}
          >
            {loading
              ? "Réinitialisation en cours..."
              : "Réinitialiser le mot de passe"}
          </button>
        </form>
      </div>
    </div>
  );
}
