import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { icons } from "../constants";
import VideoController from './VideoController';
import { VideoPlayer } from 'expo-video';

const VideoCards = ({ video: { $id, title, thumbnail, video, creator: { username, avatar } } }) => {
  const [playingVideoId, setPlayingVideoId] = useState(null);

  // Handle video end to reset playingVideoId
  const handleVideoEnd = () => {
    setPlayingVideoId(null);
  };

  // Stop other videos by updating playingVideoId
  const stopOtherVideos = () => {
    setPlayingVideoId($id); // Set this video as the currently playing one
  };

  // Check if the current video is playing
  const isPlaying = playingVideoId === $id;

  return (
    <View className="flex-col items-center px-[2vw] mb-[3vh]">
      {/* Header Section */}
      <View className="flex-row gap-[2vw] items-start px-[1.5vw] py-[0.5vh]">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[13vw] h-[6vh] rounded-lg border border-secondary justify-center items-center m-[1vw]">
            <Image
              source={{ uri: avatar }}
              resizeMode="cover"
              className="w-[90%] h-[90%] rounded-md"
            />
          </View>
          <View className="justify-center flex-1">
            <Text
              className="text-white font-psemibold mx-[2vw] text-[2vh]"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-gray-500 font-pregular mx-[2vw] text-[1.8vh]"
              numberOfLines={1}
            >
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

      {/* Video Section */}
      {isPlaying ? (
        <VideoController
        width={320}
        height={200}
        contentFit={'cover'}
          source={video}
          onVideoEnd={handleVideoEnd}
          stopOtherVideos={stopOtherVideos}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlayingVideoId($id)} // Start playing this video
          className="w-full h-[25vh] rounded-xl px-[2vw] relative justify-center items-center"
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
