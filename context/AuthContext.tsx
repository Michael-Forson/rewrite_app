import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { BASE_URL } from "@/constant";

interface AuthProps {
  authState?: { accesstoken: string | null; authenticated: boolean | null };
  onRegister?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onGoogleLogin?: (email: string, googleId: string) => Promise<any>;

  onLogout?: () => Promise<any>;
}

const AuthContext = createContext<AuthProps>({});
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    accesstoken: string | null;
    authenticated: boolean | null;
  }>({
    accesstoken: null,
    authenticated: null,
  });
  useEffect(() => {
    const loadToken = async () => {
      const accesstoken = await SecureStore.getItemAsync("accesstoken");
      console.log("token:", accesstoken);
      if (accesstoken) {
        axios.defaults.headers.common["Authorization"] =
          `Bearer ${accesstoken}`;
        setAuthState({
          accesstoken: accesstoken,
          authenticated: true,
        });
      } else {
        setAuthState({
          accesstoken: null,
          authenticated: false, // ← Now we know for sure user is not logged in
        });
      }
    };
    loadToken();
  }, []);

  const register = async (email: string, password: string) => {
    try {
      return await axios.post(`${BASE_URL}/api/v1/users/register`, {
        email,
        password,
      });
    } catch (error) {
      return { error: true, msg: (error as any).response.data.msg };
    }
  };
  const login = async (email: string, password: string) => {
    try {
      const result = await axios.post(`${BASE_URL}/api/v1/users/login`, {
        email,
        password,
      });
      setAuthState({
        accesstoken: result.data.accesstoken,
        authenticated: true,
      });

      axios.defaults.headers.common["Authorization"] =
        `Bearer ${result.data.accesstoken}`;

      await SecureStore.setItemAsync("accessToken", result.data.accesstoken);
      await SecureStore.setItemAsync("refreshToken", result.data.refreshToken);
      const userData = {
        id: result.data.id,
        email: result.data.email,
        username: result.data?.username || null,
      };
      await SecureStore.setItemAsync("userData", JSON.stringify(userData));
      return result;
    } catch (error) {
      return { error: true, msg: (error as any).response.data.msg };
    }
  };
  const logout = async () => {
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");
    await SecureStore.deleteItemAsync("userData");

    axios.defaults.headers.common["Authorization"] = "";

    setAuthState({
      accesstoken: null,
      authenticated: false,
    });
  };

  // In your login handler:
  const handleGoogleAuth = async (email: string, googleId: string) => {
    // Exchange with backend
    const result = await axios.post(
      `${BASE_URL}/api/v1/user/continue-with-google`,
      {
        email,
        googleId,
      }
    );
    console.log(result);
    setAuthState({ accesstoken: result.data.accesstoken, authenticated: true });

    axios.defaults.headers.common["Authorization"] =
      `Bearer ${result.data.accesstoken}`;

    await SecureStore.setItemAsync("accessToken", result.data.accesstoken);

    // Store tokens and user data
    await SecureStore.setItemAsync("refreshToken", result.data.refreshToken);
    const userData = {
      id: result.data.id,
      email: result.data.email,
      username: result.data?.username || null,
    };
    await SecureStore.setItemAsync("userData", JSON.stringify(userData));
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onGoogleLogin: handleGoogleAuth,
    onLogout: logout,
    authState,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
