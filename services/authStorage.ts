// // 1. Auth Storage Utility (utils/authStorage.ts)
// import * as SecureStore from 'expo-secure-store';

// const ACCESS_TOKEN_KEY = 'access_token';
// const REFRESH_TOKEN_KEY = 'refresh_token';
// const USER_KEY = 'user_data';

// export const authStorage = {
//   async getAccessToken(): Promise<string | null> {
//     return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
//   },
  
//   async setAccessToken(token: string): Promise<void> {
//     await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
//   },

//   async getRefreshToken(): Promise<string | null> {
//     return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
//   },
  
//   async setRefreshToken(token: string): Promise<void> {
//     await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, token);
//   },
  
//   async getUser(): Promise<any | null> {
//     const user = await SecureStore.getItemAsync(USER_KEY);
//     return user ? JSON.parse(user) : null;
//   },
  
//   async setUser(user: any): Promise<void> {
//     await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
//   },
  
//   async clearAuth(): Promise<void> {
//     await Promise.all([
//       SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY),
//       SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY),
//       SecureStore.deleteItemAsync(USER_KEY),
//     ]);
//   }
// };