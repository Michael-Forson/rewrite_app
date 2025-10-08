import React from "react";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import { GOOGLE_CLIENT_ID_IOS, GOOGLE_CLIENT_ID_WEB } from "@/constant";
import { View } from "react-native";
import { sign_google_In } from "./google_sign";
import { useAuth } from "@/context/AuthContext";
GoogleSignin.configure({
  webClientId: GOOGLE_CLIENT_ID_WEB,
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  iosClientId: GOOGLE_CLIENT_ID_IOS,
});

const GoogleAuth = () => {
  const { onGoogleLogin } = useAuth();
  const handleLogin = async () => {
    try {
      const googleresponse = await sign_google_In();
      if (googleresponse && onGoogleLogin) {
        const { email, googleId } = googleresponse;
        await onGoogleLogin(email, googleId);
      }
    } catch (error) {
      console.error("errror", error);
    }
  };

  return (
    <View>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={handleLogin}
      />
    </View>
  );
};

export default GoogleAuth;
