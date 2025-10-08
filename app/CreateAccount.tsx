import { View } from "react-native";
import React from "react";
import GoogleAuth from "../components/GoogleAuth";
import Loading from "@/components/Loading";
import { useAuth } from "@/context/AuthContext";
import { Redirect } from "expo-router";

const CreateAccount = () => {



  return (
    <View className="flex-1 justify-center items-center">
      <GoogleAuth />
    </View>
  );
};

export default CreateAccount;
