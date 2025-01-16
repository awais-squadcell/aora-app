import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from "../constants";

const FormField = ({title, value, placeholder, handleChangeText,otherStyles, ...props }) => {

const [showPassword, setshowPassword] = useState(false);

  return (
    <View className={`space-y-[1vw] ${otherStyles}`}>
      <Text className="text-base text-gray-400 font-pmedium mb-[0.5vh]">
        {title}
      </Text>
      <View className="border-[1px] border-zinc-950 w-full h-[6vh] bg-black-100 p-[5vw] rounded-2xl focus:border-secondary items-center flex-row">
        <TextInput className="flex-1 text-white font-psemibold text-base"
        value={value}
        placeholder={placeholder}
        placeholderTextColor='#7b7b8b'
        onChangeText={handleChangeText}
        secureTextEntry={title === 'Password' && !showPassword}/>

        {title === 'Password' && (
            <TouchableOpacity onPress={()=> setshowPassword(!showPassword)}>
                <Image source={!showPassword ? icons.eye : icons.eyeHide} 
                className="h-[3vh] w-[6vw]"
                resizeMode='contain'/>
            </TouchableOpacity>)}
      </View>
    </View>
  )
}

export default FormField