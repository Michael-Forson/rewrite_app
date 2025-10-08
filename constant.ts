export const COOKIE_NAME = "auth_token";
export const REFRESH_COOKIE_NAME = "refresh_token";
export const COOKIE_MAX_AGE = 20;
export const JWT_EXPIRATION = "20S";
export const REFRESH_TOKEN_EXPIRY = "30d";
export const REFRESH_TOKEN_MAX_AGE = 30 * 24 * 60 * 60;

//Refresh Token Constants
export const REFRESH_BEFORE_EXPIRY_SEC = 60;

//Google OAuth Constants
export const GOOGLE_CLIENT_ID_WEB =
  process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_WEB!;
export const GOOGLE_CLIENT_ID_ANDROID =
  process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_ANDROID!;
export const GOOGLE_CLIENT_ID_IOS =
  process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_IOS!;

export const BASE_URL = `${process.env.EXPO_PUBLIC_BASE_URI}`!;
export const APP_SCHEME = process.env.EXPO_PUBLIC_SCHEME!;
export const JWT_SECRET = process.env.JWT_SECRET!;

//Cookie Settings
export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: "Lax" as const,
  path: "/",
  maxAge: COOKIE_MAX_AGE,
};

export const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: "Lax" as const,
  path: "/api/auth/refresh",
  maxAge: REFRESH_TOKEN_MAX_AGE,
};
