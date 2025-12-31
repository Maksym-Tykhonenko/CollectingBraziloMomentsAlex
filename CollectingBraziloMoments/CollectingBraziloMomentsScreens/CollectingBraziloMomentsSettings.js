import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
  Image,
  Linking,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CollectingBraziloMomentsBackground from '../CollectingBraziloMomentsComponents/CollectingBraziloMomentsBackground';
import Toast from 'react-native-toast-message';
import { useStorage } from '../CollectingBraziloMomentsStore/collectingBraziloMomentsContext';

const CollectingBraziloMomentsSettings = () => {
  const { isOnNotification, setIsOnNotification } = useStorage();

  const toggleNotificationsBraziloMoments = async selectedValue => {
    Toast.show({
      text1: !isOnNotification
        ? 'Notifications turned on!'
        : 'Notifications turned off!',
    });

    try {
      await AsyncStorage.setItem(
        'brazilo_moments_notifications',
        JSON.stringify(selectedValue),
      );
      setIsOnNotification(selectedValue);
    } catch (error) {
      console.log('Error', error);
    }
  };

  const resetAllDataBraziloMoments = () => {
    Alert.alert(
      'Reset All Data?',
      'This will remove all saved moments, archives and settings.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.clear();
            setIsOnNotification(false);
          },
        },
      ],
    );
  };

  return (
    <CollectingBraziloMomentsBackground>
      <Image
        source={require('../../assets/collectingBraziloMomentsImgs/braziloBall.png')}
        style={{
          position: 'absolute',
          bottom: 20,
          right: -130,
          width: 340,
          height: 340,
        }}
      />
      <View style={styles.containerBraziloMoments}>
        <Text style={styles.titleBraziloMoments}>Settings</Text>

        <View style={styles.cardBraziloMoments}>
          <Text style={styles.cardTextBraziloMoments}>Notifications</Text>
          <Switch
            value={isOnNotification}
            onValueChange={toggleNotificationsBraziloMoments}
            trackColor={{ false: '#1E3A2B', true: '#F6AE29' }}
            thumbColor="#fff"
          />
        </View>

        {Platform.OS === 'ios' && (
          <TouchableOpacity
            style={styles.cardBraziloMoments}
            activeOpacity={0.7}
            onPress={() =>
              Linking.openURL(
                'https://apps.apple.com/us/app/collecting-brazilo-moments/id6756579577',
              )
            }
          >
            <Text style={styles.cardTextBraziloMoments}>Share the app</Text>
            <Image
              source={require('../../assets/collectingBraziloMomentsImgs/collectingBraziloShr.png')}
            />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.cardBraziloMoments}
          activeOpacity={0.7}
          onPress={resetAllDataBraziloMoments}
        >
          <Text style={styles.cardTextBraziloMoments}>Reset All Data</Text>
          <Image
            source={require('../../assets/collectingBraziloMomentsImgs/collectingBraziloReset.png')}
          />
        </TouchableOpacity>
        {Platform.OS === 'ios' && (
          <TouchableOpacity
            style={styles.cardBraziloMoments}
            activeOpacity={0.7}
            onPress={() =>
              Linking.openURL(
                'https://www.termsfeed.com/live/396a586a-1e13-4d9c-af45-e7d853c97672',
              )
            }
          >
            <Text style={styles.cardTextBraziloMoments}>Terms of Use</Text>
          </TouchableOpacity>
        )}
      </View>
    </CollectingBraziloMomentsBackground>
  );
};

const styles = StyleSheet.create({
  containerBraziloMoments: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 130,
  },

  titleBraziloMoments: {
    color: '#fff',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 28,
    fontFamily: 'Poppins-Medium',
  },

  cardBraziloMoments: {
    backgroundColor: '#012710',
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 18,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 56,
  },

  cardTextBraziloMoments: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
});

export default CollectingBraziloMomentsSettings;
