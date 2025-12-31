import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CollectingBraziloMomentsLocations from '../CollectingBraziloMomentsScreens/CollectingBraziloMomentsLocations';
import CollectingBraziloMomentsMap from '../CollectingBraziloMomentsScreens/CollectingBraziloMomentsMap';
import CollectingBraziloMomentsMoments from '../CollectingBraziloMomentsScreens/CollectingBraziloMomentsMoments';
import CollectingBraziloMomentsSettings from '../CollectingBraziloMomentsScreens/CollectingBraziloMomentsSettings';
import CollectingBraziloMomentsIntroQuiz from '../CollectingBraziloMomentsScreens/CollectingBraziloMomentsIntroQuiz';

const Tab = createBottomTabNavigator();

const CollectingBraziloMomentsTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: styles.collectingBraziloMomentsTabs,
        tabBarActiveTintColor: '#E8AA00',
        tabBarInactiveTintColor: '#fff',
        tabBarItemStyle: {
          flexDirection: 'column',
        },
        tabBarLabelPosition: 'below-icon',
        tabBarBackground: () => (
          <LinearGradient
            colors={['#012710', '#012710']}
            style={styles.collectingBraziloMomentsTabBg}
          ></LinearGradient>
        ),
      }}
    >
      <Tab.Screen
        name="CollectingBraziloMomentsLocations"
        component={CollectingBraziloMomentsLocations}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/collectingBraziloMomentsImgs/collectingBraziloMomentsTab1.png')}
              style={{ tintColor: color }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                styles.collectingBraziloMomentsLabel,
                { color: focused ? '#E8AA00' : '#fff' },
              ]}
            >
              Places
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="CollectingBraziloMomentsMap"
        component={CollectingBraziloMomentsMap}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/collectingBraziloMomentsImgs/collectingBraziloMomentsTab2.png')}
              style={{ tintColor: color }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                styles.collectingBraziloMomentsLabel,
                { color: focused ? '#E8AA00' : '#fff' },
              ]}
            >
              Map
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="CollectingBraziloMomentsMoments"
        component={CollectingBraziloMomentsMoments}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/collectingBraziloMomentsImgs/collectingBraziloMomentsTab3.png')}
              style={{ tintColor: color }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                styles.collectingBraziloMomentsLabel,
                { color: focused ? '#E8AA00' : '#fff' },
              ]}
            >
              Moments
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="CollectingBraziloMomentsIntroQuiz"
        component={CollectingBraziloMomentsIntroQuiz}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/collectingBraziloMomentsImgs/collectingBraziloMomentsTab4.png')}
              style={{ tintColor: color }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                styles.collectingBraziloMomentsLabel,
                { color: focused ? '#E8AA00' : '#fff' },
              ]}
            >
              Quiz
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="CollectingBraziloMomentsSettings"
        component={CollectingBraziloMomentsSettings}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/collectingBraziloMomentsImgs/collectingBraziloMomentsTab5.png')}
              style={{ tintColor: color }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                styles.collectingBraziloMomentsLabel,
                { color: focused ? '#E8AA00' : '#fff' },
              ]}
            >
              Settings
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  collectingBraziloMomentsTabs: {
    elevation: 0,
    paddingTop: 14,
    paddingBottom: 16,
    justifyContent: 'center',
    position: 'absolute',
    paddingHorizontal: 12,
    borderTopWidth: 1,
    height: 100,
    borderTopColor: '#F5F5F5',
  },
  collectingBraziloMomentsTabBg: {
    height: 120,
  },
  collectingBraziloMomentsLabel: {
    fontSize: 10,
  },
});

export default CollectingBraziloMomentsTabs;
