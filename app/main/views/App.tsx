/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar, UIManager, View} from 'react-native';
import HomeIcon from '../../../assets/icons/ic_home.svg';
import DiscoverIcon from '../../../assets/icons/ic_discover.svg';
import TimeIcon from '../../../assets/icons/ic_time.svg';
import BookmarkIcon from '../../../assets/icons/ic_bookmark.svg';
import ProfileIcon from '../../../assets/icons/ic_profile.svg';
import HomeScreen from '../../home/views/HomeScreen';
import {I18nextProvider, useTranslation} from 'react-i18next';
import i18n from '../src/i18n';
import {AppDefaultTheme} from '../src/themes';
import {Provider} from 'react-redux';
import store from '../src/store';

// to enable LayoutAnimation on Android
if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Tab = createBottomTabNavigator();

function App(): JSX.Element {
  const {t} = useTranslation();
  const theme = AppDefaultTheme;
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
        <NavigationContainer theme={theme}>
          <Tab.Navigator
            screenOptions={{
              tabBarStyle: {backgroundColor: theme.colors.background},
              tabBarActiveTintColor: theme.colors.active,
              tabBarInactiveTintColor: theme.colors.inactive,
            }}>
            <Tab.Screen
              name={t('bottom_tab_titles.home')}
              component={HomeScreen}
              options={{
                headerShown: false,
                tabBarIcon: ({color}: {color: string}) => (
                  <HomeIcon fill={color} />
                ),
              }}
            />
            <Tab.Screen
              name={t('bottom_tab_titles.discover')}
              component={View}
              options={{
                headerShown: false,
                tabBarIcon: ({color}: {color: string}) => (
                  <DiscoverIcon fill={color} />
                ),
              }}
            />
            <Tab.Screen
              name={t('bottom_tab_titles.activity')}
              component={View}
              options={{
                headerShown: false,
                tabBarIcon: ({color}: {color: string}) => (
                  <TimeIcon fill={color} />
                ),
              }}
            />
            <Tab.Screen
              name={t('bottom_tab_titles.bookmarks')}
              component={View}
              options={{
                headerShown: false,
                tabBarIcon: ({color}: {color: string}) => (
                  <BookmarkIcon width={17} height={18} fill={color} />
                ),
              }}
            />
            <Tab.Screen
              name={t('bottom_tab_titles.profile')}
              component={View}
              options={{
                headerShown: false,
                tabBarIcon: ({color}: {color: string}) => (
                  <ProfileIcon fill={color} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </I18nextProvider>
    </Provider>
  );
}

export default App;
