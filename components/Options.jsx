import { FlatList, TouchableOpacity, View, Text, Alert } from 'react-native';

const tiles = [
    { title: 'Play', action: () => Alert.alert("Playing Video") },
    { title: 'Favorite', action: () => Alert.alert("Added to Favorites") },
    { title: 'View Details', action: () => Alert.alert("Showing Details") },
    { title: 'Download', action: () => Alert.alert("Downloading...") },
];

const Item = ({ title, onPress }) => (
    <TouchableOpacity 
    className="p-[1vh]"
    onPress={onPress}>
        <Text className="text-[2vh] font-pregular text-white">{title}</Text>
    </TouchableOpacity>
);

const Options = ({ isVisible }) => {
    if (!isVisible) return null; // Hide if not visible

    return (
        <View className="absolute top-[35%] z-50 -left-[42vw] w-[40vw] bg-black/80 p-[2vh] rounded-lg shadow-lg">
            <FlatList
                data={tiles}
                keyExtractor={item => item.title}
                renderItem={({ item }) => 
                <Item 
                title={item.title}
                onPress={item.action} />}
            />
        </View>
    );
};

export default Options;
