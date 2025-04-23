"use client";
import { signOut } from "@/actions/auth";
import { User } from "@supabase/supabase-js";
import { useQueryClient } from "@tanstack/react-query";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type AuthContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
});

export function AuthProvider({
  initial,
  children,
}: {
  initial?: User | null;
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(initial || null);
  const queryClient = useQueryClient();

  const logout = () => {
    signOut().then(() => {
      setUser(null);
      queryClient.clear();
    });
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
