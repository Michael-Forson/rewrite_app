// // services/googleAuthService.js
// import * as WebBrowser from "expo-web-browser";
// import * as Linking from "expo-linking";

// const BACKEND_URL = "http://localhost:3000/api/v1"; // Your backend URL

// class GoogleAuthService {
//   isAuthenticating: boolean;
//   constructor() {
//     this.isAuthenticating = false;
//   }

//   // Handle Google login by calling your backend route
//   async handleGoogleLogin() {
//     try {
//       if (this.isAuthenticating) {
//         throw new Error("Authentication already in progress");
//       }

//       this.isAuthenticating = true;

//       // Call your backend Google auth route directly
//       const authUrl = `${BACKEND_URL}/user/google`;

//       // Open browser for Google authentication
//       const result = await WebBrowser.openAuthSessionAsync(
//         authUrl,
//         Linking.createURL("auth") // Deep link redirect
//       );

//       if (result.type === "success" && result.url) {
//         // Parse the response URL to extract tokens
//         const responseData = this.parseAuthResponse(result.url);

//         if (responseData.success) {
//           return {
//             success: true,
//             data: {
//               accessToken: responseData.accessToken,
//               refreshToken: responseData.refreshToken,
//               user: responseData.user,
//             },
//           };
//         } else {
//           return {
//             success: false,
//             error: responseData.error || "Authentication failed",
//           };
//         }
//       } else if (result.type === "cancel") {
//         return {
//           success: false,
//           error: "Login cancelled",
//         };
//       } else {
//         return {
//           success: false,
//           error: "Login failed",
//         };
//       }
//     } catch (error) {
//       console.error("Google login error:", error);
//       return {
//         success: false,
//         error: error || "Login failed",
//       };
//     } finally {
//       this.isAuthenticating = false;
//     }
//   }

//   // // Alternative method: Direct API call to your backend
//   // async handleGoogleLoginDirect() {
//   //   try {
//   //     if (this.isAuthenticating) {
//   //       throw new Error("Authentication already in progress");
//   //     }

//   //     this.isAuthenticating = true;

//   //     // Make direct POST request to your backend
//   //     const response = await fetch(`${BACKEND_URL}/user/google`, {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       // Add any required body data if needed
//   //       body: JSON.stringify({
//   //         platform: "mobile",
//   //         app: "expo",
//   //       }),
//   //     });

//   //     if (!response.ok) {
//   //       throw new Error(`Authentication failed: ${response.status}`);
//   //     }

//   //     const data = await response.json();

//   //     // Check if your backend returns success status
//   //     if (data.success || data.accessToken) {
//   //       return {
//   //         success: true,
//   //         data: {
//   //           accessToken: data.accessToken || data.token,
//   //           refreshToken: data.refreshToken,
//   //           user: data.user || data.userData,
//   //         },
//   //       };
//   //     } else {
//   //       return {
//   //         success: false,
//   //         error: data.error || data.message || "Authentication failed",
//   //       };
//   //     }
//   //   } catch (error) {
//   //     console.error("Google login direct error:", error);
//   //     return {
//   //       success: false,
//   //       error: error || "Login failed",
//   //     };
//   //   } finally {
//   //     this.isAuthenticating = false;
//   //   }
//   // }

//   // Parse authentication response from redirect URL
//   // parseAuthResponse(url: string | URL) {
//   //   try {
//   //     const urlObj = new URL(url);
//   //     const params = urlObj.searchParams;

//   //     // Check for success parameters
//   //     if (params.has("token") || params.has("accessToken")) {
//   //       return {
//   //         success: true,
//   //         accessToken: params.get("token") || params.get("accessToken"),
//   //         refreshToken: params.get("refreshToken"),
//   //         user: params.get("user") || null,
//   //       };
//   //     }

//   //     // Check for error parameters
//   //     if (params.has("error")) {
//   //       return {
//   //         success: false,
//   //         error: params.get("error"),
//   //       };
//   //     }

//   //     // Default success case (adjust based on your backend response format)
//   //     return {
//   //       success: false,
//   //       error: "Invalid response format",
//   //     };
//   //   } catch (error) {
//   //     console.error("Error parsing auth response:", error);
//   //     return {
//   //       success: false,
//   //       error: "Failed to parse authentication response",
//   //     };
//   //   }
//   // }

//   // // Get user info from backend (if needed)
//   // async getUserInfo() {
//   //   try {
//   //     const response = await fetch(`${BACKEND_URL}/user/profile`, {
//   //       method: "GET",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //     });

//   //     if (!response.ok) {
//   //       throw new Error("Failed to get user info");
//   //     }

//   //     return await response.json();
//   //   } catch (error) {
//   //     console.error("Error getting user info:", error);
//   //     throw error;
//   //   }
//   // }

//   // // Logout from backend
//   // async logout() {
//   //   try {
//   //     const response = await fetch(`${BACKEND_URL}/user/logout`, {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //     });

//   //     return response.ok;
//   //   } catch (error) {
//   //     console.error("Error logging out:", error);
//   //     return false;
//   //   }
//   // }
// }

// export default new GoogleAuthService();
