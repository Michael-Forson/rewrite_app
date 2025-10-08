// import statusCodes along with GoogleSignin
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";





// Somewhere in your code
export const sign_google_In = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();
    if (isSuccessResponse(response)) {
      const { user, idToken, scopes } = response.data;
      const { email, id } = user;

      // Log the extracted data
      console.log("Email:", email); // micfor722@gmail.com
      console.log("Google User ID:", id); // 1108881297240897309941

      return {
        email,
        googleId: id,
      };
    } else {
      // sign in was cancelled by user
    }
  } catch (error) {
    if (isErrorWithCode(error)) {
      console.log(error);
      switch (error.code) {
        case statusCodes.IN_PROGRESS:
          // operation (eg. sign in) already in progress
          console.log("sign in is already in progress!!!!!!!!!!!!!");
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          // Android only, play services not available or outdated
          console.log(
            "sign play services is not available or outdated!!!!!!!!!!!!!"
          );

          break;
        default:
          // some other error happened
          console.log("!!!!!!!!!!!!!");
      }
    } else {
      // an error that's not related to google sign in occurred
      console.log(
        "an error that's not related to google sign in occurred",
        error
      );
    }
  }
};
