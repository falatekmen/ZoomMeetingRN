import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { TextInputRow } from '../../components/text-input-row';

const DEFAULT_SESSION_NAMES = [
  'grand-canyon',
  'yosemite',
  'yellowstone',
  'disneyland',
  'golden-gate-bridge',
  'monument-valley',
  'death-valley',
  'brooklyn-bridge',
  'hoover-dam',
  'lake-tahoe',
];


export function JoinScreen({ route, navigation }) {
  const [sessionName, setSessionName] = useState('');
  const [sessionPassword, setSessionPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [sessionIdleTimeoutMins, setSessionIdleTimeoutMins] = useState('40');
  const [roleType, setRoleType] = useState('');

  const isJoin = route?.params?.isJoin;

  useEffect(() => {
    navigation.setOptions({
      title: !isJoin ? 'Create a Session' : 'Join a Session',
    });
    if (!isJoin) {
      const defaultSessionName =
        DEFAULT_SESSION_NAMES[
        Math.floor(Math.random() * DEFAULT_SESSION_NAMES.length)
        ] +
        '-' +
        Math.floor(Math.random() * 1000);
      setSessionName(defaultSessionName.trim());
    }
  }, [navigation, isJoin]);

  return (
    <View style={styles.container}>
      <TextInputRow
        label="Session Name"
        placeholder="Required"
        keyboardType="default"
        value={sessionName}
        onChangeText={setSessionName}
      />
      <TextInputRow
        label="Display Name"
        placeholder="Required"
        keyboardType="default"
        value={displayName}
        onChangeText={setDisplayName}
      />
      <TextInputRow
        label="Password"
        placeholder="Optional"
        keyboardType="default"
        value={sessionPassword}
        onChangeText={setSessionPassword}
        secureTextEntry
      />
      <TextInputRow
        label="SessionIdleTimeoutMins"
        placeholder="Optional"
        keyboardType="default"
        value={sessionIdleTimeoutMins}
        onChangeText={setSessionIdleTimeoutMins}
      />
      <TextInputRow
        label="Role Type"
        keyboardType="numeric"
        placeholder="Required (1 for Host, 0 for attendee)"
        value={roleType}
        onChangeText={v => {
          setRoleType(""); v == 0 || v == 1 ? setRoleType(v) : null
        }}
      />
      <TouchableOpacity
        onPress={() =>
          sessionName && displayName && roleType ?
            navigation.navigate('Call', {
              sessionName,
              displayName,
              sessionPassword,
              roleType,
              sessionIdleTimeoutMins,
            }) :
            alert("Fill in all required fields")
        }
        style={styles.button}
      >
        <Text style={styles.buttonText}>{!isJoin ? 'Create' : 'Join'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#0e71eb',
    alignItems: 'center',
    marginTop: 15,
    marginHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});
