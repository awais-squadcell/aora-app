import { useState } from 'react';
import { FlatList, TouchableOpacity, View, Text, Alert } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { handleFavorite } from '../lib/appwrite';


const Options = ({ isVisible, videoId }) => {
    if (!isVisible) return null;

    const [visible, setVisible] = useState(false);
    const onDismissSnackBar = () => setVisible(false);

    const tiles = [
        { title: 'Play', action: () => Alert.alert("Playing Video") },
        { title: 'Favorite', action: () => handleFavorite(videoId) }, 
        { title: 'View Details', action: () => Alert.alert("Showing Details") },
        { title: 'Download', action: () => setVisible(true) },
    ];

    return (
        <View className="absolute top-[35%] z-50 -left-[42vw] w-[40vw] bg-black/80 p-[2vh] rounded-lg shadow-lg">
            <FlatList
                data={tiles}
                keyExtractor={item => item.title}
                renderItem={({ item }) => (
                    <TouchableOpacity className="p-[1vh]" onPress={item.action}>
                        <Text className="text-[2vh] font-pregular text-white">{item.title}</Text>
                    </TouchableOpacity>
                )}
            />

            {/* Snackbar for Download */}
            <Snackbar
                visible={visible}
                duration={2500}
                className="flex-1 absolute justify-between items-center -left-[45vw] h-[10vh] w-[80vw]"
                onDismiss={onDismissSnackBar}
                action={{
                    label: 'Undo',
                    onPress: () => setVisible(false),
                }}>
                Video is downloading! Please wait.
            </Snackbar>
        </View>
    );
};

export default Options;