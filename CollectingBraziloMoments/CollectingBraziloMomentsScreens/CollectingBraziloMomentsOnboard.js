import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CollectingBraziloMomentsBackground from '../CollectingBraziloMomentsComponents/CollectingBraziloMomentsBackground';
import LinearGradient from 'react-native-linear-gradient';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const CollectingBraziloMomentsOnboard = () => {
  const [currentBraziloIndex, setCurrentBraziloIndex] = useState(0);
  const navigation = useNavigation();

  const handleNextBraziloIdx = () => {
    currentBraziloIndex < 2
      ? setCurrentBraziloIndex(currentBraziloIndex + 1)
      : navigation.replace('CollectingBraziloMomentsTabs');
  };

  return (
    <CollectingBraziloMomentsBackground>
      <View style={styles.braziloMomentsContainer}>
        {currentBraziloIndex === 0 ? (
          <View>
            <Image
              source={require('../../assets/collectingBraziloMomentsImgs/collectingBraziloMomentsOnb1.png')}
            />
            {Platform.OS === 'android' && (
              <Image
                source={require('../../assets/collectingBraziloMomentsImgs/braziloBall.png')}
                style={{
                  position: 'absolute',
                  top: -120,
                  right: -120,
                  width: 240,
                  height: 240,
                }}
              />
            )}
          </View>
        ) : currentBraziloIndex === 1 ? (
          <View>
            <Image
              source={require('../../assets/collectingBraziloMomentsImgs/collectingBraziloMomentsOnb2.png')}
              style={{ zIndex: 1 }}
            />
            {Platform.OS === 'android' && (
              <Image
                source={require('../../assets/collectingBraziloMomentsImgs/braziloBall.png')}
                style={{
                  position: 'absolute',
                  bottom: -20,
                  left: -150,
                  width: 240,
                  height: 240,
                }}
              />
            )}
          </View>
        ) : (
          <View>
            <Image
              source={require('../../assets/collectingBraziloMomentsImgs/collectingBraziloMomentsOnb3.png')}
            />
            {Platform.OS === 'android' && (
              <Image
                source={require('../../assets/collectingBraziloMomentsImgs/braziloBall.png')}
                style={{
                  position: 'absolute',
                  top: -120,
                  right: -120,
                  width: 240,
                  height: 240,
                }}
              />
            )}
          </View>
        )}

        <View style={styles.braziloMomentsBottomContainer}>
          <Text style={styles.braziloMomentsTitle}>
            {currentBraziloIndex === 0
              ? 'Welcome to Collecting Brazilo Moments'
              : currentBraziloIndex === 1
              ? 'Explore places across Brazil'
              : 'Collect your travel moments'}
          </Text>
          <Text style={styles.braziloMomentsSubtitle}>
            {currentBraziloIndex === 0
              ? 'Discover Brazil’s most memorable places, save your favourite views, and test what you really know with a Truth or Myth game'
              : currentBraziloIndex === 1
              ? 'Browse curated highlights in three categories: Nature & Wonders, Cities & Culture, and Coast & Festivals. Tap any place to see it on the map'
              : 'Discover the charm of Venice at your own rhythm. Explore iconic landmarks, hidden gems, and local flavors — all in one beautifully crafted journey.'}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 48,
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => navigation.replace('CollectingBraziloMomentsTabs')}
            >
              <Text
                style={[
                  styles.getStartedText,
                  { color: '#FFFFFF', fontSize: 18, fontWeight: '400' },
                ]}
              >
                Skip
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.6}
              onPress={handleNextBraziloIdx}
            >
              <LinearGradient
                colors={['#F5C242', '#F29E2D']}
                style={styles.getStartedButton}
              >
                <Text style={styles.getStartedText}>Next</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </CollectingBraziloMomentsBackground>
  );
};

const styles = StyleSheet.create({
  braziloMomentsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  braziloMomentsBottomContainer: {
    width: '100%',
    backgroundColor: '#012710',
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
    paddingVertical: 40,
    paddingHorizontal: 24,
    minHeight: 300,
  },
  braziloMomentsTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'Poppins-Bold',
    paddingHorizontal: 10,
  },
  braziloMomentsSubtitle: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  getStartedText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  getStartedButton: {
    width: 140,
    borderRadius: 8,
    height: 51,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CollectingBraziloMomentsOnboard;
