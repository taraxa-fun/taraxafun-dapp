import { useAuthStore } from "@/store/User/useAuthStore";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAccount, useSignMessage } from "wagmi";

export const InitAuth = () => {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { initAuth, jwt, userMe, fetchUserMe, logout, verifyJwt } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (jwt) {
      const isJwtValid = verifyJwt();
      if (!isJwtValid) {
        logout(); 
      } else if (!userMe) {
        fetchUserMe().catch(() => {
          logout();
          if (address && signMessageAsync) {
            initAuth(address, signMessageAsync);
          }
        });
      }
    }
  }, [jwt, verifyJwt, logout, userMe, fetchUserMe, address, signMessageAsync, initAuth]);

  useEffect(() => {
    if (userMe && !address) {
      logout();
    }
  }, [address, userMe, logout]);
  
  useEffect(() => {
    if (!jwt && address && signMessageAsync) {
      initAuth(address, signMessageAsync);
    }
  }, [router.asPath, address, jwt, signMessageAsync, initAuth]);

  return null;
};
