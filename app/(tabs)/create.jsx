import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from "../../components/FormField";
import { icons } from "../../constants";
import VideoController from '../../components/VideoController';
import CustomButton from "../../components/CustomButton";
import { router } from 'expo-router';
import { createVideoPost } from '../../lib/appwrite';
import { useGlobalContext } from "../../context/GlobalProvider";
import * as ImagePicker from 'expo-image-picker';

const Create = () => {

const {user} = useGlobalContext();

const openPicker = async (selectType) => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images', 'videos'],
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
  if (!result.canceled) {
    if (selectType === 'image') {
      setform({ ...form, thumbnail: result.assets[0]})
    }
    if (selectType === 'video') {
      setform({ ...form, video: result.assets[0]})
    }
  }
}
const submit = async () => {
  if (!form.prompt || !form.title || !form.video || !form.thumbnail) {
    return Alert.alert('Fill all fields', 'Fill all the form fields')
  }
  setUploading(true)
  try {
    await createVideoPost({ ...form, userID: user.$id})
    Alert.alert('Post Uploaded', 'Posts uploaded successfully')
    router.push('/home')
  } catch (error) {
    Alert.alert('Error', error.message)
  } finally {
    setform({
      title: '',
      thumbnail: null,
      video: null,
      prompt: ''
    })
    setUploading(false);
  }
}
const [uploading, setUploading] = useState(false);  
const [form, setform] = useState({
  title: '',
  video: null,
  thumbnail: null,
  prompt: ''
});

  return (
    <SafeAreaView className="bg-primary h-full justify-center flex-1 items-center">
      <ScrollView className="px-[3vw] my-[2vh]">
        <Text className="text-white text-[3vh] font-psemibold mx-[25vw] mt-[2vh]">
          Upload Video
        </Text>
        <FormField
        title='Video Title'
        value={form.title}
        placeholder='Give the video a catchy title...'
        handleChangeText={(e)=> setform({ ...form, title: e})}
        otherStyles='mt-[3vh]'/>
        <View className="mt-[3vh]">
          <Text className="text-base text-gray-400 font-pmedium mb-[1vh]">
            Upload Video
          </Text>
          <TouchableOpacity
          onPress={()=> openPicker('video')}>
            {form.video ? (
              <VideoController
              width={320}
              contentFit={'cover'}
              height={200}
              source={form.video.uri}/>) : (
              <View className="w-full h-[25vh] bg-black-100 rounded-2xl justify-center items-center">
                <View className="h-[8vh] w-[20vw] border-secondary-100 border-dashed rounded-xl border justify-center items-center"> 
                  <Image
                  source={icons.upload}
                  resizeMode='contain'
                  className="h-[5vh]"/>
                </View>
                <Text className="text-gray-500 mt-[2vh]">
                    Choose a Video File
                  </Text>
              </View>
            )} 
          </TouchableOpacity>
        </View>
        <View className="mt-[3vh]">
        <Text className="text-base text-gray-400 font-pmedium mb-[1vh]">
            Upload Thumbnail
          </Text>
          <TouchableOpacity
          onPress={()=> openPicker('image')}>
            {form.thumbnail ? (
              <VideoController
              width={320}
              contentFit={'cover'}
              height={200}
              source={form.thumbnail.uri}/>) : (
              <View className="w-full h-[25vh] bg-black-100 rounded-2xl justify-center items-center">
                <View className="h-[8vh] w-[20vw] border-secondary-100 border-dashed rounded-xl border justify-center items-center"> 
                  <Image
                  source={icons.upload}
                  resizeMode='contain'
                  className="h-[5vh]"/>
                </View>
                  <Text className="text-gray-500 mt-[2vh]">
                    Choose an Image
                  </Text>
              </View>
            )} 
          </TouchableOpacity>
        </View>
        <FormField
        title='Prompt'
        value={form.prompt}
        placeholder='Add a prompt for your video'
        handleChangeText={(e)=> setform({ ...form, prompt: e})}
        otherStyles='mt-[3vh]'/>
        <View className="items-center mt-[3vh]">
        <CustomButton
        title='Submit & Publish'
        handlePress={submit}
        containerStyles='mt-[5vh] w-[50%]'
        />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create