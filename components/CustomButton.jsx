import { TouchableOpacity, Text } from 'react-native';

const CustomButton = ({title, handlePress, containerStyles, textStyles, isLoading}) => {
  return (
    <TouchableOpacity
    onPress={handlePress}
    activeOpacity={0.7}
    className={`bg-secondary rounded-xl w-[90vw] min-h-[8vh] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50': 'opacity-100'}`}
    disabled={isLoading}>
      <Text className={`text-primary font-psemibold text-[2vh] ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton