import { NavigationContainer } from '@react-navigation/native';
import CollectingBraziloMomentsStack from './CollectingBraziloMoments/CollectingBraziloMomentsNavigation/CollectingBraziloMomentsStack';
import { ContextProvider } from './CollectingBraziloMoments/CollectingBraziloMomentsStore/collectingBraziloMomentsContext';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <NavigationContainer>
      <ContextProvider>
        <CollectingBraziloMomentsStack />
        <Toast position="top" topOffset={55} />
      </ContextProvider>
    </NavigationContainer>
  );
};

export default App;
