import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { icons } from "../constants";
import { router, usePathname } from 'expo-router';

const SearchInput = ({initialQuery}) => {

  const [isFocused, setIsFocused] = useState(false);
  const pathname = usePathname()
  const [query,setQuery] = useState(initialQuery || '')

  return (
      <View
        className={`border-[1px] ${
          isFocused ? 'border-secondary' : 'border-zinc-950'
        } w-full h-[6vh] bg-black-200 p-[5vw] rounded-2xl items-center flex-row`}
      >
        <TextInput
          className="flex-1 text-white font-pregular text-base h-[10vh]"
          value={query}
          placeholder='Search for videos'
          placeholderTextColor="#7b7b8b"
          onFocus={() => setIsFocused(true)} 
          onBlur={() => setIsFocused(false)}
          onChangeText={(e)=> setQuery(e)}
          
        />
        <TouchableOpacity
        onPress={()=>{
          if (!query) {
            return Alert.alert('Missing data','Enter a title or a name')
          }
          if (pathname.startsWith('/search')) router.setParams({query})
            else router.push(`/search/${query}`)
        }}>
          <Image
          source={icons.search}
          resizeMode='contain'
          className="w-[5vw] h-[5vh]"/>
        </TouchableOpacity>
      </View>
  );
};

export default SearchInput;
