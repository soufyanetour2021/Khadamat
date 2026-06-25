import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { getToken, getStoredUser, logout as authLogout } from "@/lib/auth";
import type { User } from "@/lib/api-types";

export function useAuth() {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery<User | null>({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      const token = getToken();
      if (!token) return null;
      try {
        return await api.get<User>("/auth/me");
      } catch {
        // Token invalid or expired
        authLogout();
        return null;
      }
    },
    initialData: getStoredUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });

  const logout = () => {
    authLogout();
    queryClient.setQueryData(["auth", "me"], null);
    queryClient.invalidateQueries({ queryKey: ["auth"] });
  };

  return {
    user: user ?? null,
    isLoading,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    logout,
  };
}
