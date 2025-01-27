import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { icons } from "../constants";
import VideoController from './VideoController';


const VideoCards = ({ video: { title, thumbnail, video, creator } }) => {
  const [playingVideoId, setPlayingVideoId] = useState(null);


  // Provide fallback values for creator
  const username = creator?.username;
  const avatar = creator?.avatar; // Use a default avatar image

  const handleVideoEnd = () => {
    setPlayingVideoId(null); // Reset playingVideoId when the video ends
  };

  const stopOtherVideos = () => {
    setPlayingVideoId(video.$id); // Set this video as the currently playing one
  };

  return (
    <View className="flex-col items-center px-[2vw] mb-[3vh]">
      <View className="flex-row gap-[2vw] items-start px-[1.5vw] py-[0.5vh]">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[13vw] h-[6vh] rounded-lg border border-secondary justify-center items-center m-[1vw]">
            <Image
              source={{ uri: avatar }}
              resizeMode="cover"
              className="w-full h-full rounded-lg"
            />
          </View>
          <View className="justify-center flex-1">
            <Text className="text-white font-psemibold mx-[2vw] text-[2vh]" numberOfLines={1}>
              {title}
            </Text>
            <Text className="text-gray-500 font-pregular mx-[2vw] text-[1.8vh]" numberOfLines={1}>
              {username}
            </Text>
          </View>
        </View>
        <View>
          <Image
            source={icons.menu}
            className="w-[1vw] h-[2vh] mx-[1vw] items-center flex-1"
            resizeMode="contain"
          />
        </View>
      </View>
      {playingVideoId === video.$id ? (
        <VideoController
        height= {200}
        width={320}
        contentFit={'cover'}
          source={video}
          onVideoEnd={handleVideoEnd}
          stopOtherVideos={stopOtherVideos}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlayingVideoId(video.$id)}
          className="w-full h-[32vh] rounded-xl px-[2vw] relative justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="absolute w-[10vw] h-[10vh]"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCards;
