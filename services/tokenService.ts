// services/tokenService.ts
import * as SecureStore from 'expo-secure-store';

// Types
interface UserData {
  id: string;
  name: string;
  email: string;
  picture?: string;
  [key: string]: unknown;
}

interface TokenPayload {
  exp: number;
  iat: number;
  [key: string]: unknown;
}

// Constants
const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_DATA_KEY = 'user_data';

class TokenService {
  // Store tokens securely
  async storeTokens(accessToken: string, refreshToken?: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken);
      if (refreshToken) {
        await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken);
      }
    } catch (error) {
      console.error('Error storing tokens:', error);
      throw error;
    }
  }

  // Get access token
  async getAccessToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
    } catch (error) {
      console.error('Error getting access token:', error);
      return null;
    }
  }

  // Get refresh token
  async getRefreshToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('Error getting refresh token:', error);
      return null;
    }
  }

  // Store user data
  async storeUserData(userData: UserData): Promise<void> {
    try {
      await SecureStore.setItemAsync(USER_DATA_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error('Error storing user data:', error);
      throw error;
    }
  }

  // Get user data
  async getUserData(): Promise<UserData | null> {
    try {
      const userData = await SecureStore.getItemAsync(USER_DATA_KEY);
      return userData ? JSON.parse(userData) as UserData : null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  }

  // Clear all stored data
  async clearTokens(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
      await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
      await SecureStore.deleteItemAsync(USER_DATA_KEY);
    } catch (error) {
      console.error('Error clearing tokens:', error);
    }
  }

  // Check if access token is expired
  isTokenExpired(token: string | null): boolean {
    if (!token) return true;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1])) as TokenPayload;
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch (error) {
      console.error('Error checking token expiration:', error);
      return true;
    }
  }

  // Get token expiration time
  getTokenExpiration(token: string | null): number | null {
    if (!token) return null;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1])) as TokenPayload;
      return payload.exp * 1000; // Convert to milliseconds
    } catch (error) {
      console.error('Error getting token expiration:', error);
      return null;
    }
  }
}

export default new TokenService();
export type { UserData, TokenPayload };