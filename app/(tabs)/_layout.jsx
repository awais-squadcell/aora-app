import { View, Text, Image } from 'react-native';
import { Tabs, Redirect } from "expo-router";
import { icons } from "../../constants";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="gap-1 w-[20vw] justify-center items-center mt-[2.5vh]">
      <Image source = {icon}
      resizeMode = 'contain' tintColor = {color} 
      className=" h-[4vh] w-[5vw]"/>
      <Text className = {`${focused ? 'font-psemibold' : 'font-pregular'} text-[3vw]`} style = {{ color : color}}>
        {name}
      </Text>
    </View>
  )
}


const TabsLayout = () => {
  return (
    <>
      <Tabs screenOptions = {{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FFA001',
        tabBarInactiveTintColor: '#CDCDE0',
        tabBarStyle: {
          backgroundColor: '#161622',
          borderTopWidth: 0.3,
          height: '7%',
        }
      }}>
        <Tabs.Screen name='home'
        options={{
          title: 'Home', headerShown: false, 
          tabBarIcon: ({color, focused})=> (
            <TabIcon
            icon = {icons.home}
            color = {color}
            name = 'Home'
            focused = {focused}/>
          )
        }}/>
        <Tabs.Screen name='favorite'
        options={{
          title: 'Favorite', headerShown: false, 
          tabBarIcon: ({color, focused})=> (
            <TabIcon
            icon = {icons.bookmark}
            color = {color}
            name = 'Favorite'
            focused = {focused}/>
          )
        }}/>
        <Tabs.Screen name='create'
        options={{
          title: 'Create', headerShown: false, 
          tabBarIcon: ({color, focused})=> (
            <TabIcon
            icon = {icons.plus}
            color = {color}
            name = 'Create'
            focused = {focused}/>
          )
        }}/>
        <Tabs.Screen name='profile'
        options={{
          title: 'Profile', headerShown: false, 
          tabBarIcon: ({color, focused})=> (
            <TabIcon
            icon = {icons.profile}
            color = {color}
            name = 'Profile'
            focused = {focused}/>
          )
        }}/>
      </Tabs>
    </>
  )
}

export default TabsLayout