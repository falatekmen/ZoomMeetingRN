import * as React from 'react';
import { ZoomVideoSdkProvider } from '@zoom/react-native-videosdk';
import { NavigationContainer } from '@react-navigation/native';

import { Navigation } from './navigation';
import { LogBox } from 'react-native';

const ignoreWarns = [
  "new NativeEventEmitter()",
];

LogBox.ignoreLogs(ignoreWarns);


export default function App() {
  return (
    <NavigationContainer>
      <ZoomVideoSdkProvider
        config={{
          appGroupId: 'add your apple group ID here',
          domain: 'zoom.us',
          enableLog: true,
          enableFullHD: true,
        }}
      >
        <Navigation />
      </ZoomVideoSdkProvider>
    </NavigationContainer>
  );
}
