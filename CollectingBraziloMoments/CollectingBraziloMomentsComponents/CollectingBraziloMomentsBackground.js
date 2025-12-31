import { ImageBackground, ScrollView } from 'react-native';

const CollectingBraziloMomentsBackground = ({ children }) => {
  return (
    <ImageBackground
      source={require('../../assets/collectingBraziloMomentsImgs/collectingBraziloMomentsBg.png')}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </ImageBackground>
  );
};

export default CollectingBraziloMomentsBackground;
