import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { Icon } from '../../components/icon';
import Carousel, { Pagination } from '@mondomob/react-native-snap-carousel';
import {
  checkMultiple,
  requestMultiple,
  openSettings,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';

const introImages = [
  require('./images/intro-image1.png'),
  require('./images/intro-image2.png'),
];

const platformPermissions = {
  ios: [
    PERMISSIONS.IOS.CAMERA,
    PERMISSIONS.IOS.MICROPHONE,
  ],
  android: [
    PERMISSIONS.ANDROID.CAMERA,
    PERMISSIONS.ANDROID.RECORD_AUDIO,
  ],
};

export function IntroScreen({ navigation }) {
  const [introIndex, setIntroIndex] = useState(0);
  const carouselRef = useRef(null);
  const carouselWidth = useWindowDimensions().width;

  useEffect(() => {
    if (Platform.OS !== 'ios' && Platform.OS !== 'android') {
      return;
    }

    const permissions = platformPermissions[Platform.OS];
    let blockedAny = false;
    let notGranted = [];

    checkMultiple(permissions).then(
      (statuses) => {
        permissions.map((p) => {
          const status = statuses[p];
          if (status === RESULTS.BLOCKED) {
            blockedAny = true;
          } else if (status !== RESULTS.GRANTED) {
            notGranted.push(p);
          }
        });
        notGranted.length && requestMultiple(notGranted);
        blockedAny && openSettings();
      }
    );
  }, []);

  
  return (
    <ImageBackground
      style={styles.container}
      source={require('./images/intro-bg.png')}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.topWrapper}>
          <Icon
            style={styles.hambergerMenu}
            name="hamburger"
            onPress={navigation.openDrawer}
          />
          <Pagination
            carouselRef={carouselRef}
            dotsLength={introImages.length}
            activeDotIndex={introIndex}
            dotStyle={styles.dotStyle}
            inactiveDotOpacity={0.4}
            inactiveDotScale={1}
            tappableDots={true}
          />
          <View style={styles.padding} />
        </View>
        <Carousel
          ref={carouselRef}
          layout={'default'}
          data={introImages}
          sliderWidth={carouselWidth}
          itemWidth={carouselWidth}
          onSnapToItem={(index) => setIntroIndex(index)}
          renderItem={({ item }) => (
            <Image style={styles.introImage} source={item} />
          )}
        />
        <View style={styles.bottomWrapper} pointerEvents="box-none">
          <Image source={require('./images/curve-mask.png')} />
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={styles.createButton}
              onPress={() => navigation.navigate('Join')}
            >
              <Text style={styles.createText}>Create</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.joinButton}
              onPress={() => navigation.navigate('Join', { isJoin: true })}
            >
              <Text style={styles.joinText}>Join</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hambergerMenu: {
    width: 24,
    height: 24,
    marginLeft: 16,
    marginTop: 16,
  },
  padding: {
    width: 24,
    marginLeft: 16,
  },
  introImage: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  dotStyle: {
    width: 7,
    height: 7,
    borderRadius: 5,
    marginHorizontal: 0,
    backgroundColor: '#FFF',
  },
  bottomWrapper: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  buttonWrapper: {
    paddingTop: 24,
    backgroundColor: '#FFF',
  },
  createButton: {
    marginHorizontal: 30,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#0070F3',
  },
  createText: {
    fontSize: 18,
    color: '#FFF',
  },
  joinButton: {
    marginTop: 8,
    marginBottom: 32,
    paddingVertical: 8,
    alignItems: 'center',
  },
  joinText: {
    paddingVertical: 12,
    fontSize: 18,
    color: '#0070F3',
  },
});
