import { createContext, useContext, useState, ReactNode } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { getAuthToken, setAuthToken, clearAuthToken } from "../utils/auth";
import { PrivyProvider } from "@privy-io/react-auth";

// 1. Export the interface so it can be used as a Type import elsewhere
export interface AuthContextType {
  token: string | null;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(getAuthToken());
  const [isLoading, setIsLoading] = useState(false);

  // Assuming usePrivy returns these. Ensure 'user' is destructured if needed,
  // otherwise remove it to avoid "unused variable" warnings.
  const { getAccessToken, logout: privyLogout } = usePrivy();

  const login = async () => {
    setIsLoading(true);
    try {
      const privyToken = await getAccessToken();

      // Ensure this endpoint exists
      const response = await fetch("/api/auth/exchange", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ privyToken }),
      });

      const { token: nativeToken } = await response.json();

      setAuthToken(nativeToken);
      setToken(nativeToken);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    clearAuthToken();
    setToken(null);
    privyLogout();
  };

  return (
    <AuthContext.Provider value={{ token, isLoading, login, logout }}>
      <PrivyProvider
        appId="cm2oobkny0catfo18oi5tlcsy"
        clientId="client-WY5cji4yMiP2MeLZWDjxtLjxgkMejPsszB7RuouMCR31r"
        config={{
          embeddedWallets: {
            ethereum: {
              createOnLogin: "all-users",
            },
          },
        }}
      >
        {children}
      </PrivyProvider>
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
