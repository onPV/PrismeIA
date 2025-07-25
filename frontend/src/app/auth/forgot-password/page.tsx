"use client";

import React, { useState } from "react";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false); // État pour le message de confirmation

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        // Met l'état à true pour afficher le message de confirmation
        setEmailSent(true);
        // Affiche une petite notification (toast) en plus du changement de page
        toast.success(
          data.message ||
            "Un lien de réinitialisation a été envoyé (si l'email est enregistré)."
        );
      } else {
        toast.error(
          data.message ||
            "Une erreur est survenue lors de la demande de réinitialisation."
        );
      }
    } catch (error) {
      console.error("Erreur de requête:", error);
      toast.error(
        "Impossible de se connecter au service de mot de passe oublié."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        {!emailSent ? ( // Affiche le formulaire si emailSent est false
          <>
            <h2 className="text-2xl font-bold mb-6">Mot de passe oublié</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2 text-left"
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
          </>
        ) : (
          // Affiche le message de confirmation si emailSent est true
          <>
            <h2 className="text-2xl font-bold mb-6">
              Lien de réinitialisation envoyé
            </h2>
            <p className="text-gray-700 mb-4">
              Si l&apos;adresse email{" "}
              <span className="font-semibold">{email}</span> est associée à un
              compte PrismeIA, un lien de réinitialisation de mot de passe vous
              a été envoyé.
            </p>
            <p className="text-gray-600">
              Veuillez vérifier votre boîte de réception (et le dossier spam).
            </p>
            <button
              onClick={() => setEmailSent(false)} // Permet de revenir au formulaire si l'utilisateur veut réessayer
              className="mt-6 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Envoyer un autre lien
            </button>
          </>
        )}
      </div>
    </div>
  );
}
