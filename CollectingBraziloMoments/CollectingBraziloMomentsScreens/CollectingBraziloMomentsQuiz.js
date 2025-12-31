import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Share,
  Image,
} from 'react-native';
import CollectingBraziloMomentsBackground from '../CollectingBraziloMomentsComponents/CollectingBraziloMomentsBackground';
import { collectingBraziloQuizData } from '../CollectingBraziloMomentsData/collectingBraziloQuizData';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const getRandomBraziloQuestions = (selData, currCount = 10) => {
  const shuffledQuestions = [...selData].sort(() => 0.5 - Math.random());
  return shuffledQuestions.slice(0, currCount);
};

const CollectingBraziloMomentsQuiz = () => {
  const [indexBraziloMoments, setIndexBraziloMoments] = useState(0);
  const [scoreBraziloMoments, setScoreBraziloMoments] = useState(0);
  const [selectedBraziloMoments, setSelectedBraziloMoments] = useState(null);
  const [showResultBraziloMoments, setShowResultBraziloMoments] =
    useState(false);
  const [quizBraziloMoments, setQuizBraziloMoments] = useState(() =>
    getRandomBraziloQuestions(collectingBraziloQuizData, 10),
  );

  const navigationBraziloMoments = useNavigation();

  const currentBraziloMoments = quizBraziloMoments[indexBraziloMoments];

  const onAnswerBraziloMoments = answerBraziloMoments => {
    if (selectedBraziloMoments) return;

    setSelectedBraziloMoments(answerBraziloMoments);
    setShowResultBraziloMoments(true);

    if (answerBraziloMoments === currentBraziloMoments.answer) {
      setScoreBraziloMoments(prev => prev + 1);
    }
  };

  const onNextBraziloMoments = () => {
    if (indexBraziloMoments + 1 >= quizBraziloMoments.length) {
      Alert.alert(
        '🎉 Great job, Traveler!',
        `You scored ${scoreBraziloMoments} out of ${quizBraziloMoments.length}.\n\nKeep exploring see if you can beat your record next time`,
        [{ text: 'OK' }],
      );

      setQuizBraziloMoments(
        getRandomBraziloQuestions(collectingBraziloQuizData, 10),
      );
      setIndexBraziloMoments(0);
      setScoreBraziloMoments(0);
      setSelectedBraziloMoments(null);
      setShowResultBraziloMoments(false);
      return;
    }

    setIndexBraziloMoments(prev => prev + 1);
    setSelectedBraziloMoments(null);
    setShowResultBraziloMoments(false);
  };

  const onShareBraziloMoments = async () => {
    await Share.share({
      message: `${currentBraziloMoments.statement}\n\n${currentBraziloMoments.explanation}`,
    });
  };

  const onPauseBraziloMoments = () => {
    Alert.alert(
      'Game Paused',
      'Tap Resume to continue the quiz or Exit to return the main menu',
      [
        {
          text: 'Exit',
          style: 'destructive',
          onPress: () => {
            setQuizBraziloMoments(
              getRandomBraziloQuestions(collectingBraziloQuizData, 10),
            );
            setIndexBraziloMoments(0);
            setScoreBraziloMoments(0);
            setSelectedBraziloMoments(null);
            setShowResultBraziloMoments(false);
            navigationBraziloMoments.goBack();
          },
        },
        { text: 'Resume' },
      ],
      { cancelable: true },
    );
  };

  return (
    <CollectingBraziloMomentsBackground>
      <View style={styles.containerBraziloMoments}>
        <View style={styles.headerBraziloMoments}>
          <Text style={styles.counterBraziloMoments}>
            Question {indexBraziloMoments + 1}/ 10
          </Text>

          <TouchableOpacity
            style={styles.pauseBtnBraziloMoments}
            onPress={onPauseBraziloMoments}
          >
            <Image
              source={require('../../assets/collectingBraziloMomentsImgs/collectingBrazilPause.png')}
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.statementBoxBraziloMoments}>
          <Text style={styles.statementTextBraziloMoments}>
            {currentBraziloMoments.statement}
          </Text>
        </View>

        <View style={styles.answersRowBraziloMoments}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={[
              styles.answerBtnBraziloMoments,
              { backgroundColor: '#FF383C' },
            ]}
            onPress={() => onAnswerBraziloMoments('Myth')}
          >
            <Text style={styles.answerTextBraziloMoments}>Myth</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.6}
            style={[
              styles.answerBtnBraziloMoments,
              { backgroundColor: '#006C2B' },
            ]}
            onPress={() => onAnswerBraziloMoments('Truth')}
          >
            <Text style={styles.answerTextBraziloMoments}>Truth</Text>
          </TouchableOpacity>
        </View>

        {showResultBraziloMoments && (
          <View style={styles.resultBoxBraziloMoments}>
            <Text style={styles.resultTitleBraziloMoments}>
              {currentBraziloMoments.answer}
            </Text>

            <Text style={styles.explanationBraziloMoments}>
              {currentBraziloMoments.explanation}
            </Text>

            <TouchableOpacity
              activeOpacity={0.6}
              onPress={onShareBraziloMoments}
            >
              <LinearGradient
                colors={['#F5C242', '#F29E2D']}
                style={styles.shareBtnBraziloMoments}
              >
                <Text style={styles.shareTextBraziloMoments}>Share</Text>
                <Image
                  source={require('../../assets/collectingBraziloMomentsImgs/collectingBraziloShrBtn.png')}
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}

        {showResultBraziloMoments && (
          <View style={styles.nextWrapperBraziloMoments}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={onNextBraziloMoments}
            >
              <LinearGradient
                colors={['#F5C242', '#F29E2D']}
                style={styles.nextBtnBraziloMoments}
              >
                <Text style={styles.nextTextBraziloMoments}>Next</Text>
              </LinearGradient>
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
    paddingBottom: 30,
  },
  headerBraziloMoments: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  counterBraziloMoments: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Poppins-Medium',
  },
  pauseBtnBraziloMoments: {
    width: 56,
    height: 56,
    backgroundColor: '#012710',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statementBoxBraziloMoments: {
    borderWidth: 1,
    borderColor: '#fff',
    padding: 20,
    borderRadius: 4,
    marginBottom: 60,
    backgroundColor: '#012710',
  },
  statementTextBraziloMoments: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
  },
  answersRowBraziloMoments: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  answerBtnBraziloMoments: {
    flex: 1,
    height: 52,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
  },
  answerTextBraziloMoments: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resultBoxBraziloMoments: {
    borderWidth: 1,
    borderColor: '#fff',
    padding: 16,
    borderRadius: 4,
    marginTop: 16,
    backgroundColor: '#012710',
  },
  resultTitleBraziloMoments: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    color: '#F6AE29',
    textAlign: 'center',
  },
  explanationBraziloMoments: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
  },
  shareBtnBraziloMoments: {
    marginTop: 12,
    height: 44,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  shareTextBraziloMoments: {
    color: '#000',
    fontSize: 15,
    fontWeight: '600',
  },
  nextWrapperBraziloMoments: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    marginBottom: 60,
    marginTop: 40,
  },
  nextBtnBraziloMoments: {
    height: 52,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextTextBraziloMoments: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CollectingBraziloMomentsQuiz;
