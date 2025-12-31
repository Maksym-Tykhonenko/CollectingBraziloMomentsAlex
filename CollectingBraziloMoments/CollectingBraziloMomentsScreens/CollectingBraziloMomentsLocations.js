import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Share,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useStorage } from '../CollectingBraziloMomentsStore/collectingBraziloMomentsContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CollectingBraziloMomentsBackground from '../CollectingBraziloMomentsComponents/CollectingBraziloMomentsBackground';
import { collectingBraziloMomentsLocs } from '../CollectingBraziloMomentsData/collectingBraziloMomentsLocs';
import { braziloMomentsCategories } from '../CollectingBraziloMomentsConsts/braziloMomentsCategories';

const CollectingBraziloMomentsLocations = () => {
  const navigation = useNavigation();
  const [selectedCategoryBraziloMoments, setSelectedCategoryBraziloMoments] =
    useState('Cities & Culture');
  const [searchQueryBraziloMoments, setSearchQueryBraziloMoments] =
    useState('');
  const {
    setIsOnNotification,
    savedIdsBraziloMoments,
    loadSavedBraziloMoments,
  } = useStorage();

  useFocusEffect(
    useCallback(() => {
      loadBraziloMomentsSettings();
    }, []),
  );

  const loadBraziloMomentsSettings = async () => {
    try {
      const notifValueBraziloMoments = await AsyncStorage.getItem(
        'brazilo_moments_notifications',
      );
      if (notifValueBraziloMoments !== null)
        setIsOnNotification(JSON.parse(notifValueBraziloMoments));
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadSavedBraziloMoments();
    }, []),
  );

  const filteredLocationsBraziloMoments = collectingBraziloMomentsLocs.filter(
    item => {
      const matchedBraziloCardCategory =
        item.category === selectedCategoryBraziloMoments;
      const matchedBraziloCardSearch = item.title
        .toLowerCase()
        .includes(searchQueryBraziloMoments.toLowerCase());

      return matchedBraziloCardCategory && matchedBraziloCardSearch;
    },
  );

  const toggleShareBraziloMoments = async item => {
    try {
      await Share.share({
        message: `${item.title}, ${item.subtitle}\n\n${item.description}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const toggleSavedBraziloMoments = async id => {
    try {
      let updatedSavedBraziloMoments = [];

      if (savedIdsBraziloMoments.includes(id)) {
        updatedSavedBraziloMoments = savedIdsBraziloMoments.filter(
          savedId => savedId !== id,
        );
      } else {
        updatedSavedBraziloMoments = [...savedIdsBraziloMoments, id];
      }

      await AsyncStorage.setItem(
        'brazilo_saved_locations',
        JSON.stringify(updatedSavedBraziloMoments),
      );

      loadSavedBraziloMoments();
    } catch (error) {
      console.log(error);
    }
  };

  const renderItemBraziloMoments = ({ item }) => {
    const isSavedBraziloMoments = savedIdsBraziloMoments.includes(item.id);

    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() =>
          navigation.navigate('CollectingBraziloMomentsLocationsDet', {
            location: item,
          })
        }
        style={styles.cardBraziloMoments}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
          }}
        >
          <Image source={item.image} style={styles.cardImageBraziloMoments} />

          <View style={styles.cardInfoBraziloMoments}>
            <Text numberOfLines={2} style={styles.cardTitleBraziloMoments}>
              {item.title}, {item.subtitle}
            </Text>

            <Text numberOfLines={2} style={styles.cardDescBraziloMoments}>
              {item.description}
            </Text>

            <View style={styles.cardFooterBraziloMoments}>
              <Text style={styles.cardCategoryBraziloMoments}>
                {item.category}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.actionsBraziloMoments}>
          <TouchableOpacity
            style={styles.heartBtnBraziloMoments}
            onPress={() => toggleSavedBraziloMoments(item.id)}
          >
            {isSavedBraziloMoments ? (
              <Image
                source={require('../../assets/collectingBraziloMomentsImgs/collectingBraziloMomentsHeartFill.png')}
                style={{ width: 16, height: 16 }}
              />
            ) : (
              <Image
                source={require('../../assets/collectingBraziloMomentsImgs/collectingBraziloMomentsHeart.png')}
                style={{ width: 16, height: 16 }}
              />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.shareBtnBraziloMoments}
            onPress={() => toggleShareBraziloMoments(item)}
          >
            <Image
              source={require('../../assets/collectingBraziloMomentsImgs/collectingBraziloShare.png')}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
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
        <Text style={styles.screenTitleBraziloMoments}>
          Explore the Beauty of Brazil
        </Text>

        <View style={styles.categoriesRowBraziloMoments}>
          {braziloMomentsCategories.map(braziloCategory => {
            const isActiveBraziloMoments =
              selectedCategoryBraziloMoments === braziloCategory;

            return (
              <TouchableOpacity
                key={braziloCategory}
                activeOpacity={0.7}
                onPress={() =>
                  setSelectedCategoryBraziloMoments(braziloCategory)
                }
                style={[
                  styles.categoryButtonBraziloMoments,
                  isActiveBraziloMoments &&
                    styles.categoryButtonActiveBraziloMoments,
                ]}
              >
                <Text
                  style={[
                    styles.categoryButtonTextBraziloMoments,
                    isActiveBraziloMoments &&
                      styles.categoryButtonTextActiveBraziloMoments,
                  ]}
                >
                  {braziloCategory}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.searchBoxBraziloMoments}>
          <Image
            source={require('../../assets/collectingBraziloMomentsImgs/collectingBraziloSearch.png')}
          />
          <TextInput
            placeholder="Search locations ..."
            placeholderTextColor="#9DB8A0"
            value={searchQueryBraziloMoments}
            onChangeText={setSearchQueryBraziloMoments}
            style={styles.searchInputBraziloMoments}
          />
        </View>

        <View style={{ zIndex: 20 }}>
          <FlatList
            data={filteredLocationsBraziloMoments}
            scrollEnabled={false}
            keyExtractor={item => item.id}
            renderItem={renderItemBraziloMoments}
            contentContainerStyle={{
              padding: 16,
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </CollectingBraziloMomentsBackground>
  );
};

const styles = StyleSheet.create({
  containerBraziloMoments: {
    flex: 1,
    paddingTop: 60,
    paddingBottom: 130,
  },

  screenTitleBraziloMoments: {
    color: '#fff',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 24,
    fontFamily: 'Poppins-Medium',
  },

  categoriesRowBraziloMoments: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#012710',
    borderRadius: 4,
  },

  categoryButtonBraziloMoments: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  categoryButtonActiveBraziloMoments: {
    backgroundColor: '#F6AE29',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 4,
  },

  categoryButtonTextBraziloMoments: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    paddingHorizontal: 5,
  },

  categoryButtonTextActiveBraziloMoments: {
    color: '#000',
    fontSize: 12,
  },

  searchBoxBraziloMoments: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#012710',
    marginHorizontal: 16,
    borderRadius: 4,
    paddingRight: 12,
    minHeight: 48,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#fff',
  },

  searchInputBraziloMoments: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
    paddingLeft: 8,
  },

  cardBraziloMoments: {
    flexDirection: 'row',
    backgroundColor: '#012710',
    borderRadius: 12,
    marginBottom: 14,
    overflow: 'hidden',
    paddingLeft: 8,
    paddingVertical: 8,
  },

  cardImageBraziloMoments: {
    width: 96,
    height: 96,
    borderRadius: 4,
  },

  cardInfoBraziloMoments: {
    flex: 1,
    padding: 10,
  },

  cardTitleBraziloMoments: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: 'Poppins-Bold',
  },

  cardDescBraziloMoments: {
    color: '#B7E4C7',
    fontSize: 12,
    marginTop: 4,
  },

  cardFooterBraziloMoments: {
    marginTop: 6,
  },

  cardCategoryBraziloMoments: {
    color: '#9BE15D',
    fontSize: 12,
  },

  actionsBraziloMoments: {
    justifyContent: 'space-between',
    padding: 8,
  },

  heartBtnBraziloMoments: {
    backgroundColor: '#C62828',
    width: 32,
    height: 32,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  heartTextBraziloMoments: {
    color: '#FFFFFF',
    fontSize: 16,
  },

  shareBtnBraziloMoments: {
    backgroundColor: '#F6AE29',
    width: 32,
    height: 32,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CollectingBraziloMomentsLocations;
