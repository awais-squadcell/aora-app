import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { icons } from "../constants";

const SearchInput = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
  const [isFocused, setIsFocused] = useState(false); 
  return (
      <View
        className={`border-[1px] ${
          isFocused ? 'border-secondary' : 'border-zinc-950'
        } w-full h-[6vh] bg-black-200 p-[5vw] rounded-2xl items-center flex-row`}
      >
        <TextInput
          className="flex-1 text-white font-pregular text-base h-[10vh]"
          value={value}
          placeholder='Search for videos'
          placeholderTextColor="#7b7b8b"
          onFocus={() => setIsFocused(true)} 
          onBlur={() => setIsFocused(false)}
          onChangeText={handleChangeText}
          {...props}
        />
        <TouchableOpacity>
          <Image
          source={icons.search}
          resizeMode='contain'
          className="w-[5vw] h-[5vh]"/>
        </TouchableOpacity>
      </View>
  );
};

export default SearchInput;
