import { useVideoPlayer, VideoView } from 'expo-video';
import { useEventListener } from 'expo';
import { View, StyleSheet } from 'react-native';

export default function VideoController({ source, controls, onVideoEnd, stopOtherVideos, width, height, contentFit }) {

  const dynamicStyles = styles({ height, width });

  const player = useVideoPlayer(source, (player) => {
    player.loop = false;
    player.play();
  });

  // Listen for status changes
  useEventListener(player, 'statusChange', ({ status }) => {
    if (status === 'ended' && onVideoEnd) {
      onVideoEnd(); // Notify parent that the video ended
    }
    if (status === 'playing' && stopOtherVideos) {
      stopOtherVideos(); // Stop other videos when this one starts
    }
  });

  return (
    <View style={dynamicStyles.contentContainer}>
      <VideoView
        player={player}
        allowsPictureInPicture
        nativeControls= {`${controls}`}
        startsPictureInPictureAutomatically
        contentFit={`${contentFit}`}
        style={dynamicStyles.video}
      />
    </View>
  );
}


const styles =({height,width})=> StyleSheet.create({
  contentContainer: {
    width,
    height,
    flex: 1,
    borderRadius: 10,
    borderColor: "#FF9C01",
    borderWidth: 0.5,
    alignItems: 'center',
    overflow: 'hidden',
    justifyContent: 'center',
    margin: 10,
  },
  video: {
    width: '100%',
    height: '100%',
  },
});