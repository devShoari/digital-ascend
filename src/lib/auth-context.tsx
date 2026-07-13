import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AccountType, User } from "./mock/types";
import { loginRequest, registerRequest } from "./mock/auth-api";

const SESSION_KEY = "mohtawa.mock-session";

type AuthContextValue = {
  user: User | null;
  status: "loading" | "authenticated" | "unauthenticated";
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  register: (input: {
    name: string;
    email: string;
    password: string;
    accountType: AccountType;
    specialty?: string;
  }) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  updateUser: (patch: Partial<User>) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthContextValue["status"]>("loading");

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(SESSION_KEY);
      if (raw) {
        setUser(JSON.parse(raw) as User);
        setStatus("authenticated");
      } else {
        setStatus("unauthenticated");
      }
    } catch {
      setStatus("unauthenticated");
    }
  }, []);

  const persist = useCallback((next: User | null) => {
    if (next) window.localStorage.setItem(SESSION_KEY, JSON.stringify(next));
    else window.localStorage.removeItem(SESSION_KEY);
  }, []);

  const login = useCallback<AuthContextValue["login"]>(
    async (email, password) => {
      const result = await loginRequest(email, password);
      if (result.ok) {
        setUser(result.user);
        setStatus("authenticated");
        persist(result.user);
        return { ok: true };
      }
      return { ok: false, error: result.error };
    },
    [persist],
  );

  const register = useCallback<AuthContextValue["register"]>(
    async (input) => {
      const result = await registerRequest(input);
      if (result.ok) {
        setUser(result.user);
        setStatus("authenticated");
        persist(result.user);
        return { ok: true };
      }
      return { ok: false, error: result.error };
    },
    [persist],
  );

  const logout = useCallback(() => {
    setUser(null);
    setStatus("unauthenticated");
    persist(null);
  }, [persist]);

  const updateUser = useCallback(
    (patch: Partial<User>) => {
      setUser((prev) => {
        if (!prev) return prev;
        const next = { ...prev, ...patch };
        persist(next);
        return next;
      });
    },
    [persist],
  );

  const value = useMemo(
    () => ({ user, status, login, register, logout, updateUser }),
    [user, status, login, register, logout, updateUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
