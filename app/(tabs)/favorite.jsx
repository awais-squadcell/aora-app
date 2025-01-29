import { View, Text, FlatList, Image, RefreshControl, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons } from "../../constants";
import SearchInput from '../../components/SearchInput';
import EmptyState from '../../components/EmptyState';


const Favorite = () => {

const [refreshing, setRefreshing] = useState(false)
const onRefresh = async () => {
  setRefreshing(true);
  await refetch();
  setRefreshing(false);
}

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        ListHeaderComponent={()=>(
          <View className="my-6 px-4 space-y-6">
            <View className="flex-row justify-center mb-[2vh]">
              <Text className="text-white text-[3vh] font-psemibold mx-[25vw] mt-[2vh]">
                Favorite Video
              </Text>
            </View>
            <SearchInput/>
            <TouchableOpacity className="w-[15vw] justify-center items-center m-[4vw]">
                <Image 
                source={icons.bookmark}
                tintColor= '#FF0000'
                className="w-[7vw] mx-[3vw] h-[5vh]"
                resizeMode='contain'/>
                <Text className="text-red-600 text-[2vh]">Remove</Text>
              </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={()=>(
          <EmptyState
          btnShown = {false}
          title = 'No Videos Found'
          subtitle = 'Your favorite videos are shown here.'/>
        )}
        refreshControl={<RefreshControl
        refreshing={refreshing} onRefresh={onRefresh}/>}
      />
    </SafeAreaView>
  )
}

export default Favorite