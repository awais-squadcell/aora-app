import { View, Text, FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { icons } from "../../constants";
import SearchInput from '../../components/SearchInput';
import EmptyState from '../../components/EmptyState';
import { useGlobalContext } from '../../context/GlobalProvider';
import { useEffect, useState } from 'react';
import { fetchSavedVideos } from '../../lib/appwrite';
import VideoCards from '../../components/VideoCards';

const Favorite = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [savedVideos, setSavedVideos] = useState([]);
    const { user } = useGlobalContext(); 
    
    const loadSavedVideos = async()=> {
      const videos = await fetchSavedVideos()
      setSavedVideos(videos)
    }

    const onRefresh = async () => {
        setRefreshing(true);
        await loadSavedVideos();
        setRefreshing(false);
    };

    useEffect(() => {
      const fetchData = async () => {
          await loadSavedVideos();
      };
      fetchData();
  }, [user]); // Refetch when the user changes

    return (
        <SafeAreaView className="bg-primary h-full">
            <FlatList
                data={savedVideos}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => (
                    <VideoCards video = {item ?? []}/>
                )}
                ListHeaderComponent={() => (
                    <View className="px-[3vw] my-[2vh]">
                        <View className="flex-1 items-center mb-[2vh]">
                            <Text className="text-white text-[2.7vh] font-psemibold mx-[25vw] m-[2vh]">
                              Favorite Videos
                            </Text>
                        </View>
                        <SearchInput />
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        btnShown={false}
                        title="No Videos Found"
                        subtitle="Your favorite videos are shown here."
                    />
                )}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
        </SafeAreaView>
    );
};

export default Favorite;