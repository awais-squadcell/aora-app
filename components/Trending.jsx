import React, { useState } from 'react';
import { TouchableOpacity, ImageBackground, FlatList } from 'react-native';
import * as Animatable from 'react-native-animatable';
import VideoController from './VideoController';

const zoomIn = {
  0: { scale: 0.8 },
  1: { scale: 1.1 },
};
const zoomOut = {
  0: { scale: 1 },
  1: { scale: 0.9 },
};

const TrendingItems = ({ activeItem, item, playingVideoId, setPlayingVideoId }) => {
  const isPlaying = playingVideoId === item.$id;

  const handleVideoEnd = () => {
    setPlayingVideoId(null); // Reset playingVideoId when the video ends
  };

  const stopOtherVideos = () => {
    setPlayingVideoId(item.$id); // Set this video as the currently playing one
  };

  return (
    <Animatable.View
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {isPlaying ? (
        <VideoController
        height={140}
        width={140}
        contentFit={'cover'}
          source={item.video}
          onVideoEnd={handleVideoEnd}
          stopOtherVideos={stopOtherVideos}
        />
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlayingVideoId(item.$id)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-[40vw] h-[25vh] rounded-3xl overflow-hidden shadow-lg shadow-black/40 m-[2.5vw]"
            resizeMode="cover"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[0]?.$id);
  const [playingVideoId, setPlayingVideoId] = useState(null);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItems
          activeItem={activeItem}
          item={item}
          playingVideoId={playingVideoId}
          setPlayingVideoId={setPlayingVideoId}
        />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      horizontal
    />
  );
};

export default Trending;