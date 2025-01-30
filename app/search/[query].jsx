import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from "../../constants";
import SearchInput from '../../components/SearchInput';
import EmptyState from '../../components/EmptyState';
import {searchPosts } from '../../lib/appwrite';
import useAppwrite from '../../lib/useAppwrite';
import VideoCards from '../../components/VideoCards';
import { useLocalSearchParams } from 'expo-router';

const Search = () => {

  const {query} = useLocalSearchParams()
  const {data: posts, refetch} = useAppwrite(()=> searchPosts(query));

  //Fetches video data upon top scroll
useEffect(() => {
  refetch
}, [query]);
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item)=> item.$id}
        renderItem={({item})=> (
          <VideoCards video = {item ?? []}/>
        )}
        ListHeaderComponent={()=>(
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-[2vh]">
              <View>
              <Text className="font-pmedium text-[2vh] text-gray-500">
                Search Results
              </Text>
              <Text className="text-[3vh] text-white font-psemibold">
                {query}
              </Text>
              </View>
              <View>
                <Image 
                source={images.logoSmall}
                className="w-[12vw] h-[10vh]"
                resizeMode='contain'/>
              </View>
            </View>
            <SearchInput initialQuery={query}/>
          </View>
        )}
        ListEmptyComponent={()=>(
          <EmptyState
          btnShown= {false}
          title = 'No Videos Found'
          subtitle = 'No videos found for this title or name.'/>
        )}
      />
    </SafeAreaView>
  )
}

export default Search