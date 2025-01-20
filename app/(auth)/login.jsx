import { View, Text, ScrollView, Image, Alert } from "react-native";
import { images } from "../../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import { useState } from "react";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { signIn } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setIsLoggedIn, setuser } = useGlobalContext();

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill all the fields!");
      return;
    }

    setIsSubmitting(true);
    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setuser(result);
      setIsLoggedIn(true);

      Alert.alert("Success", "Successfully logged in!");
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to log in.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full flex-1">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-[2vw] my-[2vh]">
          <Image source={images.logo} resizeMode="contain" className="w-[40vw] h-[8vh] mb-[5vh]" />
          <Text className="text-[4vh] text-white font-psemibold px-[2vw] mb-[3vh]">
            Login to Aora
          </Text>
          <View className="w-full justify-center items-center flex-col">
            <FormField
              title="Email"
              value={form.email}
              placeholder="me@email.com"
              handleChangeText={(e) => setForm({ ...form, email: e })}
              keyboardType="email-address"
              otherStyles="mb-[4vh] mx-[2vw]"
            />
            <FormField
              title="Password"
              value={form.password}
              placeholder="password"
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mx-[2vw]"
            />
            <CustomButton
              title="Login"
              handlePress={submit}
              containerStyles="mt-[7vh] mx-[2vw]"
              isLoading={isSubmitting}
            />
            <View className="flex-row justify-center gap-[2vh] p-[1vh] m-[1vh]">
              <Text className="text-[2vh] text-zinc-400 font-pregular">Don't have an account?</Text>
              <Link href="/signup" className="text-[2vh] text-secondary font-psemibold">
                Sign Up
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
