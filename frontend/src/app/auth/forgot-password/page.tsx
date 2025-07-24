// frontend/src/app/auth/forgot-password/page.tsx
"use client";

import React, { useState } from "react";
import { toast } from "sonner"; // Utiliser sonner pour les toasts

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Utilisation du chemin relatif qui sera proxyfié par Nginx
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(
          data.message ||
            "Un lien de réinitialisation a été envoyé à votre adresse email (si elle existe dans notre système)."
        );
        setEmail(""); // Vider le champ email
      } else {
        toast.error(
          data.message ||
            "Une erreur est survenue lors de la demande de réinitialisation."
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
          Mot de passe oublié
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Adresse Email:
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
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            disabled={loading}
          >
            {loading
              ? "Envoi en cours..."
              : "Envoyer le lien de réinitialisation"}
          </button>
        </form>
      </div>
    </div>
  );
}
