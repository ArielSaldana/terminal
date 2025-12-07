import { createContext, useContext, ReactNode, useState } from "react";
import { usePrivy, PrivyProvider } from "@privy-io/react-auth";
import {
  setAuthToken,
  clearAuthToken,
  isClientAuthed,
} from "../utils/auth.client";

export interface AuthContextType {
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isAuthed: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

const AuthProviderInner = ({ children }: { children: ReactNode }) => {
  const { getAccessToken, logout: privyLogout } = usePrivy();
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthed, setIsAuthed] = useState(isClientAuthed());

  const login = async () => {
    setIsLoading(true);
    try {
      const privyToken = await getAccessToken();

      if (!privyToken) {
        throw new Error("Failed to get Privy token");
      }

      await fetch("/api/auth/exchange", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ privyToken }),
      });

      setAuthToken(privyToken); // store in localStorage & client cookie
      setIsAuthed(true);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    clearAuthToken();
    setIsAuthed(false);
    await privyLogout();
  };

  return (
    <AuthContext.Provider value={{ login, logout, isLoading, isAuthed }}>
      {children}
    </AuthContext.Provider>
  );
};

export const AuthProvider = ({ children }: { children: ReactNode }) => (
  <PrivyProvider
    appId="cm2oobkny0catfo18oi5tlcsy"
    clientId="client-WY5cji4yMiP2MeLZWDjxtLjxgkMejPsszB7RuouMCR31r"
  >
    <AuthProviderInner>{children}</AuthProviderInner>
  </PrivyProvider>
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
