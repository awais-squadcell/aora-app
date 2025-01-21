import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from "../../constants";
import SearchInput from '../../components/SearchInput';
import Trending from '../../components/Trending';
import EmptyState from '../../components/EmptyState';
import { getAllPosts } from '../../lib/appwrite';
import useAppwrite from '../../lib/useAppwrite';
import VideoCards from '../../components/VideoCards';

const Home = () => {

  const {data: posts, refetch} = useAppwrite(getAllPosts);

  //Fetches video data upon top scroll
const [refreshing, setRefreshing] = useState(false)
const onRefresh = async () => {
  setRefreshing(true);
  await refetch();
  setRefreshing(false);
}
console.log(posts)
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item)=> item.$id}
        renderItem={({item})=> (
          <VideoCards video = {item}/>
        )}
        ListHeaderComponent={()=>(
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-[2vh]">
              <View>
              <Text className="font-pmedium text-[2vh] text-gray-500">
                Welcome Back!
              </Text>
              <Text className="text-[3vh] text-white font-psemibold">
                *USER*
              </Text>
              </View>
              <View>
                <Image 
                source={images.logoSmall}
                className="w-[12vw] h-[10vh]"
                resizeMode='contain'/>
              </View>
            </View>
            <SearchInput/>
            <View className="w-full flex-1 pt-[3vh]">
              <Text className="text-gray-500 text-[2vh] font-pregular mb-[2vh]">
                Latest Videos
              </Text>
              <Trending posts={[{id: 1}, {id: 2}, {id: 3}] ?? []}/>
            </View>
          </View>
        )}
        ListEmptyComponent={()=>(
          <EmptyState
          title = 'No Videos Found'
          subtitle = 'Be the First to Upload a Video.'/>
        )}
        refreshControl={<RefreshControl
        refreshing={refreshing} onRefresh={onRefresh}/>}
      />
    </SafeAreaView>
  )
}

export default Home