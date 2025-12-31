import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Share,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CollectingBraziloMomentsBackground from '../CollectingBraziloMomentsComponents/CollectingBraziloMomentsBackground';
import LinearGradient from 'react-native-linear-gradient';
import { useStorage } from '../CollectingBraziloMomentsStore/collectingBraziloMomentsContext';
import Toast from 'react-native-toast-message';
import { brazilMomentsThemes } from '../CollectingBraziloMomentsConsts/brazilMomentsThemes';

const CollectingBraziloMomentsMoments = () => {
  const [modeBraziloMoments, setModeBraziloMoments] = useState('BOARD');
  const [themeIndexBraziloMoments, setThemeIndexBraziloMoments] = useState(0);
  const [dropdownOpenBraziloMoments, setDropdownOpenBraziloMoments] =
    useState(false);
  const [selectedIdsBraziloMoments, setSelectedIdsBraziloMoments] = useState(
    [],
  );

  const [archivesBraziloMoments, setArchivesBraziloMoments] = useState([]);
  const [archiveIndexBraziloMoments, setArchiveIndexBraziloMoments] =
    useState(0);
  const { isOnNotification } = useStorage();

  const themeBraziloMoments = brazilMomentsThemes[themeIndexBraziloMoments];
  const currentArchiveBraziloMoments =
    archivesBraziloMoments[archiveIndexBraziloMoments];

  useEffect(() => {
    const loadBraziloMoments = async () => {
      const braziloSavedMoments = await AsyncStorage.getItem(
        'collecting_brazilo_moments_archives',
      );
      if (braziloSavedMoments) {
        const parsedSaved = JSON.parse(braziloSavedMoments);
        setArchivesBraziloMoments(parsedSaved.archives || []);
        setArchiveIndexBraziloMoments(parsedSaved.archiveIndex || 0);
      }
    };
    loadBraziloMoments();
  }, []);

  const persistBraziloMoments = async (nextArchives, nextIndex) => {
    await AsyncStorage.setItem(
      'collecting_brazilo_moments_archives',
      JSON.stringify({
        archives: nextArchives,
        archiveIndex: nextIndex,
      }),
    );
  };

  const toggleItemBraziloMoments = selId => {
    setSelectedIdsBraziloMoments(prevState =>
      prevState.includes(selId)
        ? prevState.filter(i => i !== selId)
        : [...prevState, selId],
    );
  };

  const saveToArchiveBraziloMoments = async () => {
    const newArchive = {
      id: Date.now().toString(),
      themeTitle: themeBraziloMoments.title,
      allItems: themeBraziloMoments.items,
      selectedIds: selectedIdsBraziloMoments,
    };

    const nextBraziloArchives = [...archivesBraziloMoments, newArchive];
    const nextBraziloIndex = nextBraziloArchives.length - 1;

    setArchivesBraziloMoments(nextBraziloArchives);
    setArchiveIndexBraziloMoments(nextBraziloIndex);
    setSelectedIdsBraziloMoments([]);
    setModeBraziloMoments('ARCHIVE');

    isOnNotification &&
      Toast.show({
        type: 'success',
        text1: 'Successfully saved to Archive!',
      });

    await persistBraziloMoments(nextBraziloArchives, nextBraziloIndex);
  };

  const deleteArchiveBraziloMoments = () => {
    Alert.alert('Delete Archive?', 'This action cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const nextArchives = archivesBraziloMoments.filter(
            (_, i) => i !== archiveIndexBraziloMoments,
          );

          const nextIndex =
            nextArchives.length === 0
              ? 0
              : archiveIndexBraziloMoments % nextArchives.length;

          setArchivesBraziloMoments(nextArchives);
          setArchiveIndexBraziloMoments(nextIndex);

          if (nextArchives.length === 0) {
            setModeBraziloMoments('BOARD');
          }

          isOnNotification &&
            Toast.show({
              type: 'success',
              text1: 'Successfully deleted from Archive!',
            });

          await persistBraziloMoments(nextArchives, nextIndex);
        },
      },
    ]);
  };

  const shareArchiveBraziloMoments = async () => {
    if (!currentArchiveBraziloMoments) return;
    await Share.share({
      message: `${currentArchiveBraziloMoments.themeTitle}\n\n${currentArchiveBraziloMoments.selectedIds.length} moments collected`,
    });
  };

  const dataBraziloMoments =
    modeBraziloMoments === 'BOARD'
      ? themeBraziloMoments.items
      : currentArchiveBraziloMoments
      ? currentArchiveBraziloMoments.allItems
      : [];

  const dotsCountBraziloMoments = Math.min(4, archivesBraziloMoments.length);
  const activeDotIndexBraziloMoments =
    dotsCountBraziloMoments > 0
      ? archiveIndexBraziloMoments % dotsCountBraziloMoments
      : 0;

  const goPrevBraziloMoments = () => {
    setArchiveIndexBraziloMoments(
      i =>
        (i - 1 + archivesBraziloMoments.length) % archivesBraziloMoments.length,
    );
  };

  const goNextBraziloMoments = () => {
    setArchiveIndexBraziloMoments(i => (i + 1) % archivesBraziloMoments.length);
  };

  const renderItemBraziloMoments = ({ item }) => {
    const isActiveBraziloArchive =
      modeBraziloMoments === 'ARCHIVE'
        ? currentArchiveBraziloMoments?.selectedIds.includes(item.id)
        : selectedIdsBraziloMoments.includes(item.id);

    return (
      <TouchableOpacity
        style={styles.cardBraziloMoments}
        activeOpacity={0.9}
        onPress={() =>
          modeBraziloMoments === 'BOARD' && toggleItemBraziloMoments(item.id)
        }
      >
        {isActiveBraziloArchive ? (
          <>
            <Image source={item.image} style={styles.imageBraziloMoments} />
            {modeBraziloMoments === 'BOARD' && (
              <TouchableOpacity
                style={styles.closeBtnBraziloMoments}
                onPress={() => toggleItemBraziloMoments(item.id)}
              >
                <Image
                  source={require('../../assets/collectingBraziloMomentsImgs/collectingBraziloClose.png')}
                />
              </TouchableOpacity>
            )}
          </>
        ) : (
          <View style={styles.placeholderBraziloMoments}>
            <Text style={styles.cardTextBraziloMoments}>{item.title}</Text>
            <Image
              source={require('../../assets/collectingBraziloMomentsImgs/collectingBraziloPlaceH.png')}
            />
          </View>
        )}
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
        <Text style={styles.titleBraziloMoments}>
          Collect your travel moments
        </Text>

        <View style={styles.switchBraziloMoments}>
          <TouchableOpacity
            style={[
              styles.switchBtnBraziloMoments,
              modeBraziloMoments === 'BOARD' && styles.activeBraziloMoments,
            ]}
            onPress={() => setModeBraziloMoments('BOARD')}
          >
            <Text
              style={{
                color: modeBraziloMoments === 'BOARD' ? '#000' : '#fff',
              }}
            >
              Board
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.switchBtnBraziloMoments,
              modeBraziloMoments === 'ARCHIVE' && styles.activeBraziloMoments,
            ]}
            onPress={() => setModeBraziloMoments('ARCHIVE')}
          >
            <Text
              style={{
                color: modeBraziloMoments === 'ARCHIVE' ? '#000' : '#fff',
              }}
            >
              My Archive
            </Text>
          </TouchableOpacity>
        </View>

        {modeBraziloMoments === 'BOARD' && (
          <View style={styles.dropdownWrapperBraziloMoments}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.dropdownBraziloMoments}
              onPress={() =>
                setDropdownOpenBraziloMoments(!dropdownOpenBraziloMoments)
              }
            >
              <Text style={styles.dropdownTextBraziloMoments}>
                {themeBraziloMoments.title}
              </Text>
              <Image
                source={require('../../assets/collectingBraziloMomentsImgs/collectingBraziloArr.png')}
                style={{
                  transform: [
                    {
                      rotate: dropdownOpenBraziloMoments ? '180deg' : '0deg',
                    },
                  ],
                }}
              />
            </TouchableOpacity>

            {dropdownOpenBraziloMoments && (
              <View style={styles.dropdownOverlayBraziloMoments}>
                {brazilMomentsThemes.map((t, i) => (
                  <TouchableOpacity
                    key={t.id}
                    style={styles.dropdownItemBraziloMoments}
                    onPress={() => {
                      setThemeIndexBraziloMoments(i);
                      setSelectedIdsBraziloMoments([]);
                      setDropdownOpenBraziloMoments(false);
                    }}
                  >
                    <Text style={styles.dropdownItemTextBraziloMoments}>
                      {t.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        )}

        {modeBraziloMoments === 'ARCHIVE' && currentArchiveBraziloMoments && (
          <View style={styles.archiveTitleBoxBraziloMoments}>
            <Text style={styles.archiveTitleBraziloMoments}>
              {currentArchiveBraziloMoments.themeTitle}
            </Text>
          </View>
        )}

        {(modeBraziloMoments === 'BOARD' || currentArchiveBraziloMoments) && (
          <FlatList
            data={dataBraziloMoments}
            keyExtractor={item => item.id}
            numColumns={3}
            renderItem={renderItemBraziloMoments}
            scrollEnabled={false}
          />
        )}

        {modeBraziloMoments === 'BOARD' &&
          selectedIdsBraziloMoments.length >= 5 && (
            <TouchableOpacity
              onPress={saveToArchiveBraziloMoments}
              style={{ marginTop: 20 }}
            >
              <LinearGradient
                colors={['#F5C242', '#F29E2D']}
                style={styles.mainBtnBraziloMoments}
              >
                <Text style={styles.mainTextBraziloMoments}>
                  Save to Archive
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          )}

        {modeBraziloMoments === 'ARCHIVE' && currentArchiveBraziloMoments && (
          <View style={styles.archiveRowBraziloMoments}>
            <TouchableOpacity
              style={styles.deleteBtnBraziloMoments}
              onPress={deleteArchiveBraziloMoments}
            >
              <Image
                source={require('../../assets/collectingBraziloMomentsImgs/collectingBraziloDel.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={shareArchiveBraziloMoments}
            >
              <LinearGradient
                colors={['#F5C242', '#F29E2D']}
                style={styles.mainBtnBraziloMoments}
              >
                <Text style={styles.mainTextBraziloMoments}>Share</Text>
                <Image
                  source={require('../../assets/collectingBraziloMomentsImgs/collectingBraziloShrBtn.png')}
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}

        {modeBraziloMoments === 'ARCHIVE' &&
          archivesBraziloMoments.length > 1 && (
            <View style={styles.paginationWrapBraziloMoments}>
              <TouchableOpacity
                style={styles.arrowBtnBraziloMoments}
                onPress={goPrevBraziloMoments}
              >
                <Text style={styles.arrowTextBraziloMoments}>‹</Text>
              </TouchableOpacity>

              <View style={styles.paginationBraziloMoments}>
                {Array.from({ length: dotsCountBraziloMoments }).map((_, i) => (
                  <View
                    key={i}
                    style={[
                      styles.pageDotBraziloMoments,
                      i === activeDotIndexBraziloMoments &&
                        styles.pageDotActiveBraziloMoments,
                    ]}
                  />
                ))}
              </View>

              <TouchableOpacity
                style={styles.arrowBtnBraziloMoments}
                onPress={goNextBraziloMoments}
              >
                <Text style={styles.arrowTextBraziloMoments}>›</Text>
              </TouchableOpacity>
            </View>
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
    marginBottom: 24,
    fontFamily: 'Poppins-Medium',
  },
  switchBraziloMoments: {
    flexDirection: 'row',
    backgroundColor: '#012710',
    borderRadius: 4,
    marginBottom: 26,
  },
  switchBtnBraziloMoments: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  activeBraziloMoments: {
    backgroundColor: '#F6AE29',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 4,
  },
  dropdownWrapperBraziloMoments: { position: 'relative', zIndex: 20 },
  dropdownBraziloMoments: {
    backgroundColor: '#012710',
    padding: 12,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  dropdownTextBraziloMoments: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  dropdownOverlayBraziloMoments: {
    position: 'absolute',
    top: 48,
    left: 0,
    right: 0,
    backgroundColor: '#012710',
    borderRadius: 4,
    zIndex: 30,
  },
  dropdownItemBraziloMoments: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E3A2B',
  },
  dropdownItemTextBraziloMoments: { color: '#fff', fontSize: 16 },
  archiveTitleBoxBraziloMoments: {
    padding: 12,
    borderRadius: 4,
    marginBottom: 3,
    alignItems: 'center',
  },
  archiveTitleBraziloMoments: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  cardBraziloMoments: {
    flex: 1,
    margin: 3,
    marginBottom: 8,
    height: 117,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#012710',
  },
  placeholderBraziloMoments: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  cardTextBraziloMoments: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
  imageBraziloMoments: { width: '100%', height: '100%' },
  closeBtnBraziloMoments: { position: 'absolute', top: 4, right: 4 },
  mainBtnBraziloMoments: {
    height: 52,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    gap: 8,
  },
  mainTextBraziloMoments: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  archiveRowBraziloMoments: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 24,
  },
  deleteBtnBraziloMoments: {
    width: 52,
    height: 52,
    backgroundColor: '#FF383C',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationWrapBraziloMoments: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  paginationBraziloMoments: { flexDirection: 'row', gap: 8 },
  pageDotBraziloMoments: {
    width: 38,
    height: 3,
    backgroundColor: '#FFFFFF99',
  },
  pageDotActiveBraziloMoments: { backgroundColor: '#F6AE29' },
  arrowBtnBraziloMoments: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowTextBraziloMoments: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },
});

export default CollectingBraziloMomentsMoments;
