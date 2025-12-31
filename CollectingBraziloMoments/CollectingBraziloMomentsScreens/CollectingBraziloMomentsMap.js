import React, { useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import CollectingBraziloMomentsBackground from '../CollectingBraziloMomentsComponents/CollectingBraziloMomentsBackground';
import { collectingBraziloMomentsLocs } from '../CollectingBraziloMomentsData/collectingBraziloMomentsLocs';

const CollectingBraziloMomentsMap = () => {
  const mapRefBraziloMoments = useRef(null);
  const navigationBraziloMoments = useNavigation();
  const routeBraziloMoments = useRoute();

  const focusLocationBraziloMoments = routeBraziloMoments.params?.focusLocation;

  useFocusEffect(
    useCallback(() => {
      if (focusLocationBraziloMoments && mapRefBraziloMoments.current) {
        setTimeout(() => {
          mapRefBraziloMoments.current.animateToRegion(
            {
              latitude: focusLocationBraziloMoments.latitude,
              longitude: focusLocationBraziloMoments.longitude,
              latitudeDelta: 0.4,
              longitudeDelta: 0.4,
            },
            600,
          );
        }, 300);
      }
    }, [focusLocationBraziloMoments]),
  );

  const openLocationBraziloMoments = selectedLocation => {
    navigationBraziloMoments.navigate('CollectingBraziloMomentsLocationsDet', {
      location: selectedLocation,
    });
  };

  const goRandomLocationBraziloMoments = () => {
    const randomBraziloMoments =
      collectingBraziloMomentsLocs[
        Math.floor(Math.random() * collectingBraziloMomentsLocs.length)
      ];

    mapRefBraziloMoments.current?.animateToRegion(
      {
        latitude: randomBraziloMoments.latitude,
        longitude: randomBraziloMoments.longitude,
        latitudeDelta: 0.4,
        longitudeDelta: 0.4,
      },
      600,
    );
  };

  return (
    <CollectingBraziloMomentsBackground>
      <View style={styles.containerBraziloMoments}>
        <MapView
          ref={mapRefBraziloMoments}
          style={styles.mapBraziloMoments}
          initialRegion={{
            latitude: -14.235,
            longitude: -51.9253,
            latitudeDelta: 18,
            longitudeDelta: 18,
          }}
          mapType="standard"
          showsCompass={false}
          toolbarEnabled={false}
        >
          {collectingBraziloMomentsLocs.map(loc => (
            <Marker
              key={loc.id}
              coordinate={{
                latitude: loc.latitude,
                longitude: loc.longitude,
              }}
              anchor={{ x: 0.5, y: 1 }}
              onPress={() => openLocationBraziloMoments(loc)}
            >
              <View style={styles.photoMarkerBraziloMoments}>
                <Image
                  source={loc.image}
                  style={styles.photoMarkerImageBraziloMoments}
                />
              </View>
              {Platform.OS === 'ios' && (
                <Image
                  source={require('../../assets/collectingBraziloMomentsImgs/collectingBraziloBadge.png')}
                  style={styles.markerBadgeBraziloMoments}
                />
              )}
            </Marker>
          ))}
        </MapView>

        <View style={styles.bottomPanelBraziloMoments}>
          <TouchableOpacity
            style={styles.randomBtnBraziloMoments}
            activeOpacity={0.85}
            onPress={goRandomLocationBraziloMoments}
          >
            <Text style={styles.randomTextBraziloMoments}>Random Location</Text>
          </TouchableOpacity>
        </View>
      </View>
    </CollectingBraziloMomentsBackground>
  );
};

const styles = StyleSheet.create({
  containerBraziloMoments: {
    flex: 1,
  },

  mapBraziloMoments: {
    ...StyleSheet.absoluteFillObject,
  },

  photoMarkerBraziloMoments: {
    width: 82,
    height: 82,
    borderRadius: 8,
    overflow: 'hidden',
  },

  photoMarkerImageBraziloMoments: {
    width: '100%',
    height: '100%',
  },

  markerBadgeBraziloMoments: {
    position: 'absolute',
    top: -18,
    right: -18,
  },

  bottomPanelBraziloMoments: {
    position: 'absolute',
    bottom: 126,
    width: '100%',
    paddingHorizontal: 16,
  },

  randomBtnBraziloMoments: {
    height: 52,
    backgroundColor: '#F6AE29',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },

  randomTextBraziloMoments: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CollectingBraziloMomentsMap;
