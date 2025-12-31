import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useState } from 'react';

export const StoreContext = createContext(undefined);

export const useStorage = () => {
  return useContext(StoreContext);
};

export const ContextProvider = ({ children }) => {
  const [isOnNotification, setIsOnNotification] = useState(false);
  const [savedIdsBraziloMoments, setSavedIdsBraziloMoments] = useState([]);

  const loadSavedBraziloMoments = async () => {
    const dataBraziloMoments = await AsyncStorage.getItem(
      'brazilo_saved_locations',
    );
    if (dataBraziloMoments)
      setSavedIdsBraziloMoments(JSON.parse(dataBraziloMoments));
  };

  const value = {
    isOnNotification,
    setIsOnNotification,
    savedIdsBraziloMoments,
    setSavedIdsBraziloMoments,
    loadSavedBraziloMoments,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
