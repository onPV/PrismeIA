"use client"; // Indique que ce composant est un Client Component dans Next.js App Router

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // Pour les notifications

export default function HomePage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Vérifie si l'utilisateur est connecté (présence du token)
    const token = localStorage.getItem("token");
    if (!token) {
      // Si pas de token, redirige vers la page de connexion
      router.push("/login");
      toast.info("Veuillez vous connecter pour accéder à cette page.");
    } else {
      // Si un token est présent, on peut supposer que l'utilisateur est connecté.
      // Pour un vrai projet, vous feriez une requête à l'API pour obtenir les infos de l'utilisateur.
      // Pour l'exemple, on peut récupérer l'email du localStorage si vous l'avez stocké,
      // ou simplement afficher un message générique.
      const storedEmail = localStorage.getItem("userEmail"); // Si vous stockez l'email lors du login
      if (storedEmail) {
        setUserEmail(storedEmail);
      } else {
        setUserEmail("Utilisateur"); // Fallback si l'email n'est pas stocké
      }
    }
  }, [router]); // Dépendance à router pour que l'effet se déclenche si router change

  const handleLogout = () => {
    // Supprime le token et le refresh token du localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userEmail"); // Supprime aussi l'email si stocké
    toast.success("Déconnexion réussie !");
    router.push("/login"); // Redirige vers la page de connexion
  };

  if (!localStorage.getItem("token")) {
    // Affiche un loader ou rien tant que la redirection n'est pas faite
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Bienvenue, {userEmail} !
        </h2>
        <p className="text-gray-600 mb-6">
          Vous êtes maintenant connecté à lapplication PrismeIA.
        </p>
        <p className="text-gray-600 mb-8">
          Ceci est votre page daccueil/tableau de bord.
        </p>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
        >
          Déconnexion
        </button>
      </div>
    </div>
  );
}
