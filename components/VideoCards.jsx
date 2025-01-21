import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from "../constants";

const VideoCards = ({video: {title, thumbnail, video, creator:{username, avatar}}}) => {

const [play, setPlay] = useState(false);

  return (
    <View className="flex-col items-center px-[2vw] mb-[3vh]">
        <View className="flex-row gap-[2vw] items-start px-[2vw]">
            <View className="justify-center items-center flex-row flex-1">
                <View className="w-[20vw] h-[10vh] rounded-lg border border-secondary justify-center items-center p-[0.5vw]">
                    <Image
                    source={{url:avatar}}
                    resizeMode='cover'
                    className="w-full h-full rounded-lg"/>
                </View>
                <View className="justify-center flex-1">
                    <Text className="text-white font-psemibold text-[2vh]" numberOfLines={1}>
                        {title}
                    </Text>
                    <Text className="text-gray-500 font-pregular text-[1.8vh]" numberOfLines={1}>
                        {username}
                    </Text>
                </View>
            </View>
            <View>
                <Image
                source={icons.menu}
                className="w-[1vw] h-[2vh]"
                resizeMode='contain'/>
            </View>
        </View>
        { play ? (
            <Text className="text-white">Playing</Text>
        ):(<TouchableOpacity
        activeOpacity={0.7}
        onPress={()=> setPlay(true)}
        className="w-full h-[10vh] rounded-xl relative justify-center items-center">
            <Image
            source={{uri: thumbnail}}
            className="w-full h-full rounded-xl"
            resizeMode='cover'/>
            <Image
            source={icons.play}
            className="absolute w-[6vw] h-[10vh]"
            resizeMode='contain'/>
        </TouchableOpacity>)}
    </View>
  )
}

export default VideoCards