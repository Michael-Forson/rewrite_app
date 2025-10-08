
// // services/api.ts (Create this file for token validation functions)
// export async function validateAccessToken(accessToken: string): Promise<{ valid: boolean; user?: User }> {
//   try {
//     const response = await fetch('https://your-backend.com/auth/validate', {
//       method: 'GET',
//       headers: { Authorization: `Bearer ${accessToken}` },
//     });

//     if (response.ok) {
//       const user = await response.json(); // Expect { id, email, username? }
//       return { valid: true, user };
//     }
//     return { valid: false };
//   } catch (error) {
//     console.error('Token validation failed:', error);
//     return { valid: false };
//   }
// }

// export async function refreshAccessToken(refreshToken: string): Promise<{ accessToken?: string; refreshToken?: string; user?: User }> {
//   try {
//     const response = await fetch('https://your-backend.com/auth/refresh', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ refreshToken }),
//     });

//     if (response.ok) {
//       const { accessToken, refreshToken: newRefreshToken, ...userData } = await response.json();
//       return { accessToken, refreshToken: newRefreshToken, user: userData as User };
//     }
//     return {};
//   } catch (error) {
//     console.error('Token refresh failed:', error);
//     return {};
//   }
// }