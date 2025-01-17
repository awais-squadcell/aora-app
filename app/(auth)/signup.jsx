import { View, Text, ScrollView, Image } from 'react-native'
import { images } from "../../constants";
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField';
import { useState } from 'react';
import CustomButton from '../../components/CustomButton';
import { Link } from 'expo-router';

const Signup = () => {

const [form, setform] = useState({username: '' ,email: '', password: ''});

const [isSubmitting, setisSubmitting] = useState(false);
const submit = ()=> {

}

  return (
    <SafeAreaView className="bg-primary h-full flex-1">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-[2vw] my-[2vh]">
          <Image 
          source={images.logo} resizeMode='contain' 
          className="w-[40vw] h-[8vh] mb-[5vh]"/>
          <Text className="text-[4vh] text-white font-psemibold px-[2vw] mb-[3vh]">Signup to Aora</Text>
          <View className="w-full justify-center items-center flex-col">
          <FormField 
          title = 'Username'
          value={form.username}
          placeholder='name'
          handleChangeText = {(e)=> setform({ ...form, username: e})} 
          otherStyles='mb-[4vh] mx-[2vw]'/>
          <FormField 
          title = 'Email'
          value={form.email}
          placeholder='me@email.com'
          handleChangeText = {(e)=> setform({ ...form, email: e})} 
          keyboardType = "email-address"
          otherStyles='mb-[4vh] mx-[2vw]'/>
          <FormField 
          title = 'Password'
          value={form.password}
          placeholder='password'
          handleChangeText = {(e)=> setform({ ...form, password: e})} otherStyles='mx-[2vw]'/>
          <CustomButton 
            title='Sign Up'
            handlePress={submit}
            containerStyles='mt-[7vh] mx-[2vw]'
            isLoading={isSubmitting}/>
          <View className="flex-row justify-center gap-[2vh] p-[1vh] m-[1vh]">
            <Text className="text-[2vh] text-zinc-400 font-pregular">Already have an account?</Text>
            <Link href='/login' className="text-[2vh] text-secondary font-psemibold">Login</Link>
          </View>  
          </View>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Signup