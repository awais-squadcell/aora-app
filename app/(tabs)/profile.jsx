import { View, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons } from "../../constants";
import EmptyState from '../../components/EmptyState';
import {getUserPosts, signOut} from '../../lib/appwrite';
import useAppwrite from '../../lib/useAppwrite';
import VideoCards from '../../components/VideoCards';
import { useGlobalContext } from "../../context/GlobalProvider";
import InfoBox from '../../components/InfoBox';
import { router } from 'expo-router';

const Profile = () => {

  const logout = async () => {
    try {
      await signOut();
      setuser(null);
      setIsLoggedIn(false);
      router.replace('/login');
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };


  const {user, setuser, setIsLoggedIn} = useGlobalContext();
  const {data: posts} = useAppwrite(()=> getUserPosts(user.$id));

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item)=> item.$id}
        renderItem={({item})=> (
          <VideoCards video = {item ?? []}/>
        )}
        ListHeaderComponent={()=>(
          <View className="p-[2vw] m-[2vw] w-full justify-center items-center">
            <TouchableOpacity
            className="w-full items-end p-[2vw] m-[2vw]"
            onPress={logout}>
              <Image
              source={icons.logout}
              resizeMode='contain'
              className="h-[3vh]"/>
            </TouchableOpacity>
            <View className="w-[21vw] h-[10vh] border border-secondary rounded-lg justify-center items-center">
                <Image
                source={{uri: user?.avatar}}
                resizeMode='cover'
                className="w-[90%] h-[90%] rounded-md"/>
            </View>
            <InfoBox 
            title={user?.username}
            containerStyles='mt-[1.5vh]'
            titleStyles='text-[2vh]'/>
            <View className="mb-[5vh] flex-row">
            <InfoBox 
            title={posts.length || 0}
            subtitle='Posts'
            containerStyles='mr-[25vw]'
            titleStyles='text-[2.5vh]'/>
             <InfoBox 
            title='2.8 M'
            subtitle='Followers'
            titleStyles='text-[2.5vh]'/>
            </View>
          </View>
        )}
        ListEmptyComponent={()=>(
          <EmptyState
          title = 'No Videos Found'
          subtitle = 'No videos found for this title or name.'/>
        )}
      />
    </SafeAreaView>
  )
}

export default Profile