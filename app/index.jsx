import { Text, View, Image, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { useGlobalContext } from "../context/GlobalProvider";

export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  // Display a loading spinner while the app is initializing
  if (isLoading) {
    return (
      <SafeAreaView className="bg-primary flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#FF9C01" />
      </SafeAreaView>
    );
  }
  if (isLoggedIn) {
    return <Redirect href="/home" />;
  }
  
  return (
    <SafeAreaView className="bg-primary flex-1">
      <ScrollView>
        <View className="w-full h-screen justify-center items-center p-[1vw]">
          <Image
            source={images.logo}
            className="w-[50vw] h-[10vh]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[80vw] h-[30vh]"
            resizeMode="contain"
          />
          <View className="relative mb-[3vh]">
            <Text className="text-[4vh] text-white font-bold text-center">
              Discover Endless Possibilities with{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[20vw] absolute -bottom-[2.5vh] -right-[2vw]"
              resizeMode="contain"
            />
          </View>
          <Text className="text-[2vh] font-pregular text-gray-400 text-center p-[1vw]">
            Where creativity meets innovation: embark on a journey of limitless
            exploration with Aora
          </Text>
          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/login")}
            containerStyles="mt-[2vh]"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
