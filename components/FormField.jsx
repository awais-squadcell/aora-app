import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { icons } from "../constants";

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
  const [isFocused, setIsFocused] = useState(false); 
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-[1vw] ${otherStyles}`}>
      <Text className="text-base text-gray-400 font-pmedium mb-[0.5vh]">
        {title}
      </Text>
      <View
        className={`border-[1px] ${
          isFocused ? 'border-secondary' : 'border-zinc-950'
        } w-full h-[6vh] bg-black-200 p-[5vw] rounded-2xl items-center flex-row`}
      >
        <TextInput
          className="flex-1 text-white font-psemibold text-base h-[10vh]"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onFocus={() => setIsFocused(true)} 
          onBlur={() => setIsFocused(false)}
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
          {...props}
        />
        {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="h-[3vh] w-[6vw]"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
