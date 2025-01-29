import { View, Text, Image } from 'react-native'
import React from 'react'
import CustomButton from '../components/CustomButton';
import { images } from "../constants";
import { router } from 'expo-router';

const EmptyState = ({title, subtitle, btnShown = true}) => {

  return (
    <View className="justify-center items-center">
      <Image
      source={images.empty}
      className="w-[80vw] h-[30vh]"
      resizeMode='contain'/>
      <Text className="text-[2.5vh] text-center text-white font-psemibold">
       {title}
      </Text>
      <Text className="font-pmedium text-[2vh] text-gray-500">
        {subtitle}
      </Text>
      {
        btnShown
        ? (<CustomButton
          title='Create Video'
          handlePress={()=> router.push('/create')}
          containerStyles='w-[90%] my-[5vh]'/>)
        : (<Text></Text>)
      }
      
    </View>
  )
}

export default EmptyState