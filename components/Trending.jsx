import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native'
import React, { useState } from 'react'
import * as Animatable from 'react-native-animatable'
import { icons } from "../constants";
import VideoController from './VideoController';

const zoomIn = {
  0: { scale: 0.8 },
  1: { scale: 1.1 }
}
const zoomOut = {
  0: { scale: 1 },
  1: { scale: 0.9 }
}

const TrendingItems = ({activeItem, item}) => {

const [play, setPlay] = useState(false);
  return (
  <Animatable.View
  animation={activeItem === item.$id ? zoomIn : zoomOut}
  duration={500}>

  {play ? (
    <VideoController
    source={item.video}
    // videoStyles="w-full h-full rounded-3xl bg-white/10 m-[2.5]"
     />
  ) : (
    <TouchableOpacity 
    className="relative justify-center items-center"
    activeOpacity={0.7}
    onPress={()=> setPlay(true)}>
      <ImageBackground
      source={{uri: item.thumbnail}}
      className="w-[40vw] h-[25vh] rounded-3xl overflow-hidden shadow-lg shadow-black/40 m-[2.5vw]"
      resizeMode='cover'/>
      <Image
      source={icons.play}
      className="absolute w-[10vw] h-[10vh]"
      resizeMode='contain'/>

    </TouchableOpacity>
  )}

  </Animatable.View>
  )
}


const Trending = ({posts}) => {

const [activeItem, setActiveItem] = useState(posts[0]);

const viewableItemsChanged = ({ viewableItems }) => {
  if (viewableItems.length > 0) {
    setActiveItem(viewableItems[0].key)
  }
}

  return (
    <FlatList
    data={posts}
    keyExtractor={(item)=> item.$id}
    renderItem= {({item})=> (
        <TrendingItems 
        activeItem={activeItem}
        item={item}/>
    )}
    onViewableItemsChanged={viewableItemsChanged}
    viewabilityConfig={{
      itemVisiblePercentThreshold: 70
    }}
    contentOffset={{x: 150}}
    horizontal/>
  )
}

export default Trending