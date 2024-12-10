import { useAuthStore } from "@/store/User/useAuthStore";
import { useEffect } from "react";
import { useAccount, useSignMessage } from "wagmi";

export const InitAuth = () => {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { initAuth, jwt, userMe, fetchUserMe, logout, verifyJwt } = useAuthStore();

  // Vérification du JWT au chargement
  useEffect(() => {
    if (jwt) {
      const isJwtValid = verifyJwt();
      if (!isJwtValid) {
        logout(); // Nettoie le state si le JWT n'est plus valide
      } else if (!userMe) {
        fetchUserMe(); // Récupère les données utilisateur si le JWT est valide
      }
    }
  }, [jwt, verifyJwt, logout, userMe, fetchUserMe]);

  // Déconnexion si userMe existe et l'utilisateur est déconnecté du wallet
  useEffect(() => {
    if (userMe && !address) {
      logout();
    }
  }, [address, userMe, logout]);

  // Authentification seulement si nécessaire
  useEffect(() => {
    if (!jwt && address && signMessageAsync) {
      initAuth(address, signMessageAsync);
    }
  }, [address, jwt, signMessageAsync, initAuth]);

  return null;
};
