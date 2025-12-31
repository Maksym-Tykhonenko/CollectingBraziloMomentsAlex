import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Share,
  ImageBackground,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useStorage } from '../CollectingBraziloMomentsStore/collectingBraziloMomentsContext';
import Toast from 'react-native-toast-message';

const CollectingBraziloMomentsLocationsDet = ({ route }) => {
  const { location } = route.params;
  const navigationBraziloMoments = useNavigation();
  const [isSavedBraziloMoments, setIsSavedBraziloMoments] = useState(false);
  const { isOnNotification } = useStorage();

  useFocusEffect(
    useCallback(() => {
      checkSavedBraziloMoments();
    }, []),
  );

  const checkSavedBraziloMoments = async () => {
    const savedBraziloLocsData = await AsyncStorage.getItem(
      'brazilo_saved_locations',
    );
    const savedLocationsParsed = savedBraziloLocsData
      ? JSON.parse(savedBraziloLocsData)
      : [];
    setIsSavedBraziloMoments(savedLocationsParsed.includes(location.id));
  };

  const toggleSaveBraziloMoments = async () => {
    const savedBraziloLocsData = await AsyncStorage.getItem(
      'brazilo_saved_locations',
    );
    let savedLocationsParsed = savedBraziloLocsData
      ? JSON.parse(savedBraziloLocsData)
      : [];

    isOnNotification &&
      Toast.show({
        type: 'success',
        text1: isSavedBraziloMoments
          ? 'Removed from Favorites Locations!'
          : 'Added to Favorites Locations!',
      });

    if (savedLocationsParsed.includes(location.id)) {
      savedLocationsParsed = savedLocationsParsed.filter(
        locationId => locationId !== location.id,
      );
      setIsSavedBraziloMoments(false);
    } else {
      savedLocationsParsed.push(location.id);
      setIsSavedBraziloMoments(true);
    }

    await AsyncStorage.setItem(
      'brazilo_saved_locations',
      JSON.stringify(savedLocationsParsed),
    );
  };

  const onShareBraziloMoments = async () => {
    await Share.share({
      message: `${location.title}, ${location.subtitle}\n\n${location.description}`,
    });
  };

  return (
    <ImageBackground
      source={require('../../assets/collectingBraziloMomentsImgs/collectingBraziloMomentsBg.png')}
      style={{ flex: 1 }}
    >
      <Image
        source={require('../../assets/collectingBraziloMomentsImgs/braziloBall.png')}
        style={{
          position: 'absolute',
          bottom: 20,
          right: -90,
          width: 210,
          height: 210,
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <View>
          <Image source={location.image} style={styles.imageBraziloMoments} />

          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.backBtnBraziloMoments}
            onPress={() => navigationBraziloMoments.goBack()}
          >
            <Image
              source={require('../../assets/collectingBraziloMomentsImgs/collectingBraziloBck.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.shareBtnBraziloMoments}
            onPress={onShareBraziloMoments}
            activeOpacity={0.6}
          >
            <Image
              source={require('../../assets/collectingBraziloMomentsImgs/collectingBraziloShr.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.heartBtnBraziloMoments}
            onPress={toggleSaveBraziloMoments}
            activeOpacity={0.6}
          >
            {isSavedBraziloMoments ? (
              <Image
                source={require('../../assets/collectingBraziloMomentsImgs/collectingBraziloMomentsHeartFill.png')}
                style={{ width: 24, height: 24 }}
              />
            ) : (
              <Image
                source={require('../../assets/collectingBraziloMomentsImgs/collectingBraziloMomentsHeart.png')}
                style={{ width: 24, height: 24 }}
              />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.bottomContainerBraziloMoments}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          >
            <Text style={styles.titleBraziloMoments}>{location.title}</Text>

            <Text style={styles.descriptionBraziloMoments}>
              {location.description}
            </Text>
          </ScrollView>
        </View>
      </ScrollView>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigationBraziloMoments.navigate('CollectingBraziloMomentsTabs', {
            screen: 'CollectingBraziloMomentsMap',
            params: { focusLocation: location },
          });
        }}
      >
        <LinearGradient
          colors={['#F5C242', '#F29E2D']}
          style={styles.mapButtonBraziloMoments}
        >
          <Text style={styles.mapButtonTextBraziloMoments}>View on Map</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBraziloMoments: {
    width: '100%',
    height: 370,
  },

  backBtnBraziloMoments: {
    position: 'absolute',
    top: 50,
    left: 16,
    width: 48,
    height: 48,
    borderRadius: 4,
    backgroundColor: '#012710',
    justifyContent: 'center',
    alignItems: 'center',
  },

  shareBtnBraziloMoments: {
    position: 'absolute',
    top: 50,
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 4,
    backgroundColor: '#F6AE29',
    justifyContent: 'center',
    alignItems: 'center',
  },

  heartBtnBraziloMoments: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 4,
    backgroundColor: '#BC221B',
    justifyContent: 'center',
    alignItems: 'center',
  },

  heartTextBraziloMoments: {
    color: '#FFF',
    fontSize: 24,
  },

  bottomContainerBraziloMoments: {
    flex: 1,
    padding: 20,
  },

  titleBraziloMoments: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: 8,
  },

  descriptionBraziloMoments: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
  },

  mapButtonBraziloMoments: {
    height: 51,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },

  mapButtonTextBraziloMoments: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CollectingBraziloMomentsLocationsDet;
