import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import CollectingBraziloMomentsBackground from '../CollectingBraziloMomentsComponents/CollectingBraziloMomentsBackground';

const CollectingBraziloMomentsIntroQuiz = () => {
  const navigationBraziloMoments = useNavigation();

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
        <Text style={styles.titleBraziloMoments}>
          Truth or Myth: Brazil Edition
        </Text>

        <Image
          source={require('../../assets/collectingBraziloMomentsImgs/collectingBrazilIntro.png')}
        />

        <View style={styles.infoBoxBraziloMoments}>
          <Text style={styles.infoTextBraziloMoments}>
            Read a statement about Brazil, decide if it’s true or a myth, and
            learn a short fact after each answer
          </Text>
        </View>

        <TouchableOpacity
          onPress={() =>
            navigationBraziloMoments.navigate('CollectingBraziloMomentsQuiz')
          }
          style={styles.fullWidthBraziloMoments}
        >
          <LinearGradient
            colors={['#F5C242', '#F29E2D']}
            style={styles.startBtnBraziloMoments}
          >
            <Text style={styles.startTextBraziloMoments}>Start Exploring</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </CollectingBraziloMomentsBackground>
  );
};

const styles = StyleSheet.create({
  containerBraziloMoments: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingBottom: 130,
  },

  titleBraziloMoments: {
    color: '#fff',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 14,
    fontFamily: 'Poppins-Medium',
  },

  infoBoxBraziloMoments: {
    borderWidth: 1,
    borderColor: '#FFFFFF',
    padding: 16,
    borderRadius: 4,
    marginBottom: 24,
    backgroundColor: '#012710',
  },

  infoTextBraziloMoments: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },

  fullWidthBraziloMoments: {
    width: '100%',
  },

  startBtnBraziloMoments: {
    height: 54,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  startTextBraziloMoments: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default CollectingBraziloMomentsIntroQuiz;
