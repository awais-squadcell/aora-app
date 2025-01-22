import { useVideoPlayer, VideoView } from 'expo-video';
import { StyleSheet, View } from 'react-native';


export default function VideoController({source}) {
  const player = useVideoPlayer(source, player => {
    player.loop = true;
    player.play();
  });

  return (
    <View style={styles.contentContainer}>
      <VideoView style={styles.video} player={player}  allowsPictureInPicture
      startsPictureInPictureAutomatically
       />
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    width: 140,
    height: 150,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
});
